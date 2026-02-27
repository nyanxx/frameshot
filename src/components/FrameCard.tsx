import { useRef, useState } from "react"
import type { JSX } from "react"
import clsx from "clsx"
import html2canvas from "html2canvas-pro"
import TitleBar from "./TitleBar"
import type { ImgData } from "../types/ImageData"

export default function FrameCard(): JSX.Element {

    const [imgFile, setImgFile] = useState<ImgData>()

    const card = useRef(null)
    const backgroundColor = "#91d1f0"
    const imgExportType = "webp"

    const handleCapture = async () => {
        if (!card.current) return;
        const canvas = await html2canvas(card.current, { allowTaint: true });
        const dataUrl = canvas.toDataURL(`image/${imgExportType}`);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `component-image.${imgExportType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const files: (File | null)[] = [...event.dataTransfer.items]
            .map((item) => item.getAsFile())
            .filter((file) => file);
        const file = files[0]
        if (file) {
            const imgData = displayImages([file]);
            if (imgData) {
                setImgFile(imgData)
            }
        }
    }


    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        // Only accepts files
        const fileItems = [...event.dataTransfer.items].filter(
            (item) => item.kind === "file",
        );

        if (fileItems.length > 0) {
            event.preventDefault();
            // Only accepts image
            if (fileItems.some((item) => item.type.startsWith("image/"))) {
                event.dataTransfer.dropEffect = "copy";
            } else {
                event.dataTransfer.dropEffect = "none";
            }
        }
    }

    const displayImages = (files: File[]) => {
        for (const file of files) {
            if (file.type.startsWith("image/")) {
                const imgData = {
                    src: URL.createObjectURL(file),
                    alt: file.name
                }
                return imgData
            }
        }
    }


    // useEffect(() => {
    //     window.addEventListener("drop", (event: DragEvent) => {
    //         if (event.dataTransfer) {
    //             if ([...event.dataTransfer.items].some((item) => item.kind === "file")) {
    //                 event.preventDefault();
    //             }
    //         }
    //     });
    //     window.addEventListener("dragover", (event) => {
    //         if (event.dataTransfer) {
    //             const fileItems = [...event.dataTransfer.items].filter(
    //                 (item) => item.kind === "file",
    //             );
    //             if (fileItems.length > 0) {
    //                 event.preventDefault();
    //                 if (!dropZone.contains(event.target)) {
    //                     event.dataTransfer.dropEffect = "none";
    //                 }
    //             }
    //         }
    //     });
    // }, [])


    const noDownload = clsx(
        { "rounded-r-none": imgFile },
        imgFile ? "cursor-pointer  hover:bg-violet-900" : "cursor-not-allowed opacity-70  hover:bg-violet-700"
    )

    return (
        <>
            <header className="z-1000 bg-blue-200 flex items-center py-2 px-5 fixed mb-23 justify-between w-full shadow-[0_3px_20px_-10px_rgba(115,115,115,0.75)] ">
                <h1 className="font-glevin font-bold text-violet-700 text-2xl">FRAMESHOT</h1>
                <div className="flex">
                    <button
                        type="button"
                        className={`bg-violet-700 m-1 text-white rounded-4xl ${noDownload} py-2 px-5 font-bold block mx-auto `}
                        onClick={handleCapture}
                        disabled={!imgFile ? true : false}
                    >
                        Download
                    </button>
                    {
                        imgFile && (
                            <button
                                type="button"
                                className=" bg-violet-700 m-1 text-white rounded-4xl rounded-l-none py-2 px-5 font-bold block mx-auto cursor-pointer hover:bg-violet-900"
                                onClick={() => {
                                    setImgFile(undefined)
                                }}
                            >
                                Clear
                            </button>
                        )
                    }
                </div >
            </header>

            <div className="outline-3 outline-red-800 outline-dashed mx-5 mb-10 mt-20">
                <div
                    className="flex flex-col justify-center items-center p-8"
                    style={{ backgroundColor: backgroundColor }}
                    ref={card}
                >
                    <div className={`m-8 bg-white rounded-md overflow-hidden ${imgFile ? "resize" : ""}`}>
                        <TitleBar />
                        <main className="w-full h-full">
                            {
                                imgFile ?
                                    <img
                                        src={imgFile.src}
                                        alt={imgFile.alt}
                                        className={`w-full h-full`}
                                    // `object-cover object-contain` you can use one of these if needed 
                                    />
                                    :
                                    <label
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        className="flex items-center justify-center w-130 h-115 max-w-full p-4 bg-gray-300 text-gray-700 cursor-pointer font-bold "
                                    >
                                        Drop Image Here
                                        {/* , or click to upload. */}
                                    </label>
                            }
                        </main>
                    </div>
                </div>
            </div>

        </>
    )
}