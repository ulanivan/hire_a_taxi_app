import mongoose from 'mongoose';

export const Order = mongoose.model('Order', {
  name: String,
  phone: String,
  arrivalDate: String,
  airport: String,
  flightNumber: String
});