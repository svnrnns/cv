'use client';

import { ArrowUpLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/ui/cn';

export function JumpToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      className={cn(
        'opacity-0 pointer-events-none hover:scale-110 transition-all duration-300',
        isVisible && '!opacity-100 !pointer-events-auto'
      )}
      onClick={scrollToTop}
    >
      <div className="p-1.5 rounded-lg flex items-center justify-center bg-module shadow cursor-pointer">
        <ArrowUpLeft className="size-4 text-heading" />
      </div>
    </button>
  );
}
