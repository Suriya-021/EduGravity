import React from 'react';
import { motion } from 'framer-motion';

interface RobotAvatarProps {
    isSpeaking: boolean;
}

export const RobotAvatar: React.FC<RobotAvatarProps> = ({ isSpeaking }) => {
    return (
        <div className="relative w-32 h-32 mx-auto mb-4">
            {/* Glow effect */}
            <motion.div
                animate={{
                    scale: isSpeaking ? [1, 1.2, 1] : 1,
                    opacity: isSpeaking ? [0.5, 0.8, 0.5] : 0.3,
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500 rounded-full blur-xl"
            />

            {/* Robot Face Container */}
            <div className="relative w-full h-full bg-slate-800 rounded-2xl border-2 border-blue-400 overflow-hidden shadow-2xl flex items-center justify-center z-10">

                {/* Antenna */}
                <div className="absolute -top-3 w-1 h-3 bg-blue-400">
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>

                {/* Eyes */}
                <div className="flex gap-4">
                    <motion.div
                        animate={{ scaleY: isSpeaking ? [1, 0.1, 1] : 1 }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: Math.random() * 5 }}
                        className="w-8 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    />
                    <motion.div
                        animate={{ scaleY: isSpeaking ? [1, 0.1, 1] : 1 }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: Math.random() * 5 }}
                        className="w-8 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    />
                </div>

                {/* Mouth */}
                <div className="absolute bottom-6 w-12 h-2 bg-slate-900 rounded-full overflow-hidden">
                    {isSpeaking && (
                        <motion.div
                            animate={{ x: [-20, 20] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                            className="w-full h-full bg-blue-500 opacity-50"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
