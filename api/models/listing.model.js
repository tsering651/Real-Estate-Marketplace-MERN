import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    swimmingpool: {
      type: Boolean,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    kitchens: {
      type: Number,
      required: true,
    },
    halls: {
      type: Number,
      required: true,
    },
   
    balcony: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
    },
    swimmingpool: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    offer: {
      type: Boolean,
    },
    imageUrls: {
      type: Array,
    },
    userRef: {
      type: String,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;