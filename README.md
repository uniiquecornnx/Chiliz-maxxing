# Live Streaming App with x402 Payments

CHILIZ-MAXXING

## Features

- Live streaming with ZegoCloud
- Wallet connection using Thirdweb
- x402 payment integration for paid API endpoints

## Setup

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_THIRDWEB_CLIENT_ID=your-thirdweb-client-id
VITE_ZEGOCLOUD_APP_ID=your-zegocloud-app-id
VITE_ZEGOCLOUD_SERVER_SECRET=your-zegocloud-server-secret
```

### Getting a Thirdweb Client ID

**Important:** You need a **Client ID** for the frontend, not a Secret Key. The Secret Key is for server-side operations only.

1. Go to [Thirdweb Dashboard](https://thirdweb.com/dashboard)
2. Create a new project or select an existing one
3. Navigate to **Settings** → **API Keys**
4. Copy your **Client ID** (starts with a long alphanumeric string, different from Secret Key)
5. Add it to your `.env` file as `VITE_THIRDWEB_CLIENT_ID`

**Note:** The Secret Key (like `TicT1H8m943Hq5Wr_JgpYjswIM9PYz5Y0Qff8qZSD0OC9HtyG92R0Yx4xLtOR_VxPaZ-er8aQIOu0C5gC_IJcg`) is for backend/server-side operations and should **never** be exposed in frontend code. Use the Client ID instead.

## x402 Payments Integration

This app includes x402 payment integration, allowing you to make API calls that require on-chain payments.

### Usage Example

```javascript
import { useActiveWallet } from "@thirdweb-dev/react";
import { makePaidRequest } from "./utils/x402";

function MyComponent() {
  const wallet = useActiveWallet();

  const handlePaidRequest = async () => {
    try {
      const response = await makePaidRequest(
        "https://api.example.com/paid-endpoint",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        wallet
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <button onClick={handlePaidRequest} disabled={!wallet}>
      Make Paid Request
    </button>
  );
}
```

### Available Utilities

- `makePaidRequest(url, options, wallet)` - Make a paid API request
- `createX402Client(clientId)` - Create a Thirdweb client for x402
- `createPaymentFetch(client, wallet)` - Create a payment-enabled fetch function

See `src/components/X402Example.jsx` for a complete example.

## Development

```bash
npm install
npm run dev
```

## Learn More

- [Thirdweb x402 Documentation](https://portal.thirdweb.com/payments/x402)
- [Thirdweb React SDK](https://portal.thirdweb.com/react)