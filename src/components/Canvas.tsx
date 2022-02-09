
interface CanvasProps 
{ 
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function Canvas({ canvasRef }: CanvasProps) 
{          
    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "none",
                position: "fixed",
                right: "0",
                bottom: "0",
                minWidth: "100%",
                minHeight: "100%"
            }}
      />
    );
}