import { IAddress } from "@/types/web3.type";
import { erc20Abi } from "viem";
import { useReadContracts } from "wagmi";

export function useTokenDecimals(token?: IAddress) {
  const data = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: token,
        functionName: "decimals",
      },
    ],
    query: { enabled: !!token },
  });

  return {
    ...data,
    decimals: data.data?.[0].result,
  };
}
