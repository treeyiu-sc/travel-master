import { Flight } from '../types';
import { Trash2 } from 'lucide-react';
import Button from './Button';

interface FlightFormProps {
  flight: Flight;
  index: number;
  totalFlights: number;
  onUpdate: (index: number, field: keyof Flight, value: string) => void;
  onRemove: (index: number) => void;
}

export default function FlightForm({ flight, index, totalFlights, onUpdate, onRemove }: FlightFormProps) {
  return (
    <div className="border rounded-lg p-3 mb-2">
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Airline"
          value={flight.airline}
          onChange={(e) => onUpdate(index, 'airline', e.target.value)}
          className="px-3 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Flight Number"
          value={flight.flightNumber}
          onChange={(e) => onUpdate(index, 'flightNumber', e.target.value)}
          className="px-3 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Departure Airport"
          value={flight.departureAirport}
          onChange={(e) => onUpdate(index, 'departureAirport', e.target.value)}
          className="px-3 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Arrival Airport"
          value={flight.arrivalAirport}
          onChange={(e) => onUpdate(index, 'arrivalAirport', e.target.value)}
          className="px-3 py-1 border rounded"
        />
        <input
          type="datetime-local"
          value={flight.departureTime}
          onChange={(e) => onUpdate(index, 'departureTime', e.target.value)}
          className="px-3 py-1 border rounded"
        />
        <input
          type="datetime-local"
          value={flight.arrivalTime}
          onChange={(e) => onUpdate(index, 'arrivalTime', e.target.value)}
          className="px-3 py-1 border rounded"
        />
      </div>
      {totalFlights > 1 && (
        <Button variant="danger" size="sm" icon={Trash2} onClick={() => onRemove(index)} className="mt-1">
          Remove
        </Button>
      )}
    </div>
  );
}
