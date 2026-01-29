import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, MapPin } from 'lucide-react';
import { RobotAvatar } from './RobotAvatar';
import { sarvamService } from '../../services/sarvamService';
import { teachingService } from '../../services/teachingService';
import { useMapStore } from '../../store/useMapStore';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
}

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'bot', text: 'வணக்கம்! I am EduGravity. Let\'s explore the Earth!' }
    ]);
    const [input, setInput] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const flyToContinent = useMapStore((state) => state.flyToContinent);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (text: string = input) => {
        if (!text.trim()) return;

        // Add User Message
        const newMessage: Message = { id: Date.now().toString(), sender: 'user', text: text };
        setMessages(prev => [...prev.slice(-1), newMessage]); // Keep only last few messages contextually if needed, or full history. For HUD, maybe keep full but scroll.
        // Actually for HUD, user requested "Short messages... appear one at a time". 
        // Let's keep history but focus on latest.

        setInput('');

        // Basic keyword detection
        const lowerInput = text.toLowerCase();
        const continents = ['asia', 'africa', 'north america', 'south america', 'antarctica', 'europe', 'australia'];
        continents.forEach(c => {
            if (lowerInput.includes(c)) flyToContinent(c.replace(' ', '_'));
        });

        // Determine AI response
        const responseText = await teachingService.getResponse(text);

        const botResponse: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: responseText };
        setMessages(prev => [...prev, botResponse]);

        try {
            setIsSpeaking(true);
            const audioUrl = await sarvamService.textToSpeech(responseText);
            const audio = new Audio(audioUrl);
            audio.onended = () => setIsSpeaking(false);
            await audio.play();
        } catch (error) {
            console.error("Failed to speak:", error);
            setIsSpeaking(false);
        }
    };

    const handleQuickAction = (continent: string) => {
        flyToContinent(continent.replace(' ', '_'));
        sendMessage(`Tell me about ${continent}`);
    };

    return (
        <div className="absolute left-8 top-8 bottom-8 w-[24rem] z-10 flex flex-col pointer-events-none">
            {/* HUD Container - Pointer events enabled so we can click buttons, but let clicks pass through gaps */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col pointer-events-auto gap-4"
            >
                {/* 1. Header & ID Card */}
                <div className="glass-panel-premium rounded-3xl p-6 flex items-center justify-between backdrop-blur-2xl bg-black/30 border-l-4 border-l-blue-500">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-wider font-[Oswald,sans-serif]">EDU<span className="text-blue-400">GRAVITY</span></h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs text-blue-200 uppercase tracking-widest font-semibold">System Online</span>
                        </div>
                    </div>
                    <Sparkles className="text-blue-400 w-6 h-6 animate-pulse" />
                </div>

                {/* 2. Robot Stage & Dynamic Content */}
                <div className="glass-panel-premium rounded-3xl flex-1 relative flex flex-col overflow-hidden backdrop-blur-2xl bg-black/20">

                    {/* Robot Floating Area */}
                    <div className="flex justify-center py-8 bg-gradient-to-b from-blue-500/10 to-transparent">
                        <RobotAvatar isSpeaking={isSpeaking} />
                    </div>

                    {/* Single Focus Message Stream */}
                    <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4 scrollbar-hide">
                        {messages.slice(-3).map((msg) => ( // Only show last 3 messages for clean HUD feel
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={clsx(
                                    "p-5 rounded-2xl text-lg font-medium leading-relaxed shadow-lg",
                                    msg.sender === 'user'
                                        ? "bg-blue-600/80 text-white ml-8 rounded-tr-sm border border-blue-400/30"
                                        : "bg-white/10 text-white mr-4 rounded-tl-sm border border-white/10 backdrop-blur-md"
                                )}
                            >
                                {msg.text}
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Smart Controls Area */}
                    <div className="p-6 bg-black/40 border-t border-white/10 space-y-4">

                        {/* Quick Targets */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {['Asia', 'Africa', 'Europe', 'Australia', 'Antarctica', 'North America', 'South America'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => handleQuickAction(c)}
                                    className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-blue-600/50 border border-white/10 rounded-xl text-sm font-bold text-white whitespace-nowrap transition-all active:scale-95 group"
                                >
                                    <MapPin size={14} className="text-blue-400 group-hover:text-white" />
                                    {c}
                                </button>
                            ))}
                        </div>

                        {/* Large Input Bar */}
                        <div className="flex gap-3">
                            <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/20 text-white border border-white/10 transition-colors">
                                <Mic size={24} />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Ask a question..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 text-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim()}
                                className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 disabled:grayscale transform active:scale-95"
                            >
                                <Send size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
