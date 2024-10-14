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
    console.log('wf-platform-fe MembershipService getCurrentMembership: ', response)
    return response.data as IMembership;
  };

  public static fetchReferralData = async () => {
    try {
      const response = await authClient.getRequest(`/memberships/referral`);
      return response.data;
    } catch (error) {
      console.error('Error fetching referral data:', error);
      throw error;
    }
  };
  
}
