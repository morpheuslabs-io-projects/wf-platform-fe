import { purcharseAbi } from "@/abis/purcharse";
import { ISubscribeParams } from "@/types";
import { IAddress, IWagmiConfig } from "@/types/web3.type";
import { writeContract } from "@wagmi/core";

export function useSubscribe(wagmiConfig: IWagmiConfig) {
  const subscribe = async (address: IAddress, params: ISubscribeParams) => {
    const { token, paymentAmount, paymentReceiver, item, expiry, signature } =
      params;

    console.log([
      token,
      BigInt(paymentAmount),
      paymentReceiver,
      BigInt(item),
      BigInt(expiry),
      signature,
    ]);

    return await writeContract(wagmiConfig, {
      address,
      abi: purcharseAbi,
      functionName: "subscribe",
      args: [
        token,
        BigInt(paymentAmount),
        paymentReceiver,
        BigInt(item),
        BigInt(expiry),
        signature,
      ],
    });
  };

  return { subscribe };
}
