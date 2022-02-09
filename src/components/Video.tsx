
type VideoProps = { videoRef: React.RefObject<HTMLVideoElement> };

export default function Video({ videoRef }: VideoProps) 
{     
    const handleCanPlay = () => videoRef.current?.play();

    return (
        <video 
            ref={videoRef}
            onCanPlay={handleCanPlay}
            autoPlay
            playsInline
            muted 
            style={{
                position: "fixed",
                right: "0",
                bottom: "0",
                minWidth: "100%",
                minHeight: "100%"
            }}
        />
    );
}