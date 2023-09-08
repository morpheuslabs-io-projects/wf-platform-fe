import { useState } from 'react';
import { signGoogleFn } from '@/services/googleAuth.service';
import Cookies from 'js-cookie';

const useGoogleToken = (): {
	tokenId?: string;
	getGGTokenId: (accessToken: string) => void;
} => {
	const [tokenId, setTokenId] = useState<string>();

	const getGGTokenId = async (accessToken: string) => {
		if (accessToken) {
			const data = await signGoogleFn(accessToken);
			// console.log(data)
			if (data) {
                Cookies.remove('accessToken');
                Cookies.set('userInfo', JSON.stringify(data));
				setTokenId(JSON.stringify(data));
			} else {
                Cookies.remove('userInfo');
				setTokenId(undefined);
			}
		}
	};

	return {
		tokenId,
		getGGTokenId,
	};
};

export default useGoogleToken;
