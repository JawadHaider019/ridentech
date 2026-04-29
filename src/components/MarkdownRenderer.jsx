
import React from 'react';

const MarkdownRenderer = ({ content }) => {
    if (!content) return null;

    const renderFormattedContent = (text) => {
        if (!text) return null;

        if (text.toLowerCase().includes('<!doctype html>') || text.includes('<!-- RAW_HTML -->')) {
            return (
                <iframe
                    srcDoc={text}
                    className="w-full border-0 bg-white"
                    style={{ overflow: 'hidden', minHeight: '400px' }}
                    scrolling="no"
                    title="Custom HTML Content"
                    onLoad={(e) => {
                        const iframe = e.target;
                        const adjustHeight = () => {
                            try {
                                const height = iframe.contentWindow.document.documentElement.scrollHeight;
                                iframe.style.height = height + 'px';
                            } catch (err) { }
                        };
                        adjustHeight();
                        setTimeout(adjustHeight, 500);
                        setTimeout(adjustHeight, 2000);
                    }}
                />
            );
        }

        const lines = text.split('\n');
        const result = [];
        let i = 0;

        const processInlineFormatting = (content) => {
            let processedContent = content;
            // Bold/Italic/Links
            processedContent = processedContent.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
            processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            processedContent = processedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
            processedContent = processedContent.replace(
                /\[([^\]]+)\]\(([^)]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-gray-900 hover:text-gray-600 underline transition-colors">$1</a>'
            );
            return processedContent;
        };

        while (i < lines.length) {
            const line = lines[i];

            // Handle Tables
            if (line.trim().startsWith('|') && i + 1 < lines.length && lines[i + 1].replace(/\s/g, '').includes('|-')) {
                const tableLines = [];
                let j = i;
                while (j < lines.length && lines[j].trim().startsWith('|')) {
                    tableLines.push(lines[j]);
                    j++;
                }

                if (tableLines.length >= 2) {
                    const headers = tableLines[0].split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
                    const rows = tableLines.slice(2).map(row =>
                        row.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
                    );

                    result.push(
                        <div key={`table-${i}`} className="overflow-x-auto my-6 rounded-xl border border-gray-200 shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {headers.map((header, idx) => (
                                            <th key={idx} className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                                                <span dangerouslySetInnerHTML={{ __html: processInlineFormatting(header) }} />
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {rows.map((row, rowIdx) => (
                                        <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                            {row.map((cell, cellIdx) => (
                                                <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    <span dangerouslySetInnerHTML={{ __html: processInlineFormatting(cell) }} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                    i = j;
                    continue;
                }
            }


            // Headers
            else if (line.startsWith('# ')) {
                result.push(<h1 key={i} className="text-3xl md:text-4xl font-semibold text-gray-900 mt-10 mb-6"><span dangerouslySetInnerHTML={{ __html: processInlineFormatting(line.substring(2)) }} /></h1>);
            } else if (line.startsWith('## ')) {
                result.push(<h2 key={i} className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4"><span dangerouslySetInnerHTML={{ __html: processInlineFormatting(line.substring(3)) }} /></h2>);
            } else if (line.startsWith('### ')) {
                result.push(<h3 key={i} className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-3"><span dangerouslySetInnerHTML={{ __html: processInlineFormatting(line.substring(4)) }} /></h3>);
            }

            // Images
            else if (line.startsWith('![') && line.includes('](')) {
                const altMatch = line.match(/!\[(.*?)\]/);
                const urlMatch = line.match(/\((.*?)\)/);
                if (urlMatch) {
                    result.push(
                        <div key={i} className="my-8">
                            <img
                                src={urlMatch[1]}
                                alt={altMatch ? altMatch[1] : ''}
                                className="max-w-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                loading="lazy"
                            />
                            {altMatch && altMatch[1] && (
                                <p className="text-sm text-gray-500 mt-3 text-center italic">{altMatch[1]}</p>
                            )}
                        </div>
                    );
                }
            }

            else if (line.trim()) {
                if (line.startsWith('- ')) {
                    result.push(
                        <li key={i} className="ml-6 list-disc text-gray-700 mb-2 leading-relaxed">
                            <span dangerouslySetInnerHTML={{ __html: processInlineFormatting(line.substring(2)) }} />
                        </li>
                    );
                } else if (/^\d+\.\s/.test(line)) {
                    result.push(
                        <li key={i} className="ml-6 list-decimal text-gray-700 mb-2 leading-relaxed">
                            <span dangerouslySetInnerHTML={{ __html: processInlineFormatting(line.replace(/^\d+\.\s/, '')) }} />
                        </li>
                    );
                } else {
                    result.push(
                        <p key={i} className="mb-6 text-gray-700 text-lg leading-relaxed">
                            <span dangerouslySetInnerHTML={{ __html: processInlineFormatting(line) }} />
                        </p>
                    );
                }
            } else {
                result.push(<div key={i} className="h-4" />);
            }
            i++;
        }
        return result;
    };

    return (
        <div className="markdown-content">
            {renderFormattedContent(content)}
        </div>
    );
};

export default MarkdownRenderer;
