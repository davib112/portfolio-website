import { Highlight, themes } from "prism-react-renderer"
import codeStyle from "@/components/codesnippet.module.css"

export default function CodeSnippet(code: string) {
    return (
        <div className={`${codeStyle.CodeArea}`}>
            <Highlight
                theme={themes.vsDark}
                code={code}
                language="tsx"
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre style={style}>
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                <span>{i + 1} </span>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>

        </div>);
}