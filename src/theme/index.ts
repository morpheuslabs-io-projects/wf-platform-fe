import { createTheme } from "@mui/material";
import { ColorPartial } from "@mui/material/styles/createPalette";
import { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: ColorPartial;
    colors: {
      [key: string]: {
        [key: string | number]: string;
      };
    };
  }

  interface Theme {
    palette: Palette;
  }

  interface PaletteOptions {
    neutral: ColorPartial;
    colors: {
      [key: string]: {
        [key: string | number]: string;
      };
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    ghost: true;
    fill: true;
    fill_small: true;
    text: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    header_1: CSSProperties;
    header_2: CSSProperties;
    header_3: CSSProperties;
    sub_title: CSSProperties;
    body: CSSProperties;
    body_bold: CSSProperties;
    button_S: CSSProperties;
    button_S_no_opacity: CSSProperties;
    button_M: CSSProperties;
    button_L: CSSProperties;
  }

  interface TypographyVariantsOptions {
    header_1?: CSSProperties;
    header_2?: CSSProperties;
    header_3?: CSSProperties;
    sub_title?: CSSProperties;
    body?: CSSProperties;
    body_bold?: CSSProperties;
    button_S?: CSSProperties;
    button_S_no_opacity?: CSSProperties;
    button_M?: CSSProperties;
    button_L?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    header_1: true;
    header_2: true;
    header_3: true;
    sub_title: true;
    body: true;
    body_bold: true;
    button_S: true;
    button_S_no_opacity: true;
    button_M: true;
    button_L: true;
  }
}

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#463abe",
      dark: "#342A8B",
      contrastText: "#252525",
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#0b0b0c",
      secondary: "#61616a",
    },
    neutral: {
      50: "#dbdbde",
      100: "#C3C3C3",
    },
    common: {
      white: "#fff",
      black: "#000",
    },
    colors: {
      white: {
        50: "#F1F5FA",
        100: "#FFFFFF",
        150: "#D0D0E0",
      },
      black: {
        50: "#252525",
      },
      purple: {
        50: "#8249FD",
        100: "#A6AEF6",
      },
      green: {
        50: "#56F22F",
      },
      cyan: {
        50: "#69DFDA",
        100: "#56B0B6",
        150: "#4BA0EE",
      },
    },
  },
});

const theme = createTheme(defaultTheme, {
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 16,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        color: defaultTheme.palette.colors.black[50],
        fontStyle: "normal",
      },
      variants: [
        {
          props: { variant: "header_1" },
          style: {
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: "83px",
          },
        },
        {
          props: { variant: "header_2" },
          style: {
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "70px",
          },
        },
        {
          props: { variant: "header_3" },
          style: {
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "48px",
            props: { variant: "header_3" },
          },
        },
        {
          props: { variant: "sub_title" },
          style: {
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "34px",
          },
        },
        {
          props: { variant: "body" },
          style: {
            fontSize: "16px",
            fontWeight: 400,
          },
        },
        {
          props: { variant: "body_bold" },
          style: {
            fontSize: "16px",
            fontWeight: 700,
          },
        },
        {
          props: { variant: "button_S" },
          style: {
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "16px",
            textTransform: "uppercase",
            opacity: 0.5,
          },
        },
        {
          props: { variant: "button_S_no_opacity" },
          style: {
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "16px",
            textTransform: "uppercase"
          },
        },
        {
          props: { variant: "button_M" },
          style: {
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "16px",
            textTransform: "uppercase",
          },
        },
        {
          props: { variant: "button_L" },
          style: {
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: "18px",
            textTransform: "uppercase",
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
        },
      },
      variants: [
        {
          props: {
            variant: "primary",
          },
          style: {
            background:
              "linear-gradient(133deg, #7849FD 0%, rgba(69, 226, 207, 0.81) 100%)",
            color: defaultTheme.palette.colors.white[50],
            border: "none",
            borderRadius: "unset",
            fontSize: "18px",
            height: "54px",
            padding: "18px 32px",
            fontWeight: "700",
            boxSizing: "none",
            lineHeight: "18px",
            backdropFilter: "blur(2px)",
            "&:disabled": {
              opacity: 0.3,
              background:
                "linear-gradient(133deg, #7849FD 0%, rgba(69, 226, 207, 0.81) 100%)",
              backdropFilter: "blur(2px)",
              color: defaultTheme.palette.colors.white[50],
            },
            "&:hover": {
              background:
                "linear-gradient(133deg, #7849FD 0%, rgba(69, 226, 207, 0.81) 100%)",
              color: defaultTheme.palette.colors.white[50],
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            backgroundColor: defaultTheme.palette.colors.black[50],
            color: defaultTheme.palette.colors.white[50],
            border: "1px solid",
            borderColor: defaultTheme.palette.colors.black[50],
            borderRadius: "unset",
            padding: "13px 24px",
            fontSize: "16px",
            height: "54px",
            fontWeight: "700",
            boxSizing: "none",
            "&:disabled": {
              backdropFilter: "blur(2px)",
              opacity: 0.3,
              color: defaultTheme.palette.colors.white[50],
            },
            "&:hover": {
              backgroundColor: defaultTheme.palette.colors.black[50],
              color: defaultTheme.palette.colors.white[100],
            },
          },
        },
        {
          props: { variant: "ghost" },
          style: {
            backgroundColor: defaultTheme.palette.colors.white[100],
            color: defaultTheme.palette.colors.black[50],
            border: "1px solid",
            borderColor: defaultTheme.palette.colors.black[50],
            borderRadius: "unset",
            padding: "13px 24px",
            fontSize: "16px",
            height: "54px",
            fontWeight: "700",
            boxSizing: "none",
            "&:disabled": {
              backdropFilter: "blur(2px)",
              opacity: 0.3,
            },
            "&:hover": {
              backgroundColor: "inherit",
              color: "inherit",
            },
          },
        },
        {
          props: { variant: "fill" },
          style: {
            backgroundColor: defaultTheme.palette.colors.black[50],
            color: defaultTheme.palette.colors.white[100],
            border: "1px solid",
            borderColor: defaultTheme.palette.colors.black[50],
            borderRadius: "20px",
            padding: "8px 16px",
            fontSize: "18px",
            height: "unset",
            fontWeight: "700",
            lineHeight: "18px",
            boxSizing: "none",
            "&:disabled": {
              backdropFilter: "blur(2px)",
              opacity: 0.3,
              color: defaultTheme.palette.colors.white[100],
            },
            "&:hover": {
              backgroundColor: defaultTheme.palette.colors.black[50],
              color: defaultTheme.palette.colors.white[100],
            },
          },
        },
        {
          props: { variant: "fill_small" },
          style: {
            backgroundColor: defaultTheme.palette.colors.black[50],
            color: defaultTheme.palette.colors.white[100],
            border: "1px solid",
            borderColor: defaultTheme.palette.colors.black[50],
            borderRadius: "20px",
            padding: "2px 16px",
            fontSize: "12px",
            height: "unset",
            fontWeight: "700",
            lineHeight: "16px",
            boxSizing: "none",
            "&:disabled": {
              backdropFilter: "blur(2px)",
              opacity: 0.3,
              color: defaultTheme.palette.colors.white[100],
            },
            "&:hover": {
              backgroundColor: defaultTheme.palette.colors.black[50],
              color: defaultTheme.palette.colors.white[100],
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            backgroundColor: "unset",
            color: defaultTheme.palette.colors.black[50],
            border: "none",
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "16px",
            "&:disabled": {
              backdropFilter: "blur(2px)",
              opacity: 0.3,
              color: defaultTheme.palette.colors.black[50],
            },
            "&:hover": {
              backgroundColor: "unset",
              color: defaultTheme.palette.colors.black[50],
            },
          },
        },
      ],
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.colors.cyan[150],
        },
      },
    },
  },
});

export default theme;
