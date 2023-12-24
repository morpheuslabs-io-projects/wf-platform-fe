/** @format */

import { Box } from "@mui/material";

export const FooterComponent = () => {
  return (
    <Box
      style={{
        paddingBottom: "24px",
        backgroundColor: "rgb(241, 245, 250)",
      }}
    >
      <div
        style={{
          color: "black",
          fontSize: "12px",
          textAlign: "center",
          width: "100%",
          fontFamily: "Poppins",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Copyrights ©️ 2023 Morpheus Labs. All Rights Reserved.
      </div>
    </Box>
  );
};
