interface CvTimelineConnectorProps {
  isLast: boolean;
}

export function CvTimelineConnector({ isLast }: CvTimelineConnectorProps) {
  if (isLast) return null;

  return (
    <div
      aria-hidden
      className="hidden sm:block absolute w-px bg-detail/30 pointer-events-none cv-timeline-icon-x top-8 -bottom-8"
    />
  );
}
