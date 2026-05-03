import { createElement } from 'react';
import type { BlockEditorContent } from '@/types/portfolio';
import type { ReactNode } from 'react';

interface RichTextRendererProps {
  content: BlockEditorContent;
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || !Array.isArray(content)) {
    return <p className="text-slate-500 italic">Tidak ada deskripsi tersedia</p>;
  }

  return (
    <div className="prose prose-slate max-w-none space-y-4">
      {content.map((block, idx) => {
        const text = block.children?.map((child) => child.text).join('') || '';

        switch (block.type) {
          case 'heading': {
            const level = block.level || 2;
            const tagName = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            const headingClasses = {
              1: 'text-3xl font-bold text-slate-900',
              2: 'text-2xl font-bold text-slate-800',
              3: 'text-xl font-semibold text-slate-800',
              4: 'text-lg font-semibold text-slate-800',
              5: 'text-base font-semibold text-slate-800',
              6: 'text-sm font-semibold text-slate-800',
            };

            return createElement(
              tagName,
              {
                key: idx,
                className: `${headingClasses[level as keyof typeof headingClasses]} mt-8 mb-4 first:mt-0`,
              },
              text,
            );
          }

          case 'paragraph':
            return (
              <p key={idx} className="text-slate-600 leading-relaxed">
                {block.children?.map((child, childIdx) => {
                  let contentNode: ReactNode = child.text;
                  if (child.bold) contentNode = <strong className="text-slate-900 font-bold">{contentNode}</strong>;
                  if (child.italic) contentNode = <em className="italic">{contentNode}</em>;
                  if (child.code) contentNode = (
                    <code className="bg-slate-100 text-green-700 px-1.5 py-0.5 rounded text-sm font-mono">
                      {contentNode}
                    </code>
                  );
                  return <span key={childIdx}>{contentNode}</span>;
                })}
              </p>
            );

          case 'quote':
            return (
              <blockquote key={idx} className="border-l-4 border-green-500 pl-4 py-2 italic text-slate-700 bg-slate-50 rounded-r-lg">
                {text}
              </blockquote>
            );

          case 'code':
            return (
              <pre key={idx} className="bg-slate-900 p-4 rounded-xl overflow-auto shadow-inner">
                <code className="text-sm text-slate-100 font-mono">{text}</code>
              </pre>
            );

          case 'list':
            return (
              <ul key={idx} className="list-disc list-inside text-slate-600 space-y-2 ml-2">
                <li>{text}</li>
              </ul>
            );

          default:
            return (
              <p key={idx} className="text-slate-600">
                {text}
              </p>
            );
        }
      })}
    </div>
  );
}
