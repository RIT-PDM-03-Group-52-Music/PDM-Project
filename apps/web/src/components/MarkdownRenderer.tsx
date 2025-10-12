import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
    children: string;
}

const components: Components = {
    h1: (props) => <h1 className="text-xl font-semibold mt-2 mb-1" {...props} />,
    h2: (props) => <h2 className="text-lg font-semibold mt-2 mb-1" {...props} />,
    h3: (props) => <h3 className="text-base font-semibold mt-2 mb-1" {...props} />,
    p:  (props) => <p className="leading-normal" {...props} />,
    ul: (props) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
    ol: (props) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
    li: (props) => <li className="leading-6" {...props} />,
    a:  (props) => <a className="underline text-blue-400 hover:text-blue-300" target="_blank" rel="noreferrer" {...props} />,
    table: ({ node, ...props }) => (
        <div className="overflow-x-auto my-2">
            <table
                className="w-full text-left border-collapse border border-neutral-700"
                {...props}
            />
        </div>
    ),
    th: ({ node, ...props }) => (
        <th
            className="border border-neutral-700 px-2 py-1 font-semibold bg-neutral-800"
            {...props}
        />
    ),
    td: ({ node, ...props }) => (
        <td className="border border-neutral-700/60 px-2 py-1 align-top" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
        <blockquote
            className="border-l-4 border-neutral-600 pl-3 italic text-neutral-300"
            {...props}
        />
    ),
    hr: ({ node, ...props }) => <hr className="my-4 border-neutral-600" {...props} />,
    img: ({ node, ...props }) => (
        <img
            {...props}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="max-w-full h-auto rounded md:rounded-lg border border-neutral-700/50"
        />
    ),
    
    code({ node, className, children, ...props }) {
        const hasLang = /language-(\w+)/.exec(className || "");
        if (hasLang) {
            return (
                <pre className="bg-neutral-900 rounded p-2 my-2 text-sm font-mono overflow-x-auto">
                    <code className={className} {...props}>
                        {children}
                    </code>
                </pre>
            );
        }
        return (
            <code className="px-1 py-0.5 rounded bg-black/30 font-mono text-[0.9em]" {...props}>
                {children}
            </code>
        );
    },
};

export default function MarkdownRenderer({ children }: MarkdownRendererProps) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {children}
        </ReactMarkdown>
    );
}
