'use client';

import { Visualization } from '@/types';

interface VisualizationEmbedProps {
  visualization: Visualization;
}

export default function VisualizationEmbed({ visualization }: VisualizationEmbedProps) {
  const height = visualization.height || 500;

  return (
    <figure className="viz-embed my-8">
      <div className="relative" style={{ height: `${height}px` }}>
        <iframe
          src={visualization.url}
          title={visualization.caption || 'Data visualization'}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      </div>
      {visualization.caption && (
        <figcaption className="text-sm text-gray-600 italic px-4 py-3 bg-gray-50">
          {visualization.caption}
        </figcaption>
      )}
    </figure>
  );
}
