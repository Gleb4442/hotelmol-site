"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUp, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/TranslationContext";
import { useCookieBanner } from "@/lib/CookieBannerContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AskAIWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const pathname = usePathname();
    const { t } = useTranslation();
    const { isCookieBannerVisible } = useCookieBanner();
    const [sessionId, setSessionId] = useState<string>(() => {
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
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isMobileFullscreen, setIsMobileFullscreen] = useState(false);
    const [isShifted, setIsShifted] = useState(false);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Handle session storage for messages (optional, not strictly in prompt but good for UX persistence if needed, 
    // but ignoring for now to keep code clean and focused on UI as per instructions)

    // Listen for custom event to open chat (from mobile nav) and desktop scroll
    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setIsMobileFullscreen(false);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        };

        const handleOpenWithMessage = (e: CustomEvent<{ message: string }>) => {
            setIsOpen(true);
            setIsMobileFullscreen(false);
            const msg = e.detail?.message;
            if (msg) {
                handleSendMessage(msg);
            }
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        };

        const handleMobileFullscreen = (e: CustomEvent<{ message: string }>) => {
            setIsOpen(true);
            setIsMobileFullscreen(true);
            const msg = e.detail?.message;
            if (msg) {
                handleSendMessage(msg);
            }
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        };

        const handleDesktopScroll = (e: CustomEvent<{ visible: boolean }>) => {
            setIsShifted(e.detail?.visible);
        };

        window.addEventListener("open-ai-chat", handleOpen);
        window.addEventListener("open-ai-chat-with-message" as any, handleOpenWithMessage as any);
        window.addEventListener("open-ai-mobile-fullscreen" as any, handleMobileFullscreen as any);
        window.addEventListener("desktop-scroll-visible" as any, handleDesktopScroll as any);

        return () => {
            window.removeEventListener("open-ai-chat", handleOpen);
            window.removeEventListener("open-ai-chat-with-message" as any, handleOpenWithMessage as any);
            window.removeEventListener("open-ai-mobile-fullscreen" as any, handleMobileFullscreen as any);
            window.removeEventListener("desktop-scroll-visible" as any, handleDesktopScroll as any);
        };
    }, []);

    // Visibility logic: hide on blog and contact pages
    const isHiddenPath = pathname.startsWith("/blog") || pathname === "/contact";

    if (isHiddenPath) return null;

    const handleSendMessage = async (arg?: string | React.MouseEvent) => {
        const textOverride = typeof arg === 'string' ? arg : undefined;
        const textToSend = textOverride || input;

        if (!textToSend.trim() || isLoading) return;

        const userMsg = textToSend.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch("https://n8n.myn8napp.online/webhook/40d5e18a-9a16-408e-b594-7d4797e085f6/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatInput: userMsg,
                    sessionId: sessionId,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            // Handle various possible response formats from n8n
            let aiResponse = "Thinking process complete.";

            if (typeof data === 'string') {
                aiResponse = data;
            } else if (data.output) {
                aiResponse = data.output;
            } else if (data.response) {
                aiResponse = data.response;
            } else if (data.text) {
                aiResponse = data.text;
            } else if (Array.isArray(data) && data.length > 0) {
                aiResponse = data[0].output || data[0].text || JSON.stringify(data[0]);
            } else {
                aiResponse = JSON.stringify(data);
            }

            setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);

        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error connecting to the server. Please check your connection." }]);
        } finally {
            setIsLoading(false);
            // Auto-focus back to input
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleClose = () => {
        setIsClosing(true);
    };

    const onAnimationEnd = (e: React.AnimationEvent) => {
        // Check if it's the window closing animation
        if (e.animationName.includes('windowClose')) {
            setIsOpen(false);
            setIsClosing(false);
        }
    };

    return (
        <div className={`fixed z-[60] pointer-events-none ${isOpen || isClosing ? 'inset-0' : 'inset-auto bottom-0 right-0 p-4'}`}>

            {/* Main Chat Window */}
            {(isOpen || isClosing) && (
                <div
                    className={`chat-window pointer-events-auto flex flex-col ${isClosing ? 'closing' : 'opening'} ${isMobileFullscreen ? 'fixed !inset-[10px] !w-auto !h-auto !bottom-[10px] !right-[10px] !top-[10px] !left-[10px]' : 'absolute bottom-[100px] right-[28px]'}`}
                    onAnimationEnd={onAnimationEnd}
                >
                    {/* Animated Clouds Background */}
                    <div className="clouds-layer">
                        <div className="cloud cloud-1"></div>
                        <div className="cloud cloud-2"></div>
                        <div className="cloud cloud-3"></div>
                    </div>

                    {/* Header: "Glass Layer" */}
                    <div className="chat-header relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/20 backdrop-blur-md shrink-0">
                        <div className="flex items-center gap-4">
                            {/* Avatar Bubble */}
                            <div className="w-12 h-12 rounded-full glass-bubble flex items-center justify-center p-2 shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 203.18 203.18"
                                    className="w-full h-full text-foreground/80"
                                    fill="currentColor"
                                >
                                    <path d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-lg text-foreground/90">{t("aiWidget.headerTitle") || "Hotelmol Assistant"}</span>
                                <span className="text-xs text-foreground/60 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </span>
                            </div>
                        </div>

                        {/* Close Button: Glass Bubble */}
                        <button
                            onClick={handleClose}
                            className="w-10 h-10 rounded-full glass-bubble flex items-center justify-center hover:scale-110 transition-transform active:scale-95 text-foreground/70 hover:text-foreground"
                        >
                            <ChevronDown className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="chat-messages relative z-10 flex-1 p-6 overflow-y-auto space-y-6">
                        {/* Welcome Message */}
                        <div className="flex items-end gap-3">
                            <div className="w-8 h-8 rounded-full glass-bubble flex-shrink-0 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 opacity-70">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                </svg>
                            </div>
                            <div className="glass-bubble p-4 text-[15px] leading-relaxed text-foreground/90 rounded-bl-sm max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {t("aiWidget.welcome") || "Hello! How can I help you today?"}
                            </div>
                        </div>

                        {/* Conversation History */}
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full glass-bubble flex-shrink-0 flex items-center justify-center mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 opacity-70">
                                            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                            {/* Using simple placeholder icon for internal messages to avoid SVG clutter, can be replaced */}
                                            <circle cx="12" cy="12" r="5" />
                                        </svg>
                                    </div>
                                )}

                                <div
                                    className={`
                                        p-4 text-[15px] leading-relaxed max-w-[85%] shadow-sm
                                        ${msg.role === 'user'
                                            ? 'message-user rounded-2xl rounded-br-sm text-white'
                                            : 'glass-bubble rounded-2xl rounded-bl-sm text-foreground/90'
                                        }
                                    `}
                                >
                                    {msg.role === 'assistant' ? (
                                        <div className="prose prose-sm dark:prose-invert max-w-none bg-transparent">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex items-end gap-3">
                                <div className="w-8 h-8 rounded-full glass-bubble flex-shrink-0 flex items-center justify-center mb-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-foreground/30 animate-spin"></div>
                                </div>
                                <div className="glass-bubble p-4 rounded-2xl rounded-bl-sm flex items-center gap-2">
                                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area: Floating Bubble */}
                    <div className="chat-input relative z-10 p-6 pt-2">
                        <div className="glass-bubble p-1.5 pl-5 pr-1.5 flex items-center gap-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-white/40 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            <Input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={t("aiWidget.inputPlaceholder") || "Type a message..."}
                                className="border-none bg-transparent shadow-none focus-visible:ring-0 p-0 text-base placeholder:text-foreground/50 h-auto"
                                disabled={isLoading}
                            />
                            <Button
                                size="icon"
                                className={`
                                    h-11 w-11 rounded-full shadow-md transition-all duration-300
                                    ${input.trim()
                                        ? 'bg-gradient-to-tr from-blue-500 to-purple-500 text-white hover:scale-110 hover:shadow-lg'
                                        : 'bg-black/5 dark:bg-white/10 text-foreground/40'
                                    }
                                `}
                                onClick={handleSendMessage}
                                disabled={isLoading || !input.trim()}
                            >
                                <ArrowUp className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Trigger Button (Unchanged logic, just ensure safe rendering) */}
            <AnimatePresence>
                {!isOpen && !isClosing && !isCookieBannerVisible && (
                    <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, right: isShifted ? 68 : 16 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="pointer-events-auto fixed bottom-6 z-[46] hidden md:flex items-center gap-[3px] pl-1.5 pr-4 h-[44px] bg-[#0752A0] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]"
                    >
                        <div className="relative z-10 flex items-center gap-[3px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="44"
                                height="44"
                                viewBox="0 0 203.18 203.18"
                                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                                style={{
                                    shapeRendering: "geometricPrecision",
                                    textRendering: "geometricPrecision",
                                    fillRule: "evenodd",
                                    clipRule: "evenodd",
                                }}
                            >
                                <defs>
                                    <style type="text/css">
                                        {`
                                            .fil0 {fill:none}
                                            .fil1 {fill:white}
                                        `}
                                    </style>
                                </defs>
                                <g>
                                    <circle className="fil0" cx="101.59" cy="101.59" r="101.6" />
                                    <path className="fil1" d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z" />
                                </g>
                            </svg>
                            <span className="font-semibold text-[1.05rem] text-white tracking-wide whitespace-nowrap">{t("aiWidget.button") || "Ask AI"}</span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
