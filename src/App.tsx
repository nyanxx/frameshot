import { useRef, useState } from "react"
import type { JSX } from "react";
import html2canvas from "html2canvas-pro"
import type { ImgData } from "./types/ImageData"
import TitleBar from "./components/TitleBar";
import Header from "./components/Header"

export default function App(): JSX.Element {

  const [imgFile, setImgFile] = useState<ImgData>()

  const card = useRef(null)
  const backgroundColor = "#91d1f0"
  const imgExportType = "webp"
  const isimgfileAvail = imgFile ? true : false

  const handleCapture = async () => {
    if (!card.current) return;
    const canvas = await html2canvas(card.current, { allowTaint: false, scale: 2, useCORS: true });
    const dataUrl = canvas.toDataURL(`image/${imgExportType}`);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `component-image.${imgExportType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearImage = () => {
    setImgFile(undefined)
  }

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


  return (
    <>
      <Header isimgfileAvail={isimgfileAvail} clearImage={clearImage} handleCapture={handleCapture} />
      {/* Frame */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          marginTop: "4rem",
          height: "100vh",
          backgroundColor: backgroundColor,
        }}
        ref={card}
      >
        <div
          // className={`m-8 bg-white rounded-md overflow-hidden ${imgFile ? "resize" : ""}`}
          style={{
            margin: "2rem",          
            backgroundColor: "white",
            borderRadius: "0.375rem",
            overflow: "hidden",      
            resize: imgFile ? "both" : undefined 
          }}
        >
          <TitleBar />
          <main
            // className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
          >
            {
              imgFile ?
                <img
                  src={imgFile.src}
                  alt={imgFile.alt}
                  // className={`w-full h-full`}
                  style={{ width: "100%", height: "100%" }}

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
      </div >
    </>
  )


}

