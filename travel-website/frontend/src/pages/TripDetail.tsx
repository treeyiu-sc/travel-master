import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  MessageSquare,
  Plane,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import FlightCard from "../components/FlightCard";
import PageContainer from "../components/PageContainer";
import TripDayCard from "../components/TripDayCard";
import { tripApi } from "../services/api";
import { Trip, ShoppingItem } from "../types";

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTrip(id);
    }
  }, [id]);

  const fetchTrip = async (tripId: string) => {
    try {
      const { data } = await tripApi.getOne(tripId);
      setTrip(data);
    } catch {
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (!trip) {
    return (
      <div className="text-center py-20 text-gray-500">Trip not found</div>
    );
  }

  // const totalDays = trip.itinerary.length;
  // const totalAttractions = trip.itinerary.reduce(
  //   (sum, day) => sum + day.attractions.length,
  //   0,
  // );

  return (
    <PageContainer>
      <div className="mb-6">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          outline
          onClick={() => navigate("/")}
        >
          返回首頁
        </Button>
      </div>

      {/* {trip.images.length > 0 && (
        <div className="mb-6">
          <div className="overflow-hidden rounded-lg border">
            <img
              src={trip.images[0]}
              alt="Trip image"
              className="w-full h-64 object-cover hover:scale-110 transition"
            />
          </div>
        </div>
      )} */}

      <div className="pb-10 text-center mx-auto">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[3rem] shadow-xl border-4 border-white inline-block w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cute-pink mb-4 leading-tight">
            {trip.title}
          </h1>
          <div className="flex items-center justify-center">
            <div className="block">
              <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <CalendarDays size={14} /> {trip.startDate.split("T")[0]} →{" "}
                  {trip.endDate.split("T")[0]}
                </span>
                {/* <span className="flex items-center gap-1">
                  <DollarSign size={14} /> ${trip.budget}
                </span> */}
                {/* <span>
                  {totalDays} days, {totalAttractions} attractions
                </span> */}
              </div>
              {trip.description && (
                <p className="text-gray-700 flex items-start justify-center gap-2 text-lg font-medium">
                  <MapPin size={16} className="mt-1 shrink-0" />{" "}
                  {trip.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {trip.flights.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[3rem] shadow-xl border-4 border-white inline-block w-full mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plane size={18} /> 航班資訊
          </h2>
          {trip.flights.map((flight, i) => (
            <FlightCard key={i} flight={flight} />
          ))}
        </div>
      )}

      {trip.itinerary.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarDays size={18} /> 行程
          </h2>
          {trip.itinerary.map((day) => (
            <TripDayCard key={day._id || day.dayNumber} day={day} />
          ))}
        </div>
      )}

      {trip.shoppingList && trip.shoppingList.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShoppingBag size={18} /> 購物清單
          </h2>
          <div className="space-y-3">
            {trip.shoppingList.map((item, index) => (
              <div key={item._id || index} className={`flex items-center gap-3 p-3 border rounded-lg ${item.completed ? 'bg-gray-50 opacity-75' : 'bg-white'}`}>
                <button
                  onClick={async () => {
                    const updatedList = [...trip.shoppingList];
                    updatedList[index] = { ...updatedList[index], completed: !updatedList[index].completed };
                    try {
                      await tripApi.update(trip._id, { shoppingList: updatedList });
                      setTrip({ ...trip, shoppingList: updatedList });
                    } catch (error) {
                      console.error('Failed to update shopping item:', error);
                    }
                  }}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition ${
                    item.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {item.completed && <Check size={14} />}
                </button>
                {item.image && (
                  <img src={item.image} alt={item.productName} className="w-12 h-12 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h3 className={`font-semibold ${item.completed ? 'line-through text-gray-500' : ''}`}>
                    {item.productName}
                  </h3>
                  {item.description && (
                    <p className={`text-gray-600 text-sm ${item.completed ? 'line-through text-gray-400' : ''}`}>
                      {item.description}
                    </p>
                  )}
                </div>
                {item.price !== undefined && (
                  <p className={`font-medium shrink-0 ${item.completed ? 'line-through text-gray-400' : 'text-green-600'}`}>
                    ${item.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {trip.remarks && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <MessageSquare size={18} /> Remarks
          </h2>
          <p className="text-gray-700">{trip.remarks}</p>
        </div>
      )}
    </PageContainer>
  );
}
