import mongoose, { Schema } from 'mongoose';
import { ITrip, IFlight, ITripDay } from '../types';

const attractionSchema: Schema = new Schema({
  startTime: { type: String, default: '' },
  endTime: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  transport: { type: String, default: '' },
  highlights: { type: String, default: '' },
  mustEat: { type: String, default: '' },
  mustBuy: { type: String, default: '' },
  mapLocation: { type: String, default: '' },
  tips: { type: String, default: '' },
  transportationCost: { type: Number },
  attractionCost: { type: Number },
}, { _id: true });

const tripDaySchema: Schema<ITripDay> = new Schema({
  dayNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  title: { type: String, default: '' },
  attractions: { type: [attractionSchema], default: [] },
}, { _id: true });

const flightSchema: Schema<IFlight> = new Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
}, { _id: true });

const shoppingItemSchema: Schema = new Schema({
  image: { type: String, default: '' },
  productName: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number },
  completed: { type: Boolean, default: false },
}, { _id: true });

const tripSchema: Schema<ITrip> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    flights: { type: [flightSchema], default: [] },
    itinerary: { type: [tripDaySchema], default: [] },
    shoppingList: { type: [shoppingItemSchema], default: [] },
    budget: { type: Number, default: 0 },
    remarks: { type: String, default: '' },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<ITrip>('Trip', tripSchema);
