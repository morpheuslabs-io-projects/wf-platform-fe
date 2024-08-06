import { VITE_AUTH_API_ENDPOINT } from "@/constants/AppConfig";
import { AxiosCommon } from "@/helper/axios";
import {
  IUpgradeMembershipResponse,
  IUpgradeMembershipBody,
  IUpdatePaymentTransactionBody,
  IUpgradeMembershipCardBody,
  IUpgradeMembershipCardResponse,
} from "@/types";
import {
  INetworkResponse,
  IPriceConversion,
  IPriceConversionResponse,
} from "@/types/web3.type";

const authClient = new AxiosCommon(VITE_AUTH_API_ENDPOINT);

export class PaymentService {
  public static postPayment = async (body: IUpgradeMembershipBody) => {
    const response = await authClient.postRequest(
      "payments/crypto/upgrade-membership",
      body
    );
    return response.data as IUpgradeMembershipResponse;
  };

  public static createStripePaymentIntent = async (
    body: IUpgradeMembershipCardBody
  ) => {
    const response = await authClient.postRequest(
      "payments/stripe/upgrade-membership",
      body
    );
    return response.data as IUpgradeMembershipCardResponse;
  };

  public static confirmStripePayment = async (paymentIntentId: string) => {
    const response = await authClient.postRequest(
      `payments/stripe/${paymentIntentId}/confirm`
    );
    return response.data;
  };

  public static getPaymentHistory = async () => {
    const response = await authClient.getRequest("payments");
    return response.data;
  };

  public static getNetworks = async () => {
    const response = await authClient.getRequest("payments/networks");
    return response.data as INetworkResponse;
  };

  public static getMindRate = async () => {
    const response = await authClient.getRequest("payments/price-conversion");
    const MIND = response.data as IPriceConversion;
    return { MIND } as IPriceConversionResponse;
  };

  public static putPaymentHash = async (
    idempotencyKey: number,
    body: IUpdatePaymentTransactionBody
  ) => {
    return await authClient.putRequest(
      `payments/${idempotencyKey}/payment-gateway-tx-id`,
      body
    );
  };
}
