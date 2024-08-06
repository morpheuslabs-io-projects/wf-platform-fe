import { IWagmiConfig } from "@/types/web3.type";
import { writeContract } from "@wagmi/core";
import { erc20Abi } from "viem";

export default function useApproveToken(
  wagmiConfig: IWagmiConfig,
  tokenAddress?: `0x${string}`,
  contractAddress?: `0x${string}`
) {
  const approve = async (amount: bigint) => {
    if (!tokenAddress || !contractAddress) return;
    return await writeContract(wagmiConfig, {
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [contractAddress, amount],
    });
  };

  return { approve };
}
