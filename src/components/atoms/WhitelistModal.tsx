import { Box, Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ReactComponent as AnounceIcon } from "@/assets/icons/anounce.svg";

function WhitelistModal() {
  return (
    <Dialog
      open
      PaperProps={{
        sx: {
          backgroundColor: "colors.white.50",
        },
      }}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "500px",
            maxWidth: "80%",
          },
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <AnounceIcon />

          <Typography variant="body_bold">
            Currently, the system is only available for
            <br /> invited users!
          </Typography>
          <Typography variant="body">
            We will announce when it is open for public to access!
          </Typography>
          <Typography variant="body">
            You will be logged out in 5 seconds
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default WhitelistModal;
