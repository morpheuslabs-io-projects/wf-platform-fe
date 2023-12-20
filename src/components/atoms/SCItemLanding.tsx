/** @format */

import { Box } from "@mui/material";
export interface ISCItemLading {
  image: string;
  title: any;
  slug: string;
  handleShowDetails?: (slug: string) => void;
}
export const SCItemLanding = (params: ISCItemLading) => {
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        minHeight: "265px",
        cursor: "pointer",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
      }}
      onClick={() => {
        if (params.handleShowDetails && params.slug) {
          params.handleShowDetails(params.slug);
        }
      }}
    >
      <Box style={{ textAlign: "center", height: "200px" }}>
        <img
          src={params.image}
          alt="bubble"
          style={{
            maxHeight: "200px",
            maxWidth: "100%",
            height: "100%",
            width: "100%",
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
        <p
          style={{
            textAlign: "center",
            color: "#252525",
            fontSize: "16",
            fontFamily: "Poppins",
            fontWeight: "700",
            padding: "0 10px",
          }}
        >
          {params.title}
        </p>
      </Box>
    </Box>
  );
};
