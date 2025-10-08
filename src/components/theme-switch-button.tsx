'use client';
import { Laptop2Icon, MoonIcon, SunIcon } from 'lucide-react';
import { SingleSelectDropdown } from './single-select-dropdown';
import useIsMounted from '@/hooks/use-is-mounted';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';

const options = [
  {
    icon: SunIcon,
    id: 'light',
    value: 'light',
    label: 'Light',
  },
  {
    icon: MoonIcon,
    id: 'dark',
    value: 'dark',
    label: 'Dark',
  },
  {
    icon: Laptop2Icon,
    id: 'system',
    value: 'system',
    label: 'System',
  },
];

export function ThemeSwitchButton() {
  const isMounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  const onThemeChange = useCallback(
    (theme: string) => {
      document.cookie = `theme=${theme}; path=/`;
      setTheme(theme);
    },
    [setTheme]
  );

  if (!isMounted)
    return <button className="w-8 h-8 rounded bg-module shadow-lg"></button>;

  return (
    <div className={'flex-center'}>
      <SingleSelectDropdown
        options={options}
        activeOption={theme || 'light'}
        onSelect={onThemeChange}
        positionY="top"
        positionX="right"
      >
        <button className="w-8 h-8 p-2 rounded-lg bg-module text-font shadow cursor-pointer">
          {theme === 'light' ? (
            <SunIcon className="w-4 h-4 text-heading" />
          ) : theme === 'dark' ? (
            <MoonIcon className="w-4 h-4 text-heading" />
          ) : (
            <Laptop2Icon className="w-4 h-4 text-heading" />
          )}
        </button>
      </SingleSelectDropdown>
    </div>
  );
}
