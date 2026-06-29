import { ReactNode } from 'react';

export function interpolateComponents(
  translation: string,
  components: Record<string, ReactNode>
): ReactNode {
  const parts = translation.split(/(\{\{\w+\}\})/g);
  return parts.map((part) => {
    const match = part.match(/\{\{(\w+)\}\}/);
    if (match && components[match[1]])
      return <span key={part}>{components[match[1]]}</span>;

    return part;
  });
}
