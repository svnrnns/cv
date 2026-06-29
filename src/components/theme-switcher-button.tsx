'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/ui/cn';

const subscribe = () => () => {};

export function ThemeSwitcherButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg flex items-center justify-center relative bg-module shadow size-7" />
    );
  }

  const isDarkMode = (resolvedTheme ?? theme) === 'dark';

  const switchTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="hover:scale-110 transition-all duration-300">
      <button
        type="button"
        aria-label="Toggle theme"
        className="p-2 rounded-lg flex items-center justify-center relative bg-module shadow cursor-pointer"
        onClick={switchTheme}
      >
        <div className="size-3" />
        <Sun
          className={cn(
            'size-4 absolute transition-transform duration-500 text-heading',
            !isDarkMode && 'theme-icon-anim'
          )}
        />
        <Moon
          className={cn(
            'size-4 absolute transition-transform duration-500 text-heading',
            isDarkMode && 'theme-icon-anim rotate-180'
          )}
        />
      </button>
    </div>
  );
}
