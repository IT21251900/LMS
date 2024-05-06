import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  payment_id: {
    type: String,
    required: [true, "Payment ID field is required."],
    unique: [true, "Amount already exists."],
  },
  amount: {
    type: Number,
    required: [true, "Amount field is required."],
  },
  enrollment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
