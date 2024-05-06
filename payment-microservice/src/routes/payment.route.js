import express from "express";
import {
  generateClientToken,
  processPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

// Route to generate a client token for client-side integration
router.get("/client_token", generateClientToken);

// Route to process a payment transaction
router.post("/checkout", processPayment);

export default router;
