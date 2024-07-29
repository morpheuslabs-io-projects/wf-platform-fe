import { purcharseAbi } from "@/abis/purcharse";
import { wagmiConfig } from "@/services/web3Setup";
import { ISubscribeParams } from "@/types";
import { IAddress } from "@/types/web3.type";
import { writeContract } from "@wagmi/core";

export function useSubscribe() {
  const subscribe = async (address: IAddress, params: ISubscribeParams) => {
    const { token, paymentAmount, paymentReceiver, item, expiry, signature } =
      params;

    return await writeContract(wagmiConfig, {
      address,
      abi: purcharseAbi,
      functionName: "subscribe",
      args: [token, paymentAmount, paymentReceiver, item, expiry, signature],
    });
  };

  return { subscribe };
}
