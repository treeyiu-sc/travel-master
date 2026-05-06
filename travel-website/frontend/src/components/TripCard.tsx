import { Edit2, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Trip } from "../types";
import Button from "./Button";

interface TripCardProps {
  trip: Trip;
  onEdit: (trip: Trip) => void;
  onDelete: (id: string) => void;
}

export default function TripCard({ trip, onEdit, onDelete }: TripCardProps) {
  const navigate = useNavigate();
  const totalDays = trip.itinerary.length;
  const totalAttractions = trip.itinerary.reduce(
    (sum, day) => sum + day.attractions.length,
    0,
  );
  const thumbnail = trip.images.length > 0 ? trip.images[0] : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {thumbnail && (
        <div className="w-full" onClick={() => navigate(`/trips/${trip._id}`)}>
          <img
            src={thumbnail}
            alt={trip.title}
            className="w-full object-cover cursor-pointer"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{trip.title}</h3>
        <p className="text-gray-500 text-sm mb-3">
          {trip.startDate.split("T")[0]} → {trip.endDate.split("T")[0]} | $
          {trip.budget} | {totalDays} days, {totalAttractions} attractions
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            outline
            onClick={() => navigate(`/trips/${trip._id}`)}
          >
            View
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Edit2}
            outline
            onClick={() => onEdit(trip)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            outline
            onClick={() => onDelete(trip._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
