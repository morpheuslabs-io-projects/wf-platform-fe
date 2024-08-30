import { Box, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
const faqMock = [
  {
    question: "What is Morpheus Labs Web3 Platform?",
    answer: "What is Morpheus Labs Web3 Platform?",
  },
  {
    question: "What is Smart Contract Studio?",
    answer: "What is Smart Contract Studio?",
  },
  {
    question: "What is Web3 Workflow Studio?",
    answer: "What is Web3 Workflow Studio?",
  },
  {
    question: "What is Web3 Web Studio?",
    answer: "What is Web3 Web Studio?",
  },
  {
    question: "What can I do with the Free tier?",
    answer: "What can I do with the Free tier?",
  },
  {
    question: "What can I do with the Premium tier?",
    answer: "What can I do with the Premium tier?",
  },
  {
    question: "What can I do with the Business tier?",
    answer: "What can I do with the Business tier?",
  },
  {
    question: " What is a Web3 solution?",
    answer:
      "A Web3 solution uses decentralized technologies like blockchain and smart contracts to meet specific business or user needs. It can involve building new decentralized systems or enabling Web3 functionality in existing applications. Web3 solutions aim to enhance security, give users more control over their data, and improve transparency and efficiency. They often involve integrating components like smart contracts, decentralized storage, and Web3 wallets with traditional systems—not only for seamless operation but also to reduce costs, increase trust, and ensure greater resilience.",
  },
  {
    question: "What can I do with the Enterprise tier?",
    answer: "What can I do with the Enterprise tier?",
  },
  {
    question: "What are the payment methods supported?",
    answer: "What are the payment methods supported?",
  },
  {
    question: "How long is the minimum subscription duration?",
    answer: "How can I upgrade my current subscription plan?",
  },
  {
    question: "How can I contact customer support when I encounter issues?",
    answer: "How can I contact customer support when I encounter issues?",
  },
];
interface FaqProps {
  question: string;
  answer: string;
}

interface FaqItemProps {
  faq: FaqProps;
  activeIndex: number;
  index: number;
  setActiveFaq: (index: number) => void;
}

function FaqItem({ faq, index, activeIndex, setActiveFaq }: FaqItemProps) {
  const handleSetActiveFaq = () => {
    if (activeIndex === index) {
      setActiveFaq(-1);
    } else setActiveFaq(index);
  };
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "24px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: activeIndex === index ? "#495BFD" : "#F5F7FF",
          padding: "16px",
          gap: "32px",
          cursor: "pointer",
          borderRadius: "20px",
          border: "0.6px solid #F0F0F0",
          width: "calc(50% - 16px)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        onClick={() => handleSetActiveFaq()}
      >
        {activeIndex === index ? <RemoveIcon /> : <AddCircleIcon />}

        <Typography
          variant="body_bold"
          sx={{
            color: activeIndex === index ? "#fff" : "#252525",
          }}
        >
          {faq.question}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "calc(50% - 48px)",
          borderTop: activeIndex === index ? "7px solid #495BFD" : "none",
          opacity: activeIndex === index ? 1 : 0,
          // display: activeIndex === index ? "block" : "none",
          marginLeft: "16px", // Space between question and answer
          transition: "opacity 0.3s ease-in", // Smooth transition for showing answer
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <Typography variant="body">{faq.answer}</Typography>
      </Box>
    </Box>
  );
}

function Faq() {
  const [faqs] = useState(faqMock);
  const [activeFaq, setActiveFaq] = useState(-1);

  return (
    <Box
      sx={{
        width: "100%",
        background: "#FFF",
        padding: "48px 0px",
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
            Frequently Asked Questions
          </Typography>
        </Stack>
        <Box
          sx={{
            width: "100%",
            padding: "48px 0px",
          }}
        >
          {faqs.map((faq, index) =>
            FaqItem({ faq, index, activeIndex: activeFaq, setActiveFaq })
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Faq;
