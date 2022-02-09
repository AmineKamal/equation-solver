import { IconButton } from "@mui/material";
import CLoseIcon from "@mui/icons-material/Close";

interface ClearButtonProps 
{
    clear: () => void;
}

export default function ClearButton({clear}: ClearButtonProps) 
{
    return (
        <IconButton
            color="primary"
            aria-label="close"
            component="span"
            style={{
                position: "fixed",
                right: "25px",
                top: "25px",
                opacity: "0.6",
            }}
            onClick={clear}
        >
        <CLoseIcon fontSize="large" />
      </IconButton>
    );
}