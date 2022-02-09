import { Fab } from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";

interface CaptureButtonProps 
{
    capture: () => void;
}

export default function CaptureButton({capture}: CaptureButtonProps) 
{
    return (
        <Fab 
          size="large" color="primary" aria-label="capture" 
          style={{
            position: "fixed",
            transform: "translateX(-50%)",
            left: "50%",
            bottom: "50px",
            opacity: "0.6",
            width: "75px",
            height: "75px"
          }}
          onClick={capture}
      >
        <CameraIcon fontSize="large" />
      </Fab>
    );
}