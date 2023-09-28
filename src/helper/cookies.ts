import { VITE_ROOT_DOMAIN } from '@/constants/AppConfig';
import Cookies from 'js-cookie';
export class CookiesHelper {
	static set(name: string, value: string) {
		const domain = VITE_ROOT_DOMAIN;
		Cookies.set(name, value, { domain });
	}
	static get(name: string) {
		return Cookies.get(name);
	}

	static remove(name: string) {
		const domain = VITE_ROOT_DOMAIN;
		Cookies.remove(name, { domain });
	}
}
