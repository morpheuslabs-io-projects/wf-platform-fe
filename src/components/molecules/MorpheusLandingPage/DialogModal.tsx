/** @format */

import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@/assets/icons/close-icon.svg";
import { useEffect, useState } from "react";
import { getDetailsSampleSolution } from "@/services/sampleSolution.service";

import { ReactComponent as GetStarted } from "@/assets/icons/get-started.svg";
import { EWindowSize, useReSize } from "@/hooks/useSize";
interface IDialogModal {
  slugShowModalDetails: string;
  handleClose: () => void;
}
export const DialogModal = ({
  slugShowModalDetails,
  handleClose,
}: IDialogModal) => {
  const [dataSolutionDetails, setDataSolutionDetails] = useState<any>();
  const mode = useReSize();

  useEffect(() => {
    if (slugShowModalDetails) {
      getDetailsSampleSolution(slugShowModalDetails).then((data) => {
        setDataSolutionDetails(data.data);
      });
    }
  }, [slugShowModalDetails]);
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
              width: `${mode === EWindowSize.PC ? "60%" : "95%"}`,
              maxWidth: `${mode === EWindowSize.PC ? "60%" : "95%"}`,
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
              src={dataSolutionDetails && dataSolutionDetails.photo}
              alt="bubble"
              style={{
                height: `${mode === EWindowSize.PC ? "400px" : "128px"}`,
                maxHeight: `${mode === EWindowSize.PC ? "400px" : "128px"}`,
                maxWidth: "100%",
              }}
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
              {dataSolutionDetails && dataSolutionDetails.title}
            </Typography>
            <Typography
              variant="header_5"
              style={{
                width: "100%",
                textAlign: "left",
                display: "block",
                margin: "9px 0 17px",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              {dataSolutionDetails && dataSolutionDetails.subtitle}
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
            {dataSolutionDetails &&
              dataSolutionDetails.keyFeatures.length > 0 && (
                <>
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
                  <ul
                    style={{
                      color: "#252525",
                      fontSize: 14,
                      margin: 0,
                      fontFamily: "Poppins",
                      paddingLeft: "25px",
                      fontWeight: "400",
                      wordWrap: "break-word",
                    }}
                  >
                    {dataSolutionDetails.keyFeatures.map(
                      (item: any, idx: number) => {
                        return (
                          <>
                            {item.item && (
                              <li
                                key={idx}
                                style={{
                                  listStyleType: "disc",
                                  lineHeight: "23px",
                                  marginTop: "5px",
                                }}
                              >
                                {item.item}
                              </li>
                            )}
                          </>
                        );
                      }
                    )}
                  </ul>
                </>
              )}
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
            {dataSolutionDetails && dataSolutionDetails.benefits.length > 0 && (
              <>
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
                <ul
                  style={{
                    color: "#252525",
                    fontSize: 14,
                    margin: 0,
                    fontFamily: "Poppins",
                    paddingLeft: "25px",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  {dataSolutionDetails.benefits.map(
                    (item: any, idx: number) => {
                      return (
                        <>
                          {item.item && (
                            <li
                              key={idx}
                              style={{
                                listStyleType: "disc",
                                lineHeight: "23px",
                                marginTop: "5px",
                              }}
                            >
                              {item.item}
                            </li>
                          )}
                        </>
                      );
                    }
                  )}
                </ul>
              </>
            )}
          </Box>
          {dataSolutionDetails && dataSolutionDetails.useCases.length > 0 && (
            <>
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
                  style={{ overflow: "hidden", marginTop: "2px" }}
                >
                  {dataSolutionDetails.useCases.map(
                    (useCase: any, idx: number) => {
                      return (
                        <Grid
                          item
                          key={idx}
                          xs={4}
                          md={4}
                          height={"auto"}
                          // style={{
                          //   width: "25%",
                          // }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
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
                            <img
                              src={useCase.item}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                height: "100%",
                                width: "100%",
                              }}
                            />
                          </div>
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </Box>
            </>
          )}
          <Box sx={{ textAlign: "left" }}>
            <IconButton
              style={{ borderRadius: "0", padding: "20px 0 0" }}
              onClick={() => {
                let url = dataSolutionDetails.actionUrl;
                url = url.match(/^https?:/) ? url : "//" + url;
                window.open(url, "_blank");
              }}
            >
              <GetStarted />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
