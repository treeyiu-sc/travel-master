import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import PageContainer from "../components/PageContainer";
import TripCard from "../components/TripCard";
import TripForm from "../components/TripForm";
import { tripApi } from "../services/api";
import { Trip } from "../types";

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const { data } = await tripApi.getAll();
    setTrips(data);
  };

  const resetForm = () => {
    setEditingTrip(null);
    setShowForm(false);
  };

  const handleEdit = (trip: Trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("確定要刪除此行程嗎？")) {
      await tripApi.delete(id);
      fetchTrips();
    }
  };

  const handleSubmit = async (data: Partial<Trip>) => {
    if (editingTrip) {
      await tripApi.update(editingTrip._id, data);
    } else {
      await tripApi.create(data);
    }
    resetForm();
    fetchTrips();
  };

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <Button
          variant="primary"
          size="lg"
          icon={Plus}
          onClick={() => {
            setEditingTrip(null);
            setShowForm(true);
          }}
        >
          New Trip
        </Button>
      </div>

      <Modal
        isOpen={showForm}
        onClose={resetForm}
        title={editingTrip ? 'Edit Trip' : 'New Trip'}
        size="xl"
      >
        <TripForm
          trip={editingTrip}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      </Modal>

      {trips.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No trips yet. Create your first trip!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
