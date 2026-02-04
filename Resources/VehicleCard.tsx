import { Vehicle } from '@gear-ai/ts-types';
import { useNavigate } from 'react-router-dom';
import { Car, Fuel } from 'lucide-react'; // Using lucide-react for icons

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/vehicle/${vehicle.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="border border-gray-700 bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700/50 transition-all duration-300 shadow-lg"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gray-700 rounded-full">
          <Car className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{vehicle.nickname || `${vehicle.year} ${vehicle.make}`}</h3>
          <p className="text-gray-400">{vehicle.model} {vehicle.trim}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-600 flex justify-between items-center text-sm text-gray-300">
        <div className="flex items-center space-x-2">
          <Fuel className="w-4 h-4 text-gray-500" />
          <span>{vehicle.fuelType || 'N/A'}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${vehicle.registrationMethod === 'vin' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
          {vehicle.registrationMethod.toUpperCase()}
        </span>
      </div>
    </div>
  );
};