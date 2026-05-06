export interface Flight {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
}

export interface Attraction {
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

export interface TripDay {
  _id?: string;
  dayNumber: number;
  date: string;
  attractions: Attraction[];
}

export interface Trip {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  flights: Flight[];
  itinerary: TripDay[];
  budget: number;
  remarks: string;
  images: string[];
}
