import PremiumBadge from "@/assets/images/premium-badge.png";
import { IBenefit } from "@/types";

interface IFeature {
  key: keyof IBenefit | null;
  title: string;
  icon?: string;
}

export const SmartcontractFeatures: IFeature[] = [
  {
    key: "can_access_premium_smart_contract_templates",
    title: "Access premium smart contract templates",
    icon: PremiumBadge,
  },
  {
    key: "can_deploy_smart_contract_using_web3_wallet",
    title: "Deploy smart contracts using Web3 wallet",
  },
  {
    key: "can_deploy_smart_contract_using_custody_wallet",
    title: "Deploy smart contracts using custody wallet",
  },
  {
    key: "smart_contracts_deployed_on_mainnet",
    title: "Total number of smart contracts deployed on Mainnet",
  },
  {
    key: "can_use_smart_contract_audit",
    title: "Smart contract Audit",
  },
];

export const WorkFlowFeatures: IFeature[] = [
  {
    key: "can_use_shared_workflow_server",
    title: "Use shared workflow server",
  },
  {
    key: "can_use_dedicated_workflow_server",
    title: "Use dedicated workflow servers",
  },
  {
    key: "workflow_servers",
    title: "Total number of workflow servers",
  },
  {
    key: "workflows_deployed",
    title: "Total number of workflow deployed",
  },
  {
    key: "workflow_execution_per_month",
    title: "Number of workflow execution per month",
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
  },
  { key: null, title: "Run" },
  {
    key: "text_web_server_tenancy",
    title: "Web server tenancy",
  },
  {
    key: "can_run_dapp_for_production_purpose",
    title: "Run dApp for production purpose",
  },
  {
    key: "text_total_number_of_dapp_running_for_production_purpose",
    title: "Total number of workflow servers for production purpose",
  },
  {
    key: "can_auto_fail_over",
    title: "Auto fail-over",
  },
  {
    key: "can_online_tutorial",
    title: "Online tutorials",
  },
  {
    key: "text_support",
    title: "Support",
  },
  {
    key: "can_customer_success_manager",
    title: "Customer success manager",
  },
  {
    key: "text_uptime_gurantee",
    title: "Uptime guarantee",
  },
];

export const WebStudioFeatures: IFeature[] = [
  { key: null, title: "Build" },
  {
    key: "can_create_dapp_with_low_code",
    title: "Create dApp with low-code",
  },
  {
    key: "can_dapp_dashboard",
    title: "dApp dashboard",
  },
  {
    key: "can_collaborative_development",
    title: "Collaborative development",
  },
  {
    key: "can_save_dapp_as_private_template",
    title: "Save dApp as private template",
  },
  {
    key: "can_save_dapp_as_public_template_to_commercialize",
    title: "Save dApp as public template (to commercialize)",
  },
  {
    key: "can_access_to_premium_dapp_templates",
    title: "Access to premium dApp templates",
  },
  {
    key: "can_integrate_smart_contract_on_blockchain_mainnet",
    title: "Integrate smart contracts on Blockchain Mainnet",
  },
  {
    key: "can_integrate_api",
    title: "Integrate APIs",
  },
  {
    key: "can_deoloy_on_morpheus_web3_platform",
    title: "Deploy on Morpheus Web3 Platform",
  },
  {
    key: "can_use_custom_domain",
    title: "Use custom domain",
  },
  {
    key: "can_deploy_on_premise",
    title: "Deploy on premise",
  },
  {
    key: "can_deploy_on_client_cloud_environment",
    title: "Deploy on client cloud environent",
  },
  {
    key: "text_web_server_tenancy",
    title: "Web server tenancy",
  },
  {
    key: "can_run_dapp_for_production_purpose",
    title: "Run dApp for production purpose",
  },
  {
    key: "text_total_number_of_dapp_running_for_production_purpose",
    title: "Total number of workflow servers for production purpose",
  },
  {
    key: "can_auto_fail_over",
    title: "Auto fail-over",
  },
  { key: null, title: "Support" },
  {
    key: "can_online_tutorial",
    title: "Online tutorials",
  },
  {
    key: "text_support",
    title: "Support",
  },
  {
    key: "can_customer_success_manager",
    title: "Customer success manager",
  },
  {
    key: "text_uptime_gurantee",
    title: "Uptime guarantee",
  },
];

export const AdditionalFeatures: IFeature[] = [
  { key: null, title: "Templates" },
  {
    key: "can_free_templates",
    title: "Free templates",
  },
  {
    key: "can_templates_from_poc_projects",
    title: "Templates from POC projects",
  },
  {
    key: "can_templates_for_mvp_projects",
    title: "Templates for MVP projects",
  },
  {
    key: "can_templates_for_production_grade_solutions",
    title: "Templates for production grade solutions",
  },
  { key: null, title: "Workshop and Professional Services" },
  {
    key: "can_three_solution_workhop_sessions",
    title: "3 solution workshop sessions",
  },
  {
    key: "can_custom_solution_and_implementation",
    title: "Custom solution consulting and implementation",
  },
  { key: null, title: "Marketing and Other Supports" },
  {
    key: "can_custom_marketing_support",
    title: "Custom marketing support",
  },
];
