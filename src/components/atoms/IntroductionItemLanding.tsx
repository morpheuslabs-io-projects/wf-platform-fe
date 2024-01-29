import { Box, Typography } from "@mui/material";
export interface ISCItemLading {
  image: string;
  title: string;
  video: string;
  handleShowDetails?: (slug: string) => void;
  maxHeight: string;
  minHeight: string;
  cta?: string;
  description?: string;
}
export const IntroductionItemLanding = (params: ISCItemLading) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        backgroundColor: "#FFFFFF",
        minHeight: params.minHeight,
        cursor: "pointer",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
      }}
      onClick={() => {
        if (params.video) window.open(params.video, "_blank");
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxHeight: params.maxHeight,
          padding: "16px 16px 0 16px",
        }}
      >
        <img
          src={params.image}
          alt="bubble"
          style={{
            maxWidth: "calc(100%)",
          }}
        />
      </Box>
      <Box
        style={{
          width: "100%",
          height: `calc(100% - 200px)`,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body"
          style={{
            color: "#252525",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            fontSize: "14",
            textAlign: "center",
            fontFamily: "Poppins",
            fontWeight: "400",
            height: "54px",
            padding: "0 16px 16px 16px",
          }}
        >
          {params.title}
        </Typography>
      </Box>
    </Box>
  );
};
