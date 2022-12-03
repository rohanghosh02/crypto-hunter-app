import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AppBar, Backdrop, Box, Fade, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import { GoogleButton } from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const { user, setAlert } = CryptoState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          type: "success",
          message: "Sign In Successful !",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          type: "error",
          message: error.message,
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          width: 85,
          height: 40,

          backgroundColor: "#EEBC1D",
        }}
      >
        Login
      </Button>
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            style={{
              width: 400,
              backgroundColor: "#5A5A5A",
              color: "white",
              borderRadius: 10,
            }}
          >
            <AppBar
              position="static"
              sx={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                sx={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}

            <Box
              sx={{
                padding: 3,
                paddingTop: 0,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                gap: 2,
                fontSize: 20,
              }}
            >
              <span style={{ zIndex: 1 }}>OR</span>

              <GoogleButton
                style={{ width: "100%", outline: "none", zIndex: 1 }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
