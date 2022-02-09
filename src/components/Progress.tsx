import { Box, CircularProgress, Typography } from "@mui/material";

export interface ProgressProps 
{
    status: string;
}

export default function Progress({ status }: ProgressProps) {
    return (
        <div style={{
            position: "fixed",
            transform: "translateX(-50%)",
            left: "50%",
            bottom: "50%",
            opacity: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress style={{width: "125px", height: "125px"}} variant="indeterminate" />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.primary"
                    style={{textAlign: "center"}}
                >
                    {status}
                </Typography>
            </Box>
        </Box>
        </div>
    );
  }