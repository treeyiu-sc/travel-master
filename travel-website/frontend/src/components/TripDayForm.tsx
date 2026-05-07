import { TripDay, Attraction } from '../types';
import { Plus, Trash2 } from 'lucide-react';
import AttractionForm from './AttractionForm';
import Button from './Button';

interface TripDayFormProps {
  day: TripDay;
  index: number;
  onAddAttraction: (index: number) => void;
  onRemoveDay: (index: number) => void;
  onRemoveAttraction: (dayIndex: number, attrIndex: number) => void;
  onUpdateAttraction: (dayIndex: number, attrIndex: number, field: keyof Attraction, value: string) => void;
  onUpdateDay: (dayIndex: number, field: string, value: string) => void;
}

export default function TripDayForm({ day, index, onAddAttraction, onRemoveDay, onRemoveAttraction, onUpdateAttraction, onUpdateDay }: TripDayFormProps) {
  return (
    <div className="border rounded-lg p-3 mb-3 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Day {day.dayNumber} - {day.date}</span>
        <Button variant="danger" size="sm" icon={Trash2} onClick={() => onRemoveDay(index)}>
          Remove Day
        </Button>
      </div>
      <input
        type="text"
        placeholder="Day Title (optional)"
        value={day.title || ''}
        onChange={(e) => onUpdateDay(index, 'title', e.target.value)}
        className="w-full px-3 py-1 mb-2 border rounded-lg text-sm"
      />
      {day.attractions.map((attr, attrIndex) => (
        <AttractionForm
          key={attrIndex}
          attraction={attr}
          index={attrIndex}
          totalAttractions={day.attractions.length}
          onUpdate={(i, field, value) => onUpdateAttraction(index, i, field, value)}
          onRemove={(i) => onRemoveAttraction(index, i)}
        />
      ))}
      <Button variant="secondary" size="sm" icon={Plus} outline onClick={() => onAddAttraction(index)} className="ml-4">
        Add Attraction
      </Button>
    </div>
  );
}
