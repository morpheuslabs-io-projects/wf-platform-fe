/** @format */

import { Box } from "@mui/material";
export interface ISCItemLading {
  image: string;
  title: any;
  id?: string;
  handleShowDetails?: (id: string) => void;
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
        if (params.handleShowDetails && params.id) {
          params.handleShowDetails(params.id);
        }
      }}
    >
      <Box>
        <img src={params.image} alt="bubble" width="100%" style={{}} />
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
