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
        backgroundColor: "#FFFFFF",
        minHeight: "305px",
        cursor: "pointer",
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
          style={{ maxHeight: "200px", maxWidth: "100%" }}
        />
      </Box>
      <Box
        style={{
          width: "100%",
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
          }}
        >
          {params.title}
        </p>
      </Box>
    </Box>
  );
};
