import { Box } from "@mui/material";
import BubbleImage2 from "@/assets/images/bubble2.png";
import AuthBg2 from "@/assets/images/auth-bg2.png";
import useStyles from "./style";

const AppJourney = () => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        backgroundImage: `url(${AuthBg2})`,
        paddingTop: "110px",
        px: "80px",
      }}
    >
      <span className={classes.text1}>
        Enable your digital transformation with our AI-Powered Low Code Platform
      </span>
      {/* <Typography color="common.white" variant="sub_title" mb="100px" component="p">
      Enable you digital transformation with our AI-Powered Low Code Platform
      </Typography> */}
      <img src={BubbleImage2} alt="bubble" width="100%" style={{ marginTop: '65px'}}/>
    </Box>
  );
};

export default AppJourney;
