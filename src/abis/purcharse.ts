export const purcharseAbi = [
  {
    inputs: [{ internalType: "address", name: "authorizer_", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "InvalidShortString", type: "error" },
  {
    inputs: [{ internalType: "string", name: "str", type: "string" }],
    name: "StringTooLong",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "receiptNo",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentAmt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "productSku",
        type: "uint256",
      },
      { indexed: false, internalType: "address", name: "dev", type: "address" },
      {
        indexed: false,
        internalType: "address",
        name: "appstore",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "devShare",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "storeShare",
        type: "uint256",
      },
    ],
    name: "Buy",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "receiptNo",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "package",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentAmt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentReceiver",
        type: "address",
      },
    ],
    name: "Subscribed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "receiptNo",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentAmt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentReceiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "energyPts",
        type: "uint256",
      },
    ],
    name: "Topup",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "caller", type: "address" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "paymentAmt", type: "uint256" },
      { internalType: "address", name: "paymentReceiver", type: "address" },
      { internalType: "uint256", name: "request", type: "uint256" },
      { internalType: "uint256", name: "item", type: "uint256" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "_signer",
    outputs: [{ internalType: "address", name: "signer", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "caller", type: "address" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "paymentAmt", type: "uint256" },
      { internalType: "uint256", name: "productSku", type: "uint256" },
      { internalType: "address", name: "dev", type: "address" },
      { internalType: "address", name: "store", type: "address" },
      { internalType: "uint256", name: "devShare", type: "uint256" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "_signerForBuy",
    outputs: [{ internalType: "address", name: "signer", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "authorizer",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "paymentAmt", type: "uint256" },
      { internalType: "uint256", name: "productSku", type: "uint256" },
      { internalType: "address", name: "dev", type: "address" },
      { internalType: "address", name: "store", type: "address" },
      { internalType: "uint256", name: "devShare", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "receiver_", type: "address" }],
    name: "isReceiverInWhiteList",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "nonce",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "receiver_", type: "address" }],
    name: "removeReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "authorizer_", type: "address" }],
    name: "setAuthorizer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "receiver_", type: "address" }],
    name: "setReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "paymentAmt", type: "uint256" },
      { internalType: "address", name: "paymentReceiver", type: "address" },
      { internalType: "uint256", name: "package", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "paymentAmt", type: "uint256" },
      { internalType: "address", name: "paymentReceiver", type: "address" },
      { internalType: "uint256", name: "energyPts", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "topup",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;