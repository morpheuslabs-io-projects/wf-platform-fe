import { erc20Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";

export function useTokenAllowance(
  token?: `0x${string}`,
  spender?: `0x${string}`
) {
  const walletconnectAccount = useAccount();
  const data = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: token,
        functionName: "allowance",
        args: [walletconnectAccount.address!, spender!],
      },
    ],
    query: { enabled: !!token && !!walletconnectAccount.address && !!spender },
  });

  return { ...data, allowance: data.data?.[0].result };
}
