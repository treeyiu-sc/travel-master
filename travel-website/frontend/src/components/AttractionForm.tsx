import { Attraction } from '../types';
import { Trash2 } from 'lucide-react';
import Button from './Button';

interface AttractionFormProps {
  attraction: Attraction;
  index: number;
  totalAttractions: number;
  onUpdate: (index: number, field: keyof Attraction, value: string) => void;
  onRemove: (index: number) => void;
}

export default function AttractionForm({ attraction, index, totalAttractions, onUpdate, onRemove }: AttractionFormProps) {
  return (
    <div className="ml-4 mb-4 border-l-2 border-blue-300 pl-4 bg-white rounded-r-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-blue-600">
          {attraction.startTime} - {attraction.endTime}
        </span>
        {totalAttractions > 1 && (
          <Button variant="danger" size="sm" icon={Trash2} onClick={() => onRemove(index)}>
            Remove
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Start Time (e.g. 09:00)"
            value={attraction.startTime}
            onChange={(e) => onUpdate(index, 'startTime', e.target.value)}
            className="w-32 px-3 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="End Time (e.g. 11:00)"
            value={attraction.endTime}
            onChange={(e) => onUpdate(index, 'endTime', e.target.value)}
            className="w-32 px-3 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="Title"
            value={attraction.title}
            onChange={(e) => onUpdate(index, 'title', e.target.value)}
            className="flex-1 px-3 py-1 border rounded"
          />
        </div>
        <textarea
          placeholder="Description"
          value={attraction.description}
          onChange={(e) => onUpdate(index, 'description', e.target.value)}
          className="w-full px-3 py-1 border rounded"
          rows={2}
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Transport"
            value={attraction.transport}
            onChange={(e) => onUpdate(index, 'transport', e.target.value)}
            className="px-3 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="Highlights"
            value={attraction.highlights}
            onChange={(e) => onUpdate(index, 'highlights', e.target.value)}
            className="px-3 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="Must Eat"
            value={attraction.mustEat}
            onChange={(e) => onUpdate(index, 'mustEat', e.target.value)}
            className="px-3 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="Must Buy"
            value={attraction.mustBuy}
            onChange={(e) => onUpdate(index, 'mustBuy', e.target.value)}
            className="px-3 py-1 border rounded"
          />
        </div>
        <input
          type="url"
          placeholder="Map Location URL (Google Maps link)"
          value={attraction.mapLocation}
          onChange={(e) => onUpdate(index, 'mapLocation', e.target.value)}
          className="w-full px-3 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Tips / Remarks"
          value={attraction.tips}
          onChange={(e) => onUpdate(index, 'tips', e.target.value)}
          className="w-full px-3 py-1 border rounded"
        />
      </div>
    </div>
  );
}
