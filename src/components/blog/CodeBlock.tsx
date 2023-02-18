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
	const [isRunning, setIsRunning] = useState(false);

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
			if (isRunning) return;
			setIsRunning(true);
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
		setIsRunning(false);
	};
	const onChange = useCallback((value: string) => {
		setCode(value);
	}, []);

	console.log(import.meta.env);

	return (
		<div className="mb-2">
			<CodeMirror
				value={code}
				extensions={[StreamLanguage.define(go)]}
				onChange={onChange}
				theme={theme}
			/>
			<button
				onClick={runCode}
				className="my-2 rounded bg-blue-300 py-2 px-4 text-white"
				disabled={isRunning}
			>
				Run
			</button>
			{result && (
				<pre className="border-t-2 border-dotted bg-bgColor py-2 font-mono text-lg">{result}</pre>
			)}
		</div>
	);
}
