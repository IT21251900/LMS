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
  enrollment: {
    enrollment_id: String,
    learner_id: String,
    course_id: String,
    prograss_data: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
