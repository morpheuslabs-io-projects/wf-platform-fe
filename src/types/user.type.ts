import { MongoDocument } from "./mongoDocument.type";
import { IAddress } from "./web3.type";

export interface User extends MongoDocument {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface IAccessData {
  refreshToken: string;
  token: string;
  tokenExpires: number;
  user?: User;
}
export interface IBenefit {
  can_access_premium_smart_contract_templates: boolean;
  can_access_premium_workflow_nodes: boolean;
  can_access_premium_workflow_templates: boolean;
  can_customized_requirements: boolean;
  can_deploy_smart_contract_using_custody_wallet: boolean;
  can_deploy_smart_contract_using_web3_wallet: boolean;
  can_use_dedicated_workflow_server: boolean;
  can_use_shared_workflow_server: boolean;
  can_use_smart_contract_audit: boolean;
  smart_contracts_deployed_on_mainnet: number;
  workflow_execution_per_month: number;
  workflow_servers: number;
  workflows_deployed: number;
}
export interface IMembership {
  benefits: IBenefit;
  expired_at: string;
  id: string;
  tier_alias: string;
  tier_name: string;
  price: number;
  updated_at: string;
  most_popular?: boolean;
  member_id: string;
}

export interface IUserToken {
  iat: number;
  exp: number;
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  gender?: string;
  status: string;
  membership: IMembership;
}

export interface IUpgradeMembershipBody {
  membership_id: IMembership["id"];
  duration_period: number;
  subscriber_address: string;
  token_address: string;
  chain_id: number;
  token_name: string;
}

export interface IUpgradeMembershipResponse {
  payload: {
    requestor: string;
    token: IAddress;
    paymentAmount: number;
    paymentReceiver: IAddress;
    item: number;
    expiry: number;
    chainId: number;
    action: "subscribe";
    nonce: string;
  };
  signature: `0x${string}`;
  tx: {
    user_id: number;
    idempotency_key: string;
    amount: number;
    reference_id: string;
    product_type: string;
    type: string;
    currency: string;
    status: string;
    transaction_date: string;
    payment_method: string;
    payment_method_id: string;
    payment_gateway: string;
    meta: {
      payload: {
        requestor: string;
        token: string;
        paymentAmount: number;
        paymentReceiver: string;
        item: number;
        expiry: number;
        chainId: number;
        action: "subscribe";
        nonce: string;
      };
      signature: string;
    };
    id: number;
  };
}

export interface ISubscribeParams {
  token: IAddress;
  paymentAmount: number | string;
  paymentReceiver: IAddress;
  item: number;
  expiry: number;
  signature: `0x${string}`;
}

export interface IUpdatePaymentTransactionBody {
  paymentGatewayTransactionId: string;
}

export interface IUpgradeMembershipCardBody {
  membership_id: IMembership["id"];
  return_url: string;
  duration_period: number;
  payment_method_id?: string;
}

export interface IUpgradeMembershipCardResponse {
  id: string;
  amount: number;
  amount_capturable: number;
  amount_received: number;
  client_secret: string;
  confirmation_method: string;
  created: number;
  currency: string;
  customer: string;
  description: string;
  payment_method: number;
  payment_method_types: string[];
}
