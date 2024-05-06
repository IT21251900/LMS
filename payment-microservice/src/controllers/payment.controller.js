import Gateway from "../utils/braintree.js"; // Import the Braintree Gateway instance
import Payment from "../schemas/payment.schema.js"; // Import the Mongoose model for payments

// Function to generate a client token for the client-side integration
export const generateClientToken = async (req, res) => {
  try {
    const response = await Gateway.clientToken.generate({});
    res.status(200).send(response.clientToken);
  } catch (error) {
    console.error("Error generating client token:", error);
    res.status(500).send("Error generating client token");
  }
};

// Function to process a payment transaction
export const processPayment = async (req, res) => {
  try {
    const { nonce, amount, enrollmentId } = req.body;

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
        payment_id: result.transaction.id,
        amount: result.transaction.amount,
        enrollment_id: enrollmentId, // Assuming enrollmentId is passed in the request body
      });
      await payment.save();

      // Respond with success message
      res.status(200).send("Payment successful");
    } else {
      // If the transaction fails, respond with an error message
      console.error("Payment failed:", result.message);
      res.status(400).send("Payment failed");
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).send("Error processing payment");
  }
};
