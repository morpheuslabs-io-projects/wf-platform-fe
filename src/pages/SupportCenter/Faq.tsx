import { Box, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
const faqMock = [
  {
    question: "What is a Web3 solution?",
    answer: (
      <>
        A Web3 solution uses decentralized technologies like blockchain and
        smart contracts to meet specific business or user needs. It can involve
        building new decentralized systems or enabling Web3 functionality in
        existing applications.
        <br /> Web3 solutions aim to enhance security, give users more control
        over their data, and improve transparency and efficiency. They often
        involve integrating components like smart contracts, decentralized
        storage, and Web3 wallets with traditional systems—not only for seamless
        operation but also to reduce costs, increase trust, and ensure greater
        resilience.
      </>
    ),
  },
  {
    question: "What is Morpheus Labs Web3 Platform?",
    answer: (
      <>
        The Morpheus Labs Web3 Platform is a comprehensive SaaS platform
        designed to empower developers, enterprises, and innovators to
        implement, operate, and manage Web3 solutions effortlessly.
        <br />
        The platform provides an integrated suite of tools, including Smart
        Contract Studio, Workflow Studio, and Web Studio, all supported by a
        robust infrastructure that ensures seamless integration between
        traditional Web2 systems and cutting-edge Web3 technologies.
      </>
    ),
  },
  {
    question: "What is Smart Contract Studio?",
    answer: (
      <>
        Smart Contract Studio is an AI-Powered tool within the Morpheus Labs
        Web3 Platform that allows users to create, test, and deploy secure smart
        contracts on EVM-based blockchains with minimum smart contract
        experiences. <br />
        It provides AI-assisted smart contract creation and testing, as well as
        advanced Expert Support that simplify the process, making smart contract
        development accessible to both beginners and experienced developers.
      </>
    ),
  },
  {
    question: "What is Web3 Workflow Studio?",
    answer: (
      <>
        Web3 Workflow Studio enables users to design, automate, and manage
        complex Web3 processes. <br />
        It supports seamless integration with existing applications and
        decentralized systems, allowing users to streamline operations, connect
        various Web3 components, and automate business logic using smart
        contracts.
      </>
    ),
  },
  {
    question: "What is Web3 Web Studio?",
    answer: (
      <>
        Web3 Web Studio is a development environment within the Morpheus Labs
        Web3 Platform that allows users to build, deploy, and manage Web3 web
        applications. <br />
        It supports popular web development frameworks and integrates smoothly
        with blockchain and decentralized systems, providing a cohesive
        environment for creating user-facing Web3 solutions.
      </>
    ),
  },
  {
    question: "What can I do with the Free tier?",
    answer: (
      <>
        With the Free tier, you can explore the Morpheus Labs Web3 Platform and
        develop basic Web3 solutions at no cost.
        <br />
        This tier gives you access to essential tools and features, allowing you
        to test and deploy simple Web3 applications or smart contracts, ideal
        for learning and experimentation.
      </>
    ),
  },
  {
    question: "What can I do with the Premium tier?",
    answer: (
      <>
        The Premium tier is designed for individuals looking to develop and run
        more advanced Web3 solutions. <br />
        It offers access to enhanced tools and resources, including advanced
        features in Smart Contract Studio, Workflow Studio, and Web Studio,
        enabling the creation and deployment of more sophisticated and scalable
        Web3 solutions.
      </>
    ),
  },
  {
    question: "What can I do with the Business tier?",
    answer: (
      <>
        The Business tier is tailored for companies aiming to develop, deploy,
        and integrate Web3 solutions within their existing systems. <br />
        It provides higher resource limits, priority support, and enhanced
        capabilities for integrating Web3 technologies with traditional
        applications, making it ideal for businesses that require robust and
        scalable solutions.
      </>
    ),
  },
  {
    question: "What can I do with the Enterprise tier?",
    answer: (
      <>
        The Enterprise tier is customized to meet the specific needs of large
        organizations implementing Web3 solutions at scale. <br />
        It offers a fully customizable package, including dedicated support,
        advanced security features, and the ability to deploy and manage Web3
        solutions across multiple blockchain networks, ensuring a tailored and
        resilient approach to your business requirements.
      </>
    ),
  },
  {
    question: "What are the payment methods supported?",
    answer:
      "We support a variety of payment methods, including major credit cards and cryptocurrency payments (USDT and MIND token).",
  },
  {
    question: "How long is the minimum subscription duration?",
    answer: (
      <>
        The minimum subscription duration is one month. <br />
        You have the flexibility to renew your subscription monthly or choose a
        longer-term commitment, such as an annual plan, which may offer
        additional benefits.
      </>
    ),
  },
  {
    question: "How can I upgrade my current subscription plan?",
    answer: (
      <>
        You can upgrade your current subscription plan at any time through the
        Membership function.
        <br /> Simply navigate to the User Profile section, select your desired
        plan, and follow the prompts to complete the upgrade process.
      </>
    ),
  },
  {
    question: "How can I contact customer support when I encounter issues?",
    answer: (
      <>
        You can chat with our support team in Support Center on our Web3
        platform.
        <br />
        Or to get additional assistance, please reach out to our Developer
        Support team via:
        <br />
        Telegram:{" "}
        <a href="https://t.me/MorpheusSEED_Dev" target="_blank">
          https://t.me/MorpheusSEED_Dev
        </a>
        <br />
        Discord:{" "}
        <a href="https://discord.gg/mbdXpD2fZm" target="_blank">
          https://discord.gg/mbdXpD2fZm
        </a>
      </>
    ),
  },
  {
    question: "What is CDE?",
    answer: (
      <>
        This is a collaborative development environment that allows for the
        creation of Web3 solutions without requiring extensive coding knowledge.
        <br />
        By providing ready-to-use application examples and an integrated
        development environment (IDE). Organizations and teams can take
        advantage of the SEED's CDE to share workspaces among team members. With
        a shared workspace, multiple users can together use the cloud IDE to
        co-create applications sharing the provided language services, stacks,
        runtimes and source repositories.
      </>
    ),
  },
  {
    question: "What blockchain services do I have?",
    answer: (
      <>
        You can spin up blockchain nodes and networks in minutes on our platform
        by using the Blockchain Ops function.
        <br />
        It enables you to run multiple blockchains quickly and easily. You can
        select from different choices of RPC blockchain services. You can create
        your own private network to test your solution in your selected
        blockchain as well.{" "}
      </>
    ),
  },
  {
    question: "What is the App Library ?",
    answer: (
      <>
        With our App Library, you may download ready-built applications with
        preconfigured tasks.
        <br />
        This offers an instant project onboarding as it saves you from the
        hassles of setting up the infrastructure.
        <br />
        With a range of applications available for download and customization
        from our App Library, you can now focus on projects that differentiate
        your business.
      </>
    ),
  },
];
interface FaqProps {
  question: string;
  answer: string | JSX.Element;
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
      key={index}
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
          zIndex: activeIndex === index ? 100 : -1,
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
      id="faq"
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
