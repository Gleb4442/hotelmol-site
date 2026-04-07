import React from 'react';

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
    <div className={`relative overflow-hidden bg-background ${className}`}>
      {/* Base Layer with Masking to avoid harsh section breaks */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
        }}
      >

        {/* Grid Layer */}
        {showGrid && (
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(#0752A0 1px, transparent 1px), linear-gradient(90deg, #0752A0 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        )}

        {/* Glow Layer — static, no animation (imperceptible at 3-4% opacity behind 160px blur) */}
        {showGlows && (
          <>
            <div className="absolute top-[5%] left-[-5%] w-[50%] h-[50%] bg-[#38BDF8] rounded-full blur-[160px] opacity-[0.04]" />
            <div className="absolute bottom-[5%] right-[-5%] w-[45%] h-[45%] bg-[#0EA5E9] rounded-full blur-[160px] opacity-[0.03]" />
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
