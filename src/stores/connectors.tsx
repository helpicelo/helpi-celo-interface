import { InjectedConnector } from "@ubeswap/injected-connector";
import { Web3Provider } from '@ethersproject/providers'
import { ChainId, parseNetwork } from '@ubeswap/sdk'
import { NetworkConnector } from './NetworkConnector'
// import { NetworkConnector } from "@web3-react/network-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// import { LedgerConnector } from "@web3-react/ledger-connector";
// import { TrezorConnector } from "@web3-react/trezor-connector";
// import { FrameConnector } from "@web3-react/frame-connector";
// import { FortmaticConnector } from "@web3-react/fortmatic-connector";
// import { PortisConnector } from "@web3-react/portis-connector";
// import { SquarelinkConnector } from "@web3-react/squarelink-connector";
// import { TorusConnector } from "@web3-react/torus-connector";
// import { AuthereumConnector } from "@web3-react/authereum-connector";

const networkChainIDFromHostname: ChainId = window.location.hostname.includes('alfajores')
  ? ChainId.ALFAJORES
  : window.location.hostname.includes('baklava')
  ? ChainId.BAKLAVA
  : ChainId.MAINNET

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://eth-mainnet.alchemyapi.io/v2/k2--UT_xVVXMOvAyoxJYqtKhlmyBbqnX",
  4: "https://rinkeby.infura.io/v3/bd80ce1ca1f94da48e151bb6868bb150"
};

// export const NETWORK_CHAIN_ID = new InjectedConnector({
//   supportedChainIds: [1, 3, 4, 5, 42]
// });

export const NETWORK_CHAIN_ID: ChainId = process.env.REACT_APP_CHAIN_ID
  ? parseNetwork(parseInt(process.env.REACT_APP_CHAIN_ID))
  : networkChainIDFromHostname

export const network = new NetworkConnector({
  defaultChainId: NETWORK_CHAIN_ID,
})

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.ALFAJORES, ChainId.BAKLAVA, ChainId.MAINNET],
})

// export const walletconnect = new WalletConnectConnector({
//   rpc: { 1: RPC_URLS[1] },
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
//   pollingInterval: POLLING_INTERVAL
// });

// export const walletlink = new WalletLinkConnector({
//   url: RPC_URLS[1],
//   appName: "ygov.finance"
// });

// export const ledger = new LedgerConnector({
//   chainId: 1,
//   url: RPC_URLS[1],
//   pollingInterval: POLLING_INTERVAL
// });

// export const trezor = new TrezorConnector({
//   chainId: 1,
//   url: RPC_URLS[1],
//   pollingInterval: POLLING_INTERVAL,
//   manifestEmail: "dummy@abc.xyz",
//   manifestAppUrl: "https://8rg3h.csb.app/"
// });

// export const frame = new FrameConnector({ supportedChainIds: [1] });

// export const fortmatic = new FortmaticConnector({
//   apiKey: "pk_live_F95FEECB1BE324B5",
//   chainId: 1
// });

// export const portis = new PortisConnector({
//   dAppId: "790d2f80-46b8-4475-baa8-d53a7efad388",
//   networks: [1, 100]
// });

// export const squarelink = new SquarelinkConnector({
//   clientId: "5f2a2233db82b06b24f9",
//   networks: [1, 100]
// });

// export const torus = new TorusConnector({ chainId: 1 });

// export const authereum = new AuthereumConnector({ chainId: 1 });