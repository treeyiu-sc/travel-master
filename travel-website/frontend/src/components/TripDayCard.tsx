import { TripDay } from '../types';
import { Clock, MapPin, UtensilsCrossed, ShoppingBag, Train, Star, MessageSquare, ExternalLink, DollarSign } from 'lucide-react';

interface TripDayCardProps {
  day: TripDay;
}

export default function TripDayCard({ day }: TripDayCardProps) {
  return (
    <div className="bg-white p-3 rounded border mb-2">
      <h5 className="font-medium mb-2">
        Day {day.dayNumber} - {day.date.split('T')[0]}
        {day.title && <span className="ml-2 text-gray-600">- {day.title}</span>}
      </h5>
      {day.attractions.map((attr, ai) => (
        <div key={ai} className="ml-4 mb-3 border-l-2 border-blue-300 pl-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-blue-600 shrink-0" />
            <span className="text-sm text-blue-600 font-medium">{attr.startTime} - {attr.endTime}</span>
            <span className="font-semibold">{attr.title}</span>
          </div>
          {attr.description && <p className="text-gray-600 text-sm mb-1">{attr.description}</p>}
          <div className="grid grid-cols-2 gap-1 text-sm text-gray-500 mb-1">
            {attr.transport && <p className="flex items-center gap-1"><Train size={12} /> <span className="font-medium">交通:</span> {attr.transport}</p>}
            {attr.highlights && <p className="flex items-center gap-1"><Star size={12} /> <span className="font-medium">特色:</span> {attr.highlights}</p>}
            {attr.mustEat && <p className="flex items-center gap-1"><UtensilsCrossed size={12} /> <span className="font-medium">必食:</span> {attr.mustEat}</p>}
            {attr.mustBuy && <p className="flex items-center gap-1"><ShoppingBag size={12} /> <span className="font-medium">必買:</span> {attr.mustBuy}</p>}
          </div>
          <div className="flex items-center gap-2">
            {attr.mapLocation && (
              <a
                href={attr.mapLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-200 transition"
              >
                <MapPin size={12} /> View on Map <ExternalLink size={10} />
              </a>
            )}
            {attr.tips && <span className="flex items-center gap-1 text-sm text-gray-500 italic"><MessageSquare size={12} /> 貼士: {attr.tips}</span>}
          </div>
          {(attr.transportationCost !== undefined || attr.attractionCost !== undefined) && (
            <div className="flex gap-4 text-sm text-gray-600 mt-1">
              {attr.transportationCost !== undefined && (
                <span className="flex items-center gap-1"><DollarSign size={12} /> 交通費用: ${attr.transportationCost}</span>
              )}
              {attr.attractionCost !== undefined && (
                <span className="flex items-center gap-1"><DollarSign size={12} /> 景點費用: ${attr.attractionCost}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
