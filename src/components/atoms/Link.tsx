import { Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { Link as LinkBase, LinkProps } from "react-router-dom";

interface ILinkProps extends LinkProps {
  children: ReactNode;
  to: string;
  isDivType?: boolean;
}
const Link = ({ children, to, isDivType, ...rest }: ILinkProps) => {
  const theme = useTheme();
  const color = theme.palette.colors.cyan[150];
  return (
    <LinkBase to={to} style={{ color }} {...rest}>
      <Typography
        component={isDivType ? "div" : "span"}
        variant="body_bold"
        color={color}
      >
        {children}
      </Typography>
    </LinkBase>
  );
};

export default Link;
