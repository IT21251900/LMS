// braintree.js

import braintree from "braintree";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const Gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // or Production for live transactions
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

export default Gateway;
