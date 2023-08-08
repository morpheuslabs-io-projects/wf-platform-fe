import { Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { Link as LinkBase } from 'react-router-dom';

interface LinkProps {
  children: ReactNode;
  to: string;
}
const Link = ({ children, to }: LinkProps) => {
  const theme = useTheme();
  const color = theme.palette.colors.cyan[150];
  return (
    <LinkBase to={to} style={{ color }}>
      <Typography variant="body_bold" color={color}>
        {children}
      </Typography>
    </LinkBase>
  );
};

export default Link;
