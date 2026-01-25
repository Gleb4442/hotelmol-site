"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    // Session & Message State
    const [sessionId, setSessionId] = useState<string>("");

    useEffect(() => {
        try {
            let sid = localStorage.getItem("hotelmol_session_id");
            if (!sid) {
                sid = uuidv4();
                localStorage.setItem("hotelmol_session_id", sid);
            }
            setSessionId(sid);
        } catch (e) {
            console.error("Local storage access error:", e);
            setSessionId(uuidv4()); // Fallback session id in memory
        }
    }, []);
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

    // Broadcast chat status
    useEffect(() => {
        const hasHistory = messages.length > 0;
        window.dispatchEvent(new CustomEvent("ai-chat-status", { detail: { hasMessages: hasHistory } }));
    }, [messages]);

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
            // Retrieve session ID directly to ensure freshness (avoids stale closure issues in event listeners)
            let currentSessionId = sessionId;
            if (!currentSessionId) {
                try {
                    currentSessionId = localStorage.getItem("hotelmol_session_id") || "";
                } catch (e) {
                    console.error("Local storage access denied", e);
                }
            }
            if (!currentSessionId) currentSessionId = uuidv4();

            // Should we update state if it is different? Maybe, but not strictly necessary for the request logic.
            // If we generated a new one fallback, might want to save it? 
            // The useEffect logic usually handles this on mount/update, but strictly for this request, this is safe.

            const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL || 'https://n8n.myn8napp.online/webhook/40d5e18a-9a16-408e-b594-7d4797e085f6/chat';
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatInput: userMsg, sessionId: currentSessionId }),
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
            // Dispatch event for other components to know there's chat history
            // We use setTimeout to ensure state (if we were using it) is updated, but here we just signal.
            // Ideally we'd watch 'messages' effect, but here is fine for now.
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
        hidden: { y: "110%" },
        visible: { y: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
        exit: { y: "110%", transition: { duration: 0.3, ease: "easeInOut" } }
    };

    // Dispatch open/close events for other components (e.g. MobileAIInput)
    useEffect(() => {
        if (isOpen) {
            window.dispatchEvent(new CustomEvent("ai-widget-state", { detail: { open: true } }));
        } else {
            window.dispatchEvent(new CustomEvent("ai-widget-state", { detail: { open: false } }));
        }
    }, [isOpen]);

    return (
        <div className="fixed z-[9999] pointer-events-none inset-0 flex flex-col items-end justify-end sm:p-0">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={isMobile ? "hidden" : "hidden"}
                        animate={isMobile ? "visible" : "visible"}
                        exit={isMobile ? "exit" : "exit"}
                        variants={mobileVariants}
                        className={`pointer-events-auto flex flex-col overflow-hidden
                            ${isMobile
                                ? 'fixed inset-[10px] w-[calc(100%-20px)] h-[calc(100%-20px)] bg-transparent shadow-none pointer-events-none'
                                : 'fixed top-[120px] bottom-[10px] right-[10px] w-[25vw] min-w-[350px] bg-transparent shadow-none pointer-events-none'
                            }
                        `}
                    >
                        {/* 3. Header - Unified Floating Pill */}
                        <div className="absolute top-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
                            <div className="bg-[#0752A0] text-white font-bold text-sm px-6 py-2 rounded-full shadow-lg">
                                hotelmol
                            </div>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md z-50 text-gray-600 pointer-events-auto hover:bg-white transition-colors"
                        >
                            <ChevronDown className="w-6 h-6 stroke-[2.5]" />
                        </button>

                        {/* 4. Messages Area */}
                        <div className="flex flex-col flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pointer-events-auto bg-white rounded-3xl mb-2 pt-16 px-5 pb-2 shadow-[0_0_30px_-5px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)]">
                            {/* Welcome Bubble */}
                            <div className="flex flex-col items-start self-start max-w-[85%]">
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
                                    <div className="px-3 py-2 rounded-t-[14px] rounded-br-[14px] rounded-bl-[4px] bg-[#f3f4f6] shadow-sm flex items-center gap-1 min-w-[40px] justify-center h-[32px]">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* 5. Footer (Input) */}
                        <div className="shrink-0 transition-all pointer-events-auto p-2 bg-transparent">
                            <div className="flex items-end bg-white/70 backdrop-blur-md rounded-[24px] shadow-lg border border-white/20 transition-all focus-within:ring-2 focus-within:ring-[#0752A0]/20 mx-2 mb-2 pl-4 pr-[4px] py-[4px] min-h-[48px]">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={t("aiWidget.inputPlaceholder") || "Type a message..."}
                                    rows={1}
                                    className="flex-1 bg-transparent border-none outline-none resize-none py-[8px] max-h-[100px] text-[16px] text-[#0752A0] placeholder:text-[#0752A0]/50 font-medium leading-[24px] scrollbar-hide mb-0"
                                    disabled={isLoading}
                                />
                                <Button
                                    size="icon"
                                    onClick={handleSendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className={`
                                        h-[40px] w-[40px] shrink-0 rounded-full transition-all duration-300 ml-2
                                        ${input.trim()
                                            ? 'bg-[#0752A0] hover:bg-[#064080] text-white shadow-md hover:scale-105'
                                            : 'bg-[#0752A0]/50 text-white/50 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <ArrowUp className="w-6 h-6 stroke-[2.5]" />
                                    )}
                                </Button>
                            </div>
                            <div className="text-center mt-2">
                                {/* Powered by removed */}
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
                        className="pointer-events-auto fixed bottom-6 z-[46] hidden md:flex items-center gap-2 pl-1.5 pr-5 h-[48px] bg-[#0752A0] rounded-full border border-white/10 transition-shadow shadow-[0_8px_24px_rgba(7,82,160,0.25),0_0_20px_rgba(255,255,255,0.5)] hover:shadow-[0_12px_32px_rgba(7,82,160,0.35),0_0_30px_rgba(255,255,255,0.6)]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlSpace="preserve"
                            className="w-11 h-11"
                            version="1.1"
                            viewBox="0 0 203.18 203.18"
                            style={{
                                shapeRendering: "geometricPrecision",
                                textRendering: "geometricPrecision",
                                fillRule: "evenodd",
                                clipRule: "evenodd"
                            }}
                        >
                            <g id="Layer_x0020_1">
                                <g id="_2278661208240">
                                    <circle fill="none" cx="101.59" cy="101.59" r="101.6" />
                                    <path
                                        fill="white"
                                        d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z"
                                    />
                                </g>
                            </g>
                        </svg>
                        <span className="font-semibold text-[15px] text-white tracking-wide whitespace-nowrap">{t("aiWidget.button") || "Ask AI"}</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
