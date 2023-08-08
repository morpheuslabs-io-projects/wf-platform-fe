import { SignInMethodButton } from './SignInMethodButton';
import SvgIcon from './SvgIcon';
import { Typography } from '@mui/material';

const GoogleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <SignInMethodButton onClick={onClick}>
      <SvgIcon iconName="google" />
      <Typography variant="body_bold">Google</Typography>
    </SignInMethodButton>
  );
};

export default GoogleButton;
