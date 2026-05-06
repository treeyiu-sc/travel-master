import { Document } from 'mongoose';

export interface IFlight {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
}

export interface IAttraction {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  transport: string;
  highlights: string;
  mustEat: string;
  mustBuy: string;
  mapLocation: string;
  tips: string;
}

export interface ITripDay {
  dayNumber: number;
  date: Date;
  attractions: IAttraction[];
}

export interface ITrip extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  flights: IFlight[];
  itinerary: ITripDay[];
  budget: number;
  remarks: string;
  images: string[];
  createdAt: Date;
}
