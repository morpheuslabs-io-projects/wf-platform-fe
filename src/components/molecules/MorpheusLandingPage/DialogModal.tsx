/** @format */

import {
  Box,
  Card,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SCImg3 from "@/assets/images/so-image.png";
import CloseIcon from "@/assets/icons/close-icon.svg";
interface IDialogModal {
  showModalDetails: string;
  handleClose: () => void;
}
interface ISolution {
  image: string;
  title: string;
  keyFeaturesDes: string;
  benefitsDes: string;
  useCaseScenariosDes: string[];
}
export const DialogModal = ({
  showModalDetails,
  handleClose,
}: IDialogModal) => {
  const solutionDetails: ISolution = {
    image: SCImg3,
    title:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
    keyFeaturesDes: `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, sed do eiusmod
Tmpor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`,
    benefitsDes: `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, sed do eiusmod
Abore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation`,
    useCaseScenariosDes: [
      `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, sed do eiusmod
Abore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation`,
    ],
  };
  return (
    <>
      <Dialog
        open
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#ECEFF2",
          },
        }}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              padding: "24px",
              width: "60%",
              maxWidth: "60%",
              alignItems: "center",
              textAlign: "center",
            },
          },
        }}
      >
        <DialogContent style={{ padding: 0, width: "100%" }}>
          <Box
            sx={{
              p: "0",
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: "absolute", top: "-13px", right: "-13px" }}
            >
              <img src={CloseIcon} alt="" />
            </IconButton>
            <img
              src={solutionDetails.image}
              alt="bubble"
              width="100%"
              style={{}}
            />
          </Box>
          <Box>
            <Typography
              variant="header_4"
              style={{
                width: "100%",
                textAlign: "left",
                display: "block",
                marginTop: "15px",
              }}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium
            </Typography>
          </Box>

          <Box
            style={{
              padding: "24px",
              overflow: "hidden",
              textAlign: "left",
              marginTop: "15px",
              background:
                "linear-gradient(169deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.60) 100%)",
              borderRadius: 4,
              border: "1px rgba(255, 255, 255, 0.70) solid",
              backdropFilter: "blur(12px)",
              gap: 6,
            }}
          >
            <div
              style={{
                color: "#252525",
                fontSize: 16,
                fontFamily: "Poppins",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Key Features:
            </div>
            <div
              style={{
                color: "#252525",
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Lorem ipsum dolor sit amet, <br />
              consectetur adipiscing elit, sed do eiusmod
              <br />
              Tmpor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam
            </div>
          </Box>
          <Box
            style={{
              padding: "24px",
              overflow: "hidden",
              textAlign: "left",
              marginTop: "15px",
              background:
                "linear-gradient(169deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.60) 100%)",
              borderRadius: 4,
              border: "1px rgba(255, 255, 255, 0.70) solid",
              backdropFilter: "blur(12px)",
              gap: 6,
            }}
          >
            <div
              style={{
                color: "#252525",
                fontSize: 16,
                fontFamily: "Poppins",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Benefits:
            </div>
            <div
              style={{
                color: "#252525",
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Lorem ipsum dolor sit amet, <br />
              consectetur adipiscing elit, sed do eiusmod
              <br />
              Tmpor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam
            </div>
          </Box>
          <Box style={{ marginTop: "15px" }}>
            <Typography
              variant="header_5"
              style={{
                width: "100%",
                textAlign: "left",
                display: "block",
                marginTop: "15px",
              }}
            >
              Use Case Scenarios
            </Typography>
            <Grid
              container
              columnSpacing={2}
              rowSpacing={2}
              style={{ overflow: "hidden" }}
            >
              {Array.from(Array(12), (e, i) => {
                return (
                  <Grid
                    item
                    xs={4}
                    md={4}
                    // style={{
                    //   width: "25%",
                    // }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100px",
                        padding: "16px",
                        boxSizing: "border-box",
                        textAlign: "left",
                        backgroundColor: "#FFFFF",
                        background:
                          "linear-gradient(169deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.60) 100%)",
                        borderRadius: 4,
                        border: "1px rgba(255, 255, 255, 0.70) solid",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      dasdsadasdas
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
