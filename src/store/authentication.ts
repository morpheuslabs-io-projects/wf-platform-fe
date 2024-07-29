import { ROUTE_PATH } from "@/constants/AppConfig";
import { CookiesHelper } from "@/helper/cookies";
import { IMembership, IUserToken } from "@/types";
import jwtDecode from "jwt-decode";
import { create } from "zustand";

export interface IAuthenticationStore {
  user: IUserToken | null;
  initAuthentication: () => void;
  removeUser: () => void;
  logout: () => void;
  currentMembership: IMembership | null;
  setCurrentMembership: (membership: IMembership) => void;
}

export const useAuthentication = create<IAuthenticationStore>((set, get) => ({
  user: null,
  currentMembership: null,
  initAuthentication: () => {
    const _token = CookiesHelper.get("accessToken");
    if (!_token) {
      return;
    }
    try {
      const _user = jwtDecode<IUserToken>(_token);
      set({ user: _user });
    } catch (error) {
      get().logout();
    }
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
}));
