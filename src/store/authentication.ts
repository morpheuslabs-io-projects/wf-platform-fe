import { CookiesHelper } from '@/helper/cookies';
import { IUserToken } from '@/types';
import jwtDecode from 'jwt-decode';
import { create } from 'zustand';

export interface IAuthenticationStore {
	user: IUserToken | null;
	initAuthentication: () => void;
	removeUser: () => void;
}

export const useAuthentication = create<IAuthenticationStore>((set) => ({
	user: null,
	initAuthentication: () => {
		const _token = CookiesHelper.get('accessToken');
		console.log({ _token });
		if (_token) {
			const _user = jwtDecode<IUserToken>(_token);
			set({ user: _user });
		}
	},
	removeUser: () => {
		set({ user: null });
	},
}));
