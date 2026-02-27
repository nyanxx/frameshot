import type { JSX } from "react";

export default function TitleBar(): JSX.Element {
    return (
        // <div className="bg-[#343536] flex min-h-8 items-center">
        //     <div className="bg-[#f3645c] ml-3 w-3 h-3 rounded-[100%]"></div>
        //     <div className="bg-[#f7bf33] ml-2 w-3 h-3 rounded-[100%]"></div>
        //     <div className="bg-[#25ca3e] ml-2 w-3 h-3 rounded-[100%]"></div>
        // </div>
        <div
            style={{
                backgroundColor: "#343536",
                display: "flex",
                minHeight: "2rem",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "#f3645c",
                    marginLeft: "0.75rem",
                    width: "0.75rem",
                    height: "0.75rem",
                    borderRadius: "100%",
                }}
            ></div>
            <div
                style={{
                    backgroundColor: "#f7bf33",
                    marginLeft: "0.5rem",
                    width: "0.75rem",
                    height: "0.75rem",
                    borderRadius: "100%",
                }}
            ></div>
            <div
                style={{
                    backgroundColor: "#25ca3e",
                    marginLeft: "0.5rem",
                    width: "0.75rem",
                    height: "0.75rem",
                    borderRadius: "100%",
                }}
            ></div>
        </div>
    )
}