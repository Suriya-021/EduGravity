import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { RobotAvatar } from './RobotAvatar';
import { sarvamService } from '../../services/sarvamService';
import { teachingService } from '../../services/teachingService';
import { useMapStore } from '../../store/useMapStore';
import clsx from 'clsx';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
}

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'bot', text: 'Hello! I am GeoBot. I can teach you about the continents in Tamil. Ask me anything!' }
    ]);
    const [input, setInput] = useState('');
    const [isDetailOpen, setIsDetailOpen] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const flyToContinent = useMapStore((state) => state.flyToContinent);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const newMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
        setMessages(prev => [...prev, newMessage]);
        setInput('');

        // Basic keyword detection for demo
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('asia')) flyToContinent('asia');
        if (lowerInput.includes('africa')) flyToContinent('africa');
        if (lowerInput.includes('north america')) flyToContinent('north_america');
        if (lowerInput.includes('south america')) flyToContinent('south_america');
        if (lowerInput.includes('antarctica')) flyToContinent('antarctica');
        if (lowerInput.includes('europe')) flyToContinent('europe');
        if (lowerInput.includes('australia')) flyToContinent('australia');

        // Determine AI response using TeachingService
        const responseText = await teachingService.getResponse(input);

        const botResponse: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: responseText };
        setMessages(prev => [...prev, botResponse]);

        try {
            // Using the Sarvam Service to speak the response
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

    return (
        <div className={clsx(
            "absolute right-4 top-4 bottom-4 w-96 glass-panel rounded-2xl flex flex-col transition-all duration-300 z-10 p-4",
            !isDetailOpen && "w-16 h-16 rounded-full overflow-hidden p-0 right-4 bottom-4 top-auto cursor-pointer"
        )}>

            {/* Minimized View Toggle */}
            {!isDetailOpen && (
                <div onClick={() => setIsDetailOpen(true)} className="w-full h-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition">
                    <RobotAvatar isSpeaking={false} />
                </div>
            )}

            {/* Main Chat View */}
            {isDetailOpen && (
                <>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 border-b border-glassBorder pb-2">
                        <h2 className="text-white font-bold text-lg">GeoBot AI</h2>
                        <button onClick={() => setIsDetailOpen(false)} className="text-gray-400 hover:text-white">_</button>
                    </div>

                    {/* Avatar Area */}
                    <div className="flex-shrink-0">
                        <RobotAvatar isSpeaking={isSpeaking} />
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto space-y-4 p-2 scrollbar-thin scrollbar-thumb-gray-600">
                        {messages.map((msg) => (
                            <div key={msg.id} className={clsx(
                                "p-3 rounded-lg text-sm max-w-[85%]",
                                msg.sender === 'user' ? "bg-blue-600 ml-auto text-white" : "bg-slate-700 text-gray-100"
                            )}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Suggestions */}
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide">
                        {['Asia', 'Africa', 'Europe', 'Australia'].map(c => (
                            <button
                                key={c}
                                onClick={() => { flyToContinent(c); setInput(`Tell me about ${c}`); }}
                                className="px-3 py-1 bg-slate-700 hover:bg-blue-600 rounded-full text-xs text-nowrap transition"
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="mt-4 pt-2 border-t border-glassBorder flex gap-2">
                        <button className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition">
                            <Mic size={20} />
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1 bg-slate-800 border border-slate-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                            placeholder="Ask about a continent..."
                        />
                        <button onClick={sendMessage} className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition">
                            <Send size={20} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
