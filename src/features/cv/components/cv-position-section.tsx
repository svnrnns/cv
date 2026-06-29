import { CvPositionContent } from '@/features/cv/components/cv-position-content';
import { CvPositionStickyHeader } from '@/features/cv/components/cv-position-sticky-header';
import { CvTimelineConnector } from '@/features/cv/components/cv-timeline-connector';
import type { CvPositionEntry } from '@/features/cv/types';
import { dateToMonthYearString } from '@/lib/dates';
import type { Locale, TranslateFunction } from '@/lib/i18n/types';
import { cn } from '@/lib/ui/cn';

interface CvPositionSectionProps {
  entry: CvPositionEntry;
  isLast: boolean;
  locale: Locale;
  t: TranslateFunction;
}

export function CvPositionSection({
  entry,
  isLast,
  locale,
  t,
}: CvPositionSectionProps) {
  const { icon, htmlId, from, to } = entry;

  return (
    <div
      className={cn(
        'relative w-full flex flex-col gap-1.5',
        !isLast && 'sm:pb-40'
      )}
    >
      <CvTimelineConnector isLast={isLast} />
      <CvPositionStickyHeader
        title={t(`positions.${htmlId}.title`) as string}
        icon={icon}
        htmlId={htmlId}
      />

      <span className="!font-mono tiny-text text-detail w-full page-block-raw mx-auto">
        {dateToMonthYearString(from, locale)} -{' '}
        <span className={cn(!to && 'text-success font-medium')}>
          {to
            ? dateToMonthYearString(to, locale)
            : t(`positions.${htmlId}.now`)}
        </span>
      </span>

      <div className="page-block-raw w-full mx-auto">
        <span className="font-medium">{t(`positions.${htmlId}.role`)}</span>
      </div>

      <CvPositionContent
        htmlId={htmlId}
        imageSrc={entry.imageSrc}
        t={t}
      />
    </div>
  );
}
