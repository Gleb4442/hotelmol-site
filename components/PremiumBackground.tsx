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
    <div className={`section-render-gate relative overflow-hidden bg-background ${className}`}>
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

        {/* Glow Layer — static radial gradients are cheaper than large blurred DOM nodes */}
        {showGlows && (
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_8%_16%,rgba(56,189,248,0.05),transparent_34%),radial-gradient(circle_at_92%_84%,rgba(14,165,233,0.04),transparent_32%)]" />
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
