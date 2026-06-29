import type { TranslateFunction } from '@/lib/i18n/types';

interface CvPositionContentProps {
  htmlId: string;
  imageSrc?: string;
  t: TranslateFunction;
}

export function CvPositionContent({
  htmlId,
  imageSrc,
  t,
}: CvPositionContentProps) {
  const p1 = t(`positions.${htmlId}.content.p1`) as string;
  const p2 = t(`positions.${htmlId}.content.p2`) as string;
  const p3 = t(`positions.${htmlId}.content.p3`) as string;

  return (
    <div className="w-full md">
      <p>{p1}</p>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={t(`positions.${htmlId}.imageAlt`) as string}
          className="rounded-lg my-14"
          draggable={false}
          loading="eager"
        />
      ) : null}
      <p>{p2}</p>
      <p>{p3}</p>
    </div>
  );
}
