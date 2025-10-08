'use client';

import { useState, useEffect } from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function JumpToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    setIsVisible(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'opacity-0 pointer-events-none transition-all duration-300',
        isVisible && '!opacity-100 !pointer-events-auto'
      )}
      onClick={scrollToTop}
    >
      <div className="w-8 h-8 p-2 rounded-lg bg-module shadow cursor-pointer">
        <ArrowUpLeft className="size-4 text-heading" />
      </div>
    </div>
  );
}
