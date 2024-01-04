import { VITE_ROOT_DOMAIN } from "@/constants/AppConfig";
import Cookies from "js-cookie";
export class CookiesHelper {
  static _getKey(name: string) {
    const env = process.env.VITE_NODE_ENV;
    if (env === "production") {
      return name;
    }
    return `${env}_${name}`;
  }

  static set(name: string, value: string) {
    const domain = VITE_ROOT_DOMAIN;
    Cookies.set(this._getKey(name), value, { domain });
  }
  static get(name: string) {
    return Cookies.get(this._getKey(name));
  }

  static remove(name: string) {
    const domain = VITE_ROOT_DOMAIN;
    Cookies.remove(this._getKey(name), { domain });
  }
}
