import { Box, Button, Stack, Typography } from "@mui/material";
import SupportChatIcon from "@/assets/icons/support-chat.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatIcon from "@mui/icons-material/Chat";

function SupportChat() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#FFF",
      }}
    >
      <Box
        sx={{
          maxWidth: "1536px",
          padding: "0 24px",
          margin: "0 auto",
        }}
      >
        <Stack
          spacing={{ xs: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ pb: "48px", justifyContent: "center" }}
        >
          <Typography variant="subtitle_bold">
            Chat with Support Team
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "48px",
            gap: "24px",
          }}
        >
          <img src={SupportChatIcon} alt="support-chat" />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              maxWidth: "351px",
              padding: "0 48px",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon color="success" />
              <Typography variant="body_bold" sx={{ textAlign: "center" }}>
                Ready to Go Live?
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                maxWidth: "280px",
              }}
            >
              <Typography variant="body">
                Get in touch with us to review your account and make sure you’re
                set up on the optimal plan.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: "351px",
              padding: "0 48px",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon color="success" />
              <Typography variant="body_bold" sx={{ textAlign: "center" }}>
                Need Coding or Technical Assistance?
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                maxWidth: "280px",
              }}
            >
              <Typography variant="body">
                Join our community! Post your questions on our forum or connect
                with us directly on Discord.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: "351px",
              padding: "0 48px",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleIcon color="success" />
              <Typography variant="body_bold" sx={{ textAlign: "center" }}>
                Unsure About Your Tech Stack?
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                maxWidth: "280px",
              }}
            >
              <Typography variant="body">
                Send us a request, and we’ll guide you with our top
                recommendations and best practices!
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "33px 0px",
            paddingBottom: "48px",
          }}
        >
          <Button
            startIcon={<ChatIcon />}
            sx={{
              backgroundColor: "#4051EC",
              color: "#FFF",
              padding: "14px 26px",
              borderRadius: "6px",
            }}
          >
            Contact Support
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SupportChat;
