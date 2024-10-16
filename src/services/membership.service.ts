import { VITE_AUTH_API_ENDPOINT } from "@/constants/AppConfig";
import { AxiosCommon } from "@/helper/axios";
import { IMembership } from "@/types";

const authClient = new AxiosCommon(VITE_AUTH_API_ENDPOINT);

export class MembershipService {
  public static getMemberships = async () => {
    const response = await authClient.getRequest("memberships");
    return response.data as IMembership[];
  };
  public static getCurrentMembership = async () => {
    const response = await authClient.getRequest("memberships/current");
    return response.data as IMembership;
  };

  public static getReferralData = async () => {
    const response = await authClient.getRequest(`memberships/referral`);
    return response.data;
  };
  
}
