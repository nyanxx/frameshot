import type { JSX } from "react";

export default function TitleBar(): JSX.Element {
    return (
        <div className="bg-[#343536] flex min-h-8 items-center">
            <div className="bg-[#f3645c] ml-3 w-3 h-3 rounded-[100%]"></div>
            <div className="bg-[#f7bf33] ml-2 w-3 h-3 rounded-[100%]"></div>
            <div className="bg-[#25ca3e] ml-2 w-3 h-3 rounded-[100%]"></div>
        </div>
    )
}