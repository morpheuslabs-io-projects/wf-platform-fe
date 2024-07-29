import PremiumBadge from "@/assets/images/premium-badge.png";
import { IBenefit } from "@/types";

interface IFeature {
  key: keyof IBenefit;
  title: string;
  icon: string;
}

export const WorkFlowFeatures: IFeature[] = [
  {
    key: "can_use_shared_workflow_server",
    title: "Use shared workflow server",
    icon: "",
  },
  {
    key: "can_use_dedicated_workflow_server",
    title: "Use dedicated workflow servers",
    icon: "",
  },
  {
    key: "workflow_servers",
    title: "Total number of workflow servers",
    icon: "",
  },
  {
    key: "workflows_deployed",
    title: "Total number of workflow deployed",
    icon: "",
  },
  {
    key: "workflow_execution_per_month",
    title: "Number of workflow execution per month",
    icon: "",
  },
  {
    key: "can_access_premium_workflow_nodes",
    title: "Access premium workflow nodes",
    icon: PremiumBadge,
  },
  {
    key: "can_access_premium_workflow_templates",
    title: "Access premium workflow templates",
    icon: PremiumBadge,
  },
  {
    key: "can_customized_requirements",
    title: "Customized Requirements",
    icon: "",
  },
];

export const SmartcontractFeatures: IFeature[] = [
  {
    key: "can_access_premium_smart_contract_templates",
    title: "Access premium smart contract templates",
    icon: PremiumBadge,
  },
  {
    key: "can_deploy_smart_contract_using_web3_wallet",
    title: "Deploy smart contracts using Web3 wallet",
    icon: "",
  },
  {
    key: "can_deploy_smart_contract_using_custody_wallet",
    title: "Deploy smart contracts using custody wallet",
    icon: "",
  },
  {
    key: "smart_contracts_deployed_on_mainnet",
    title: "Total number of smart contracts deployed on Mainnet",
    icon: "",
  },
  {
    key: "can_use_smart_contract_audit",
    title: "Smart contract Audit",
    icon: "",
  },
];
