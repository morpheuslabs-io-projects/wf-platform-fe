import { useAlert } from "@/store/alert";
import { Alert, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AppAlert() {
  const { open, message, severity, handleClose } = useAlert();

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        onClose={handleClose}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      <Outlet />
    </>
  );
}
