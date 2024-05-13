import mongoose from "mongoose";

const { Schema } = mongoose;

const enrollmentSchema = new Schema({
  enrollment_id: String,
  learner_id: String,
  course_id: String,
  progress_data: String,
});

const paymentSchema = new Schema({
  paymentId: {
    type: String,
    required: [true, "Payment ID field is required."],
    unique: true, // Ensure uniqueness
  },
  amount: {
    type: Number,
    required: [true, "Amount field is required."],
  },
  enrollment: enrollmentSchema, // Use the enrollment schema as a subdocument
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
