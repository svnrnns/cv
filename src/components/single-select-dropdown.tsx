'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownOption {
  id: string;
  icon?: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

export interface SingleSelectDropdownProps {
  options: DropdownOption[];
  activeOption: string;
  onSelect: (value: string) => void;
  positionY: 'top' | 'bottom';
  positionX: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export function SingleSelectDropdown({
  options,
  activeOption,
  onSelect,
  positionY,
  positionX,
  children,
  className,
}: SingleSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const getDropdownPositionClasses = () => {
    const yPosition =
      positionY === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
    const xPosition = positionX === 'left' ? 'left-0' : 'right-0';
    return `${yPosition} ${xPosition}`;
  };

  return (
    <div
      ref={dropdownRef}
      className={cn('relative inline-block', className)}
    >
      {/* Trigger button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {children}
      </div>

      {/* Dropdown menu */}
      <div
        className={cn(
          'absolute z-50 min-w-24 bg-module rounded-lg shadow-lg',
          'transform-opacity-transform duration-300 ease-in-out',
          isOpen
            ? 'opacity-100 scale-100  pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none',
          getDropdownPositionClasses()
        )}
      >
        <div className="p-2 space-y-1">
          {options.map((option) => {
            const isActive = option.value === activeOption;
            const IconComponent = option.icon;

            return (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option.value)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg',
                  !isActive && 'hover:bg-box',
                  isActive && 'bg-piece text-heading'
                )}
                role="option"
                aria-selected={isActive}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
                <span className="flex-1 text-sm font-medium">
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
