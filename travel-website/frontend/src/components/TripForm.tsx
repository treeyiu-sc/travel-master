import { useState } from 'react';
import { Flight, TripDay, Trip, Attraction } from '../types';
import { Plus, X, Upload } from 'lucide-react';
import FlightForm from './FlightForm';
import TripDayForm from './TripDayForm';
import Button from './Button';

const emptyFlight: Flight = {
  airline: '',
  flightNumber: '',
  departureAirport: '',
  arrivalAirport: '',
  departureTime: '',
  arrivalTime: '',
};

interface TripFormProps {
  trip?: Trip | null;
  onSubmit: (data: Partial<Trip>) => void;
  onCancel: () => void;
}

export default function TripForm({ trip, onSubmit, onCancel }: TripFormProps) {
  const [formData, setFormData] = useState({
    title: trip?.title || '',
    description: trip?.description || '',
    startDate: trip?.startDate.split('T')[0] || '',
    endDate: trip?.endDate.split('T')[0] || '',
    budget: trip?.budget || 0,
    remarks: trip?.remarks || '',
  });

  const [flights, setFlights] = useState<Flight[]>(
    trip?.flights.length ? trip.flights : [emptyFlight]
  );

  const [itinerary, setItinerary] = useState<TripDay[]>(
    trip?.itinerary.map((day) => ({
      ...day,
      date: day.date.split('T')[0],
      attractions: day.attractions.length ? day.attractions : [{ startTime: '', endTime: '', title: '', description: '', transport: '', highlights: '', mustEat: '', mustBuy: '', mapLocation: '', tips: '' }],
    })) || []
  );

  const [imageUrls, setImageUrls] = useState<string[]>(trip?.images || []);
  const [newImageUrl, setNewImageUrl] = useState('');

  const addFlight = () => setFlights([...flights, emptyFlight]);

  const removeFlight = (index: number) => {
    if (flights.length > 1) {
      setFlights(flights.filter((_, i) => i !== index));
    }
  };

  const updateFlight = (index: number, field: keyof Flight, value: string) => {
    const updated = [...flights];
    updated[index] = { ...updated[index], [field]: value };
    setFlights(updated);
  };

  const addDay = () => {
    const dayNum = itinerary.length + 1;
    const newDate = formData.startDate || new Date().toISOString().split('T')[0];
    const date = new Date(newDate);
    date.setDate(date.getDate() + dayNum - 1);
    setItinerary([
      ...itinerary,
      {
        dayNumber: dayNum,
        date: date.toISOString().split('T')[0],
        attractions: [{ startTime: '', endTime: '', title: '', description: '', transport: '', highlights: '', mustEat: '', mustBuy: '', mapLocation: '', tips: '' }],
      },
    ]);
  };

  const removeDay = (index: number) => {
    const updated = itinerary
      .filter((_, i) => i !== index)
      .map((day, i) => ({ ...day, dayNumber: i + 1 }));
    setItinerary(updated);
  };

  const addAttraction = (dayIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].attractions = [...updated[dayIndex].attractions, { startTime: '', endTime: '', title: '', description: '', transport: '', highlights: '', mustEat: '', mustBuy: '', mapLocation: '', tips: '' }];
    setItinerary(updated);
  };

  const removeAttraction = (dayIndex: number, attrIndex: number) => {
    if (itinerary[dayIndex].attractions.length > 1) {
      const updated = [...itinerary];
      updated[dayIndex].attractions = updated[dayIndex].attractions.filter((_, i) => i !== attrIndex);
      setItinerary(updated);
    }
  };

  const updateAttraction = (dayIndex: number, attrIndex: number, field: keyof Attraction, value: string) => {
    const updated = [...itinerary];
    updated[dayIndex].attractions[attrIndex] = {
      ...updated[dayIndex].attractions[attrIndex],
      [field]: value,
    };
    setItinerary(updated);
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImageUrls((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      flights: flights.filter((f) => f.airline || f.flightNumber),
      itinerary: itinerary.map((day) => ({
        ...day,
        attractions: day.attractions.filter((a) => a.title),
      })),
      images: imageUrls,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Trip Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
            className="px-4 py-2 border rounded-lg"
            min="0"
          />
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          rows={2}
        />

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Images</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} alt={`Image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg border" />
                <Button
                  variant="danger"
                  size="sm"
                  icon={X}
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition p-0"
                >
                  &nbsp;
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <Button variant="secondary" outline onClick={addImageUrl}>
              Add URL
            </Button>
            <label className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer inline-flex items-center gap-1">
              <Upload size={14} /> Upload
              <input type="file" accept="image/*" onChange={handleFileUpload} multiple className="hidden" />
            </label>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Flights</h3>
            <Button variant="secondary" size="sm" icon={Plus} outline onClick={addFlight}>
              Add Flight
            </Button>
          </div>
          {flights.map((flight, index) => (
            <FlightForm
              key={index}
              flight={flight}
              index={index}
              totalFlights={flights.length}
              onUpdate={updateFlight}
              onRemove={removeFlight}
            />
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Itinerary (by day)</h3>
            <Button variant="secondary" size="sm" icon={Plus} outline onClick={addDay}>
              Add Day
            </Button>
          </div>
          {itinerary.map((day, index) => (
            <TripDayForm
              key={index}
              day={day}
              index={index}
              onAddAttraction={addAttraction}
              onRemoveDay={removeDay}
              onRemoveAttraction={removeAttraction}
              onUpdateAttraction={updateAttraction}
            />
          ))}
        </div>

        <textarea
          placeholder="Remarks"
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          rows={2}
        />

        <div className="flex gap-2">
          <Button type="submit" variant="primary" size="lg">
            {trip ? 'Update' : 'Create'}
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={onCancel}>
            Cancel
          </Button>
      </div>
    </form>
  );
}
