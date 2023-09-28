import { create } from 'zustand';
import keycloak from '@/services/keycloak.service';
import Keycloak from 'keycloak-js';

export interface IKeycloakStore {
	keycloakInstance: Keycloak | null;
	initKeycloak: () => void;
	login: () => void;
	logout: (redirectUri: string) => void;
	token: string | null;
}

export const useKeycloakStore = create<IKeycloakStore>((set, get) => ({
	keycloakInstance: null,
	token: null,

	initKeycloak: async () => {
		if (!keycloak.authenticated) {
			await keycloak.init({ checkLoginIframe: false });
			set({ keycloakInstance: keycloak });
		}

		if (keycloak.authenticated) {
			set({ token: keycloak.token });
		}
	},

	login: async () => {
		const { keycloakInstance } = get();
		if (keycloakInstance) {
			await keycloakInstance.login();
		}
	},

	logout: async (redirectUri: string) => {
		const { keycloakInstance } = get();
		if (keycloakInstance) {
			await keycloakInstance.logout({
				redirectUri,
			});
		}
	},
}));
