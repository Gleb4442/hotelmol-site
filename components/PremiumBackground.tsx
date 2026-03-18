"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface PremiumBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showGrid?: boolean;
  showGlows?: boolean;
  showLines?: boolean;
}

const PremiumBackground: React.FC<PremiumBackgroundProps> = ({
  children,
  className = "",
  showGrid = true,
  showGlows = true,
  showLines = true,
}) => {
  return (
    <div className={`relative overflow-hidden bg-[#FAF9F6] ${className}`}>
      {/* Base Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Grid Layer */}
        {showGrid && (
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `linear-gradient(#0752A0 1px, transparent 1px), linear-gradient(90deg, #0752A0 1px, transparent 1px)`,
              backgroundSize: '40px 40px' 
            }}
          />
        )}

        {/* Glow Layer */}
        {showGlows && (
          <>
            <motion.div
              className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#38BDF8] rounded-full blur-[120px] opacity-[0.07]"
              animate={{
                x: [0, 30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-[#0EA5E9] rounded-full blur-[120px] opacity-[0.05]"
              animate={{
                x: [0, -40, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </>
        )}

        {/* Structural Lines Layer */}
        {showLines && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200/20 hidden lg:block" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200/20 hidden lg:block" />
          </div>
        )}
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PremiumBackground;
