import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import CodeMirror from "@uiw/react-codemirror";

import { useCallback, useState } from "react";
import useTheme from "src/hooks/useTheme";

interface props {
	defaultCode: string;
}

export default function ({ defaultCode }: props) {
	const [code, setCode] = useState(defaultCode);
	const theme = useTheme();
	const [result, setResult] = useState("");
	const runCode = async () => {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				code: code,
			}),
		};

		try {
			const res = await fetch(import.meta.env.PUBLIC_GOPLAYGROUND_API, options);
			const data = await res.json();
			console.log(data);

			if (data.Events === null || data.Events.length === 0) {
				setResult(data.Errors);
			} else {
				setResult(data.Events[0].Message);
			}
		} catch (error) {
			setResult("Error: " + error);
		}
	};
	const onChange = useCallback((value: string) => {
		setCode(value);
	}, []);

	return (
		<div className="mb-2">
			<CodeMirror
				value={code}
				extensions={[StreamLanguage.define(go)]}
				onChange={onChange}
				theme={theme}
			/>
			<button onClick={runCode} className="my-2 rounded bg-blue-300 py-2 px-4 text-white">
				Run
			</button>
			{result && (
				<pre className="border-t-2 border-dotted bg-bgColor py-2 font-mono text-lg">{result}</pre>
			)}
		</div>
	);
}
