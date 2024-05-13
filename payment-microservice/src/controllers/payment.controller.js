import Gateway from "../utils/braintree.js";
import Payment from "../schemas/payment.schema.js";

// Function to generate a client token for the client-side integration
export async function generateClientToken(req, res) {
  console.log(`<=== Generate Client Token ====>`);
  try {
    const response = await Gateway.clientToken.generate({});
    res.status(200).send(response.clientToken);
  } catch (error) {
    console.error("Error generating client token:", error);
    res.status(500).send("Error generating client token");
  }
}

// Function to process a payment transaction
export async function processPayment(req, res) {
  console.log(`<=== Process Payment ====>`);
  try {
    const { nonce, amount, enrollment } = req.body;

    // Use the nonce received from the client to create a transaction
    const result = await Gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    });

    // If the transaction is successful, save payment details to the database
    if (result.success) {
      const payment = new Payment({
        paymentId: result.transaction.id,
        amount: result.transaction.amount,
        enrollment: enrollment, // Assuming enrollmentId is passed in the request body
      });
      await payment.save();

      // Respond with success message
      res.status(200).send({ message: "Payment successful", success: true });
    } else {
      // If the transaction fails, respond with an error message
      console.error("Payment failed:", result.message);
      res.status(400).send({ message: "Payment failed", success: false });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res
      .status(500)
      .send({ message: "Error processing payment", success: false });
  }
}

export async function getAllPayments(req, res, next) {
  console.log(`<=== Get All Payments ====>`);

  const role = req.params.role;

  if (role === "admin") {
    const payments = await Payment.find().exec();

    if (payments && payments.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Found Payments",
        result: payments,
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Payments are not available",
      });
    }
  }

  // If the role is not "admin", return an unauthorized response
  return res.status(404).send({
    success: false,
    message: "Unauthorized User",
  });
}

// Get By Id
export async function getPaymentById(req, res, next) {
  console.log(`<=== Get Payment By Payment ID ===`);
  const paymentId = req.params.id;
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    res
      .status(404)
      .send({ success: false, message: "Payment not found", result: payment });
  }
  res
    .status(200)
    .send({ success: true, message: "Found Payment", result: payment });
}
