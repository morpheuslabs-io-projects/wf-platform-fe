/** @format */

import { Box } from "@mui/material";
export interface ISCItemLading {
  image: string;
  title: any;
  isActive?: boolean;
}
export const SCItemLanding = (params: ISCItemLading) => {
  return (
    <Box
      style={{ width: "100%", backgroundColor: "#FFFFFF", minHeight: "300px" }}
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
