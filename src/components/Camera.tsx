import { useRef, useState } from "react";
import { useUserMedia } from "../hooks/UserMedia";
import Canvas from "./Canvas";
import Video from "./Video";
import CaptureButton from "./CaptureButton";
import ClearButton from "./ClearButton";
import Tesseract from "tesseract.js";
import Progress, { ProgressProps } from "./Progress";
import { toBinaryImage } from "../Utils";
import { ResultLayer } from "./ResultLayer";

const CAPTURE_OPTIONS: MediaStreamConstraints = 
{
  audio: false,
  video: { facingMode: "environment" },
};

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mediaStream = useUserMedia(CAPTURE_OPTIONS);
    const [mode, setMode] = useState<"video" | "canvas" | "process">("video");
    const [progress, setProgress] = useState<ProgressProps>({ status: "loading" });
    const [result, setResult] = useState<Tesseract.RecognizeResult | null>(null);

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) 
    {
        videoRef.current.srcObject = mediaStream;
    }

    async function capture() 
    {
        if (!canvasRef.current) return;
        if (!videoRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        setMode("process");

        ctx.canvas.width  = videoRef.current.videoWidth;
        ctx.canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasRef.current.style.display = "block";

        setProgress({ status: "binarization" });
        const oldImage = toBinaryImage(ctx);

        const res = await Tesseract.recognize(ctx.canvas, "equ+eng", { logger: setProgress });
        setResult(res);

        ctx.putImageData(oldImage, 0, 0);
        setMode("canvas");
        setProgress({ status: "loading" });
    }

    function clear() 
    {
        if (!canvasRef.current) return;
        if (!videoRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasRef.current.style.display = "none";
        setMode("video");
        setResult(null);
    }

    return (
    <>
        <Video videoRef={videoRef} />
        <Canvas canvasRef={canvasRef} />
        { mode === "process" && <Progress {...progress} />}
        { mode === "canvas" && <ClearButton clear={clear} />}
        { mode === "video" && <CaptureButton capture={capture} />}
        { mode === "canvas" && result && <ResultLayer result={result} canvasRef={canvasRef} />}
    </>
    );
}
