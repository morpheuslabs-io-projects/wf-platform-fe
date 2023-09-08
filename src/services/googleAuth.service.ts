import { IUserToken } from '@/types';
import { getExternal } from './axiosSetup';
import { VITE_GOOGLE_API_BASE } from '@/constants/AppConfig';

export const signGoogleFn = async (
	accessToken: string
): Promise<IUserToken> => {
	const API_PATH = '/oauth2/v3/';
	const ENDPOINT = 'userinfo?access_token=';
	const response = await getExternal(VITE_GOOGLE_API_BASE + API_PATH + ENDPOINT + accessToken);
	return response.data as unknown as IUserToken;
};
