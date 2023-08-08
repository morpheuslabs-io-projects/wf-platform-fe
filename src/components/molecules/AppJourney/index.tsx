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
      >
        Start your Journey with us.
      </Typography>
      <Typography color="common.white" variant="body" mb="100px" component="p">
        Lorem ipsum dolor sit amet consectetur. Aliquam nulla sit eget ac a
        risus faucibus id. Maecenas feugiat id nunc massa. Amet tristique a eget
        lorem non aliquet mattis suscipit cras.
      </Typography>
      <img src={BubbleImage} alt="bubble" width="100%" />
    </Box>
  );
};

export default AppJourney;
