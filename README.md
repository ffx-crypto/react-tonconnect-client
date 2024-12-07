# React-tonconnect-client 
This is a client-side application for FFX Crypto project. The main function of this app is to implement simple ICO - users send **ton** and recieve corresponding **jetton** amount. The project is based on the [allen-hsu/demo-waitin-tx](https://github.com/allen-hsu/demo-waiting-tx) app.

## Description 
After connecting ton wallet with the help of [@tonconnect/ui-react sdk](https://github.com/ton-connect/sdk/tree/main/packages/ui-react) user can send a *comment* and proper amount of **ton**. The comment will be recieved by the [back-end server](https://github.com/ffx-crypto/express-ton-server), that will send mint message to the **jetton admin** so that user corresponding amount of **ffx jettons**. 

## Project structure 
- `src` - source code
    - `components` - functional React elements
    - `hooks` - functions to connect to user's wallet and send transaction to the blockchain
    - `pages` - Home, Sale and Contact pages
- `dist` - compiled code 

## Example .env file
```
VITE_MANIFEST_URL=https://ffxcrypto.vercel.app/tonconnect-manifest.json
https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json
VITE_MINTER_ADMIN_ADDRESS=EQC_wf-PEh2nC6Ltn-hCkV-KXDKqJZcqbkZIxco-eU1fdmGv
VITE_JETTON_PRICE=0.005
VITE_API_BASE_URL=http://localhost:3000/api
VITE_FORWARD_FEE=0.08
```

## Usage
```sh
# command to install dependencies 
npm install 
# command to run application 
npm start 
# build app for production 
npm run build 
```
## Contributing 
I will be happy for your interest in the project. Contributions are required and welcomed.

## ToDo List: 
- *health check* - application should request the server before activating **JSalesInput** component 
- *support for NFT* - currently there is only jetton on the **Sale** page, but in the future NFTs will appear as well
- support for *TMA* ([telegram mini app](https://docs.ton.org/v3/guidelines/dapps/tma/overview)) - application will have a version for **telegram** or wallets like **tonkeeper** 
- *testing* and *improvements* - there are no unit or end2end tests for the application, also i will be happy to proposed improvemens or corrections
- *theming* - currently application has only light theme, it should also have a *dark* one with possibility to switch between them
- *localization (L10n)* - the project needs texts and translations

## LICENSE 
[LICENSE](./LICENSE)