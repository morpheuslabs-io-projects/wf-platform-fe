import { Box, Typography } from '@mui/material';
import BubbleImage from '@/assets/images/bubble.png';
import AuthBg from '@/assets/images/auth-bg.png';

const AppJourney = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${AuthBg})`,
        paddingTop: '80px',
        paddingBottom: '76px',
        px: '80px',
      }}
    >
      <Typography
        variant="header_2"
        color="common.white"
        component="h2"
        mb="32px"
        lineHeight={'52px'}
      >
        Start your Journey with us.
      </Typography>
      <Typography color="common.white" variant="sub_title" mb="100px" component="p">
      Enable you digital transformation with our AI-Powered Low Code Platform
      </Typography>
      <img src={BubbleImage} alt="bubble" width="100%" />
    </Box>
  );
};

export default AppJourney;
