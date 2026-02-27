import type { JSX } from "react";
import clsx from "clsx"


type HeaderProps = {
    isimgfileAvail: boolean
    clearImage: () => void
    handleCapture: () => Promise<void>
}

export default function Header({ isimgfileAvail, clearImage, handleCapture }: HeaderProps): JSX.Element {


    const noDownload = clsx(
        { "rounded-r-none": isimgfileAvail },
        isimgfileAvail ? "cursor-pointer  hover:bg-violet-900" : "cursor-not-allowed opacity-70  hover:bg-violet-700"
    )

    return (
        <header className="z-1000 bg-blue-200 flex items-center py-2 px-5 fixed justify-between w-full shadow-[0_3px_20px_-10px_rgba(115,115,115,0.75)] ">
            <h1 className="font-glevin font-bold text-violet-700 text-2xl">FRAMESHOT</h1>
            <div className="flex">
                <button
                    type="button"
                    className={`bg-violet-700 m-1 text-white rounded-4xl ${noDownload} py-2 px-5 font-bold block mx-auto `}
                    onClick={handleCapture}
                    disabled={!isimgfileAvail ? true : false}
                >
                    Download
                </button>
                {
                    isimgfileAvail && (
                        <button
                            type="button"
                            className=" bg-violet-700 m-1 text-white rounded-4xl rounded-l-none py-2 px-5 font-bold block mx-auto cursor-pointer hover:bg-violet-900"
                            onClick={() => {
                                clearImage()
                            }}
                        >
                            Clear
                        </button>
                    )
                }
            </div >
        </header>
    )
}