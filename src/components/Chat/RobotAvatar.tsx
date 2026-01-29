import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface RobotAvatarProps {
    isSpeaking: boolean;
}

export const RobotAvatar: React.FC<RobotAvatarProps> = ({ isSpeaking }) => {
    const controls = useAnimation();

    // Idle floating animation
    useEffect(() => {
        controls.start({
            y: [-5, 5, -5],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        });
    }, [controls]);

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Glow Aura */}
            <motion.div
                animate={{
                    scale: isSpeaking ? [1, 1.2, 1] : [1, 1.05, 1],
                    opacity: isSpeaking ? [0.5, 0.8, 0.5] : [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl"
            />

            {/* Robot Body Container */}
            <motion.div
                animate={controls}
                className="relative z-10"
            >
                {/* Head */}
                <div className="w-20 h-16 bg-gradient-to-br from-white to-gray-200 rounded-2xl shadow-lg border border-white/50 flex flex-col items-center justify-center relative overflow-hidden">

                    {/* Face Screen */}
                    <div className="w-16 h-10 bg-black rounded-xl flex items-center justify-center gap-2 relative overflow-hidden">

                        {/* Eyes */}
                        <motion.div
                            animate={{ scaleY: isSpeaking ? [0.2, 1, 0.2] : 1 }}
                            transition={{ duration: 0.2, repeat: isSpeaking ? Infinity : 0, repeatDelay: 3 }}
                            className="w-3 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        />
                        <motion.div
                            animate={{ scaleY: isSpeaking ? [0.2, 1, 0.2] : 1 }}
                            transition={{ duration: 0.2, repeat: isSpeaking ? Infinity : 0, repeatDelay: 3, delay: 0.1 }}
                            className="w-3 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        />

                        {/* Mouth (Active when speaking) */}
                        {isSpeaking && (
                            <motion.div
                                animate={{ height: [2, 6, 2], width: [10, 8, 10] }}
                                transition={{ duration: 0.2, repeat: Infinity }}
                                className="absolute bottom-2 w-3 h-1 bg-white rounded-full"
                            />
                        )}
                    </div>

                    {/* Antenna */}
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-3 w-1 h-3 bg-gray-300"
                    >
                        <div className={`w-2 h-2 rounded-full absolute -top-1 -left-0.5 ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                    </motion.div>
                </div>

                {/* Body/Neck Hint */}
                <div className="w-8 h-4 bg-gray-300 mx-auto -mt-1 rounded-b-lg shadow-inner" />
            </motion.div>
        </div>
    );
};
