import { Clock, Plane } from "lucide-react";
import { Flight } from "../types";

interface FlightCardProps {
  flight: Flight;
}

const timeFormat = (date: Date) =>
  date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <div className="bg-white p-3 rounded border mb-1 text-sm">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="flex items-center gap-1 font-medium">
          <Plane size={14} /> {flight.airline} {flight.flightNumber}
        </span>
        <span className="text-gray-400">|</span>
        <span>
          {flight.departureAirport} → {flight.arrivalAirport}
        </span>
      </div>
      {/* <span className="text-gray-400">|</span> */}
      <div>
        <span className="flex items-center gap-1 text-lg font-bold">
          <Clock size={12} />{" "}
          {"出發:" + timeFormat(new Date(flight.departureTime))} -{" "}
          {"抵達:" + timeFormat(new Date(flight.arrivalTime))}
        </span>
      </div>
    </div>
  );
}
