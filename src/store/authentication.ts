import { ROUTE_PATH } from "@/constants/AppConfig";
import { CookiesHelper } from "@/helper/cookies";
import { IMembership, IUserToken } from "@/types";
import { INetworkResponse, IWagmiConfig } from "@/types/web3.type";
import jwtDecode from "jwt-decode";
import { create } from "zustand";

export interface IAuthenticationStore {
  user: IUserToken | null | false;
  initAuthentication: () => void;
  removeUser: () => void;
  logout: () => void;
  currentMembership: IMembership | null;
  setCurrentMembership: (membership: IMembership) => void;
  networks: INetworkResponse | null;
  setConfig: (networks: INetworkResponse, wagmiConfig: IWagmiConfig) => void;
  wagmiConfig: IWagmiConfig | null;
}

export const useAuthentication = create<IAuthenticationStore>((set, get) => ({
  user: null,
  currentMembership: null,
  networks: null,
  wagmiConfig: null,
  initAuthentication: () => {
    const _token = CookiesHelper.get("accessToken");
    if (_token) {
      try {
        const _user = jwtDecode<IUserToken>(_token);
        if (_user.exp > Date.now() / 1000) return set({ user: _user });
      } catch (error) {
        get().logout();
      }
    }
    CookiesHelper.remove("accessToken");
    CookiesHelper.remove("refreshToken");
    set({ user: false });
  },

  setCurrentMembership: (currentMembership: IMembership) => {
    set({ currentMembership });
  },

  removeUser: () => {
    set({ user: null });
  },

  logout: (redirectUrl?: string) => {
    window.location.href = ROUTE_PATH.LOGOUT(redirectUrl);
  },
  setConfig: (networks, wagmiConfig) => set({ networks, wagmiConfig }),
}));
