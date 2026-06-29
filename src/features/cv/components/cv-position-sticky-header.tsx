'use client';

import { IconWithBackground } from '@/components/icon-with-background';
import { useStickyTitle } from '@/features/cv/hooks/use-sticky-title';
import type { CvIconConfig } from '@/features/cv/types';
import { cn } from '@/lib/ui/cn';

interface CvPositionStickyHeaderProps {
  title: string;
  icon: CvIconConfig;
  htmlId: string;
}

export function CvPositionStickyHeader({
  title,
  icon,
  htmlId,
}: CvPositionStickyHeaderProps) {
  const isTitleSticky = useStickyTitle(htmlId);

  return (
    <div className="w-full sticky top-0">
      <div
        id={htmlId}
        className="w-full sm:px-20.5 py-4 flex items-center gap-3 bg-body"
      >
        <IconWithBackground
          iconKey={icon.iconKey}
          bg={icon.bg}
          className="relative z-10"
        />
        <span className="gigantic-text text-heading font-semibold">
          {title}
        </span>
      </div>
      <div
        className={cn(
          'w-full absolute top-full h-60 bg-gradient-to-b from-body to-body/0 opacity-0 transition-all pointer-events-none',
          isTitleSticky && '!opacity-100'
        )}
      />
    </div>
  );
}
