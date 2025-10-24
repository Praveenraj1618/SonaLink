import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';

interface FABProps {
  icon: LucideIcon;
  label?: string;
  onClick: () => void;
  className?: string;
}

export function FAB({ icon: Icon, label, onClick, className = '' }: FABProps) {
  return (
    <Button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg gradient-hero hover:shadow-xl transition-shadow ${className}`}
      size="icon"
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-white" />
    </Button>
  );
}
