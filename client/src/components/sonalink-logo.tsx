import React from 'react';
import logoImage from 'figma:asset/040e1cb65cbb0c01db5017ced8d57ba5a6b20f0d.png';

interface SonaLinkLogoProps {
  className?: string;
}

/**
 * SonaLink Logo Component
 * 
 * Features an "S" made of interconnected chain links surrounding a central hexagon,
 * representing student connection and collaboration.
 */
export function SonaLinkLogo({ className = "w-9 h-9" }: SonaLinkLogoProps) {
  return (
    <img 
      src={logoImage} 
      alt="SonaLink Logo" 
      className={className}
    />
  );
}
