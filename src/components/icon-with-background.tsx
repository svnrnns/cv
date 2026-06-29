import type { IconKey } from '@/components/icons/icon-map';
import { iconMap } from '@/components/icons/icon-map';
import { cn } from '@/lib/ui/cn';
import type { HexColor } from '@/features/cv/types';

interface IconWithBackgroundProps {
  iconKey: IconKey;
  bg: HexColor;
  className?: string;
}

export function IconWithBackground({
  iconKey,
  bg,
  className,
}: IconWithBackgroundProps) {
  const Icon = iconMap[iconKey];

  return (
    <div
      className={cn('size-8 overflow-hidden p-1.5 rounded-lg shadow', className)}
      style={{ background: bg }}
    >
      <Icon className="size-full" />
    </div>
  );
}
