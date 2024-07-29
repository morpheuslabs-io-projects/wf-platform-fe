import { IAddress } from "@/types/web3.type";
import { erc20Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";

export function useTokenBalance(token?: IAddress) {
  const walletconnectAccount = useAccount();
  const data = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: token,
        functionName: "balanceOf",
        args: [walletconnectAccount.address!],
      },
    ],
    query: { enabled: !!token && !!walletconnectAccount.address },
  });

  return {
    ...data,
    balance: data.data?.[0].result,
  };
}
