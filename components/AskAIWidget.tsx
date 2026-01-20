"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/TranslationContext";
import { useCookieBanner } from "@/lib/CookieBannerContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp?: Date;
}

export default function AskAIWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { t } = useTranslation();
    const { isCookieBannerVisible } = useCookieBanner();

    // Session & Message State
    const [sessionId] = useState<string>(() => {
        if (typeof window !== "undefined") {
            let sid = localStorage.getItem("hotelmol_session_id");
            if (!sid) {
                sid = uuidv4();
                localStorage.setItem("hotelmol_session_id", sid);
            }
            return sid;
        }
        return "";
    });
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // UI State
    const [isMobileFullscreen, setIsMobileFullscreen] = useState(false);
    const [isShifted, setIsShifted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect Mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading, isOpen]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    // Event Listeners for opening chat
    useEffect(() => {
        const handleOpen = () => { setIsOpen(true); setTimeout(() => textareaRef.current?.focus(), 100); };

        const handleOpenWithMessage = (e: CustomEvent<{ message: string }>) => {
            setIsOpen(true);
            const msg = e.detail?.message;
            if (msg) handleSendMessage(msg);
            setTimeout(() => textareaRef.current?.focus(), 100);
        };

        const handleDesktopScroll = (e: CustomEvent<{ visible: boolean }>) => {
            setIsShifted(e.detail?.visible);
        };

        window.addEventListener("open-ai-chat", handleOpen);
        window.addEventListener("open-ai-chat-with-message" as any, handleOpenWithMessage as any);
        window.addEventListener("desktop-scroll-visible" as any, handleDesktopScroll as any);

        return () => {
            window.removeEventListener("open-ai-chat", handleOpen);
            window.removeEventListener("open-ai-chat-with-message" as any, handleOpenWithMessage as any);
            window.removeEventListener("desktop-scroll-visible" as any, handleDesktopScroll as any);
        };
    }, []);

    const isHiddenPath = pathname.startsWith("/blog") || pathname === "/contact";
    if (isHiddenPath) return null;

    const handleSendMessage = async (arg?: string | React.MouseEvent) => {
        const textOverride = typeof arg === 'string' ? arg : undefined;
        const textToSend = textOverride || input;

        if (!textToSend.trim() || isLoading) return;

        const userMsg = textToSend.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg, timestamp: new Date() }]);
        setIsLoading(true);

        // Reset textarea height
        if (textareaRef.current) textareaRef.current.style.height = "auto";

        try {
            const response = await fetch("https://n8n.myn8napp.online/webhook/40d5e18a-9a16-408e-b594-7d4797e085f6/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatInput: userMsg, sessionId: sessionId }),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();

            // Parse response
            let aiResponse = "Thinking process complete.";
            if (typeof data === 'string') aiResponse = data;
            else if (data.output) aiResponse = data.output;
            else if (data.response) aiResponse = data.response;
            else if (data.text) aiResponse = data.text;
            else if (Array.isArray(data) && data.length > 0) aiResponse = data[0].output || data[0].text || JSON.stringify(data[0]);
            else aiResponse = JSON.stringify(data);

            setMessages((prev) => [...prev, { role: "assistant", content: aiResponse, timestamp: new Date() }]);

        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again.", timestamp: new Date() }]);
        } finally {
            setIsLoading(false);
            setTimeout(() => textareaRef.current?.focus(), 100);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Animation Variants
    const widgetVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 20,
            transformOrigin: "bottom right"
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: { duration: 0.2 }
        }
    };

    const mobileVariants = {
        hidden: { y: "100%" },
        visible: { y: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
        exit: { y: "100%" }
    };

    return (
        <div className="fixed z-[9999] pointer-events-none inset-0 flex flex-col items-end justify-end sm:p-0">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={isMobile ? "hidden" : "hidden"}
                        animate={isMobile ? "visible" : "visible"}
                        exit={isMobile ? "exit" : "exit"}
                        variants={isMobile ? mobileVariants : widgetVariants}
                        className={`pointer-events-auto flex flex-col bg-white shadow-2xl overflow-hidden
                            ${isMobile
                                ? 'fixed inset-0 w-full h-full rounded-none'
                                : 'fixed bottom-[100px] right-[28px] w-[420px] max-h-[700px] h-[calc(100vh-140px)] rounded-[24px]'
                            }
                        `}
                    >
                        {/* 3. Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-[#0752A0] text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <img src="/assets/hotelmol-logo.png" alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
                                    </div>
                                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 border-[2px] border-[#0752A0] rounded-full"></span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-lg leading-tight">hotelmol</h3>
                                    <span className="textxs text-white/80 font-medium">Assistant</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                            >
                                <ChevronDown className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* 4. Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                            {/* Welcome Bubble */}
                            <div className="flex flex-col items-start max-w-[85%]">
                                <div className="px-5 py-3 rounded-t-[18px] rounded-br-[18px] rounded-bl-[4px] bg-[#f3f4f6] text-slate-800 text-[15px] leading-relaxed shadow-sm">
                                    {t("aiWidget.welcome") || "Hello! How can I help you today?"}
                                </div>
                            </div>

                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                                >
                                    <div
                                        className={`
                                            px-5 py-3 text-[15px] leading-relaxed shadow-sm relative group
                                            ${msg.role === 'user'
                                                ? 'bg-[#0752A0] text-white rounded-t-[18px] rounded-bl-[18px] rounded-br-[4px]'
                                                : 'bg-[#f3f4f6] text-slate-800 rounded-t-[18px] rounded-br-[18px] rounded-bl-[4px]'
                                            }
                                        `}
                                    >
                                        {msg.role === 'assistant' ? (
                                            <div className="prose prose-sm max-w-none bg-transparent">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                    {/* Time - visible on hover for desktop, always for mobile if needed (kept simple here) */}
                                    {msg.timestamp && (
                                        <span className={`text-[10px] text-gray-400 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex flex-col items-start max-w-[85%]">
                                    <div className="px-4 py-3 rounded-t-[18px] rounded-br-[18px] rounded-bl-[4px] bg-[#f3f4f6] shadow-sm flex items-center gap-1.5 min-w-[60px] justify-center h-[46px]">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* 5. Footer (Input) */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="flex items-end gap-2 bg-[#f3f4f6] rounded-[24px] p-2 pl-4 transition-all focus-within:ring-2 focus-within:ring-[#0752A0]/20">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={t("aiWidget.inputPlaceholder") || "Type a message..."}
                                    rows={1}
                                    className="flex-1 bg-transparent border-none outline-none resize-none py-3 max-h-[120px] text-[15px] placeholder:text-gray-400 leading-normal scrollbar-hide"
                                    disabled={isLoading}
                                />
                                <Button
                                    size="icon"
                                    onClick={handleSendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className={`
                                        h-10 w-10 shrink-0 rounded-full mb-0.5 transition-all duration-300
                                        ${input.trim()
                                            ? 'bg-[#0752A0] hover:bg-[#064080] text-white shadow-md hover:scale-105'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                                    )}
                                </Button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-400 font-medium">Powered by AI Agent</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <AnimatePresence>
                {!isOpen && !isCookieBannerVisible && (
                    <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, right: isShifted ? 68 : 16 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="pointer-events-auto fixed bottom-6 z-[46] hidden md:flex items-center gap-2 pl-1.5 pr-5 h-[48px] bg-[#0752A0] rounded-full shadow-[0_8px_24px_rgba(7,82,160,0.25)] border border-white/10 hover:shadow-[0_12px_32px_rgba(7,82,160,0.35)] transition-shadow"
                    >
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                            <img src="/assets/hotelmol-logo.png" alt="Logo" className="w-6 h-6 object-contain brightness-0 invert" />
                        </div>
                        <span className="font-semibold text-[15px] text-white tracking-wide whitespace-nowrap">{t("aiWidget.button") || "Ask AI"}</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
