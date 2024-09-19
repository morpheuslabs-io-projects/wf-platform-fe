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
    console.log(`cookies helper set ${name}`);
    const res = Cookies.set(this._getKey(name), value, { 
      domain: domain,
      secure: true,
      sameSite: "strict",
     });
     console.log(`cookies helper set ${name} - res ${res}`);
  }

  static get(name: string) {
    console.log(`cookies helper get ${name}`);
    const res = Cookies.get(this._getKey(name));
    console.log(`cookies helper get ${name} - res ${res}` );
    
    return res;
  }

  static remove(name: string) {
    const domain = VITE_ROOT_DOMAIN;
    Cookies.remove(this._getKey(name), { domain });
    Cookies.remove(`test_${name}`, { domain });
    Cookies.remove(`development_${name}`, { domain });
  }

  static clearAll() {
    const domain = VITE_ROOT_DOMAIN;
    Object.keys(Cookies.get()).forEach((key) =>
      Cookies.remove(key, { domain })
    );
  }
}
