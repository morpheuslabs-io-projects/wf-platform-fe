/** @format */

import { EWindowSize, useReSize } from "@/hooks/useSize";
import { Box } from "@mui/material";
export interface ISCItemLading {
  image: string;
  title: any;
  slug: string;
  handleShowDetails?: (slug: string) => void;
  maxHeight: string;
  minHeight: string;
}
export const SCItemLanding = (params: ISCItemLading) => {
  const mode = useReSize();
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        minHeight: params.minHeight,
        cursor: "pointer",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
      }}
      onClick={() => {
        if (params.handleShowDetails && params.slug) {
          params.handleShowDetails(params.slug);
        }
      }}
    >
      <Box
        style={{
          textAlign: "center",
          maxHeight: params.maxHeight,
          width: "100%",
        }}
      >
        <img
          src={params.image}
          alt="bubble"
          style={{
            width: "100%",
            maxWidth: "100%",
            maxHeight: `${
              mode === EWindowSize.PC
                ? "218px"
                : mode === EWindowSize.PCMIN
                ? "181px"
                : mode === EWindowSize.TABLET
                ? "210px"
                : "100%"
            }`,
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
