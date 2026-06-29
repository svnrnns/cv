import { ArrowRight } from 'lucide-react';

interface TextRightArrowProps {
  text: string;
}

export function TextRightArrow({ text }: TextRightArrowProps) {
  return (
    <div className="w-fit flex items-center gap-3">
      <h3 className="huge-text text-heading font-medium">{text}</h3>
      <ArrowRight className="text-heading h-4 group-hover:translate-x-2 transition-all duration-500" />
    </div>
  );
}
