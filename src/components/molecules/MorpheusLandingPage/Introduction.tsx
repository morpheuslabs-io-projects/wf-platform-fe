import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Background from "@/assets/icons/morpheus-background.svg";
import AI from "@/assets/icons/AI.svg";
import NextIcon from "@/assets/icons/next-black.svg";
import { VITE_APP_SC_URL, VITE_APP_WF_URL } from "@/constants/AppConfig";

const Introduction: FC = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${Background})`,
          minHeight: "400px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box sx={{ pt: "15px" }}>
          <Box>
            <img src={AI} alt="" />
            <Box
              sx={{
                width: "max-content",
                margin: "auto",
                px: 2,
                background:
                  "linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.47) 60.71%, rgba(255, 255, 255, 0.49) 100%)",
              }}
            >
              <Typography variant="sub_title">
                Enable Web3 Transformation and Process Automation with our
              </Typography>
            </Box>
            <Box>
              <Typography variant="header_2">
                AI-Powered Web3 Workflow Platform
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            gap: 2,
            top: "-45px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "45px 80px",
              alignItems: "end",
              background: "linear-gradient(160deg, #D7E0FF 0%, #FFF 100%)",
              backdropFilter: "blur(2px)",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => window.open(`${VITE_APP_WF_URL}`)}
          >
            <Typography variant="sub_title">
              Start Process
              <br /> Automation
              <Box component="img" src={NextIcon} alt="" sx={{ pl: "10px" }} />
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "45px 80px",
              alignItems: "end",
              background: "linear-gradient(160deg, #DCFFD7 0%, #FFF 100%)",
              backdropFilter: "blur(2px)",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => window.open(`${VITE_APP_WF_URL}`)}
          >
            <Typography variant="sub_title">
              Start Integration
              <br />
              Automation
              <Box component="img" src={NextIcon} alt="" sx={{ pl: "10px" }} />
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "45px 80px",
              alignItems: "end",
              background: "linear-gradient(160deg, #FFFBD7 0%, #FFF 100%)",
              backdropFilter: "blur(2px)",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => window.open(`${VITE_APP_SC_URL}`)}
          >
            <Typography variant="sub_title">
              Create <br />
              Smart Contracts
              <Box component="img" src={NextIcon} alt="" sx={{ pl: "10px" }} />
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", px: "8%", pt: "120px" }}>
          <Grid container columnSpacing={6} rowSpacing={3}>
            <Grid item xs={12} md={6}>
              <Box>
                <iframe
                  width="100%"
                  height="350"
                  src="https://www.youtube.com/embed/5wOhrU2V-SI"
                  title="Artificial intelligence Intro Template"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                Find out more info from the product demo video
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Introduction;
