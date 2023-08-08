import { SignInMethodButton } from './SignInMethodButton';
import SvgIcon from './SvgIcon';
import { Typography } from '@mui/material';

const MetamaskButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <SignInMethodButton onClick={onClick}>
      <SvgIcon iconName="metamask" />
      <Typography variant="body_bold">Metamask</Typography>
    </SignInMethodButton>
  );
};

export default MetamaskButton;
