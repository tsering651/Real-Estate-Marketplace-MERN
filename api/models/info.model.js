import mongoose from "mongoose";

const informationSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      contact: {
        type: Number,
        required: true,
      },
      subject: {
        type: String,
      },
      message: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const Information = mongoose.model('Information', informationSchema);
  
  export default Information;