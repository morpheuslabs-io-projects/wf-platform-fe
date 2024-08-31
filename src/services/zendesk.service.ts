import { VITE_AUTH_API_ENDPOINT } from "@/constants/AppConfig";
import { AxiosCommon } from "@/helper/axios";

const authClient = new AxiosCommon(VITE_AUTH_API_ENDPOINT);

export class ZendeskService {
  public static getToken = async () => {
    const response = await authClient.getRequest("auth/zendesk-token");
    return response.data;
  };
}
