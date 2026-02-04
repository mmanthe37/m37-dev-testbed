import { useQuery } from '@tanstack/react-query';
import { fetchUserVehicles } from '@/api/client';
import { VehicleCard } from '@/components/ui/VehicleCard';
import { PlusCircle } from 'lucide-react';

export function DashboardPage() {
  const { data: vehicles, isLoading, isError, error } = useQuery({
    queryKey: ['vehicles'], // The unique key for this query
    queryFn: fetchUserVehicles, // The function that fetches the data
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Garage</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
          <PlusCircle className="w-5 h-5" />
          <span>Add Vehicle</span>
        </button>
      </header>

      <main>
        {isLoading && <p className="text-center text-gray-400">Summoning your vehicles...</p>}
        {isError && <p className="text-center text-red-400">Error fetching vehicles: {error.message}</p>}
        
        {vehicles && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        {vehicles && vehicles.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-gray-700 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">Your Garage is Empty</h2>
                <p className="mt-2 text-gray-500">Add your first vehicle to begin your journey with Gear AI.</p>
            </div>
        )}
      </main>
    </div>
  );
}