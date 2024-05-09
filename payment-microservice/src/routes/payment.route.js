import express from "express";
import * as PaymentController from "../controllers/payment.controller.js";

const router = express.Router();

// Route to generate a client token for client-side integration
router.get("/client_token", PaymentController.generateClientToken);

// Route to process a payment transaction
router.post("/checkout", PaymentController.processPayment);

router.get("", PaymentController.getAllPayments);
router.get("/:id", PaymentController.getPaymentById);

export default router;
