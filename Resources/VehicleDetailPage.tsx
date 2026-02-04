import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchVehicleById } from '@/api/client';
import { Car, Fingerprint, Hash, Droplets, Cog } from 'lucide-react';

export function VehicleDetailPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const { data: vehicle, isLoading, isError, error } = useQuery({
    queryKey: ['vehicle', vehicleId], // A dynamic query key that includes the vehicleId
    queryFn: () => fetchVehicleById(vehicleId!),
    enabled: !!vehicleId, // The query will not run until the vehicleId is available
  });

  if (isLoading) return <div className="text-center text-gray-400 p-10">Loading vehicle details...</div>;
  if (isError) return <div className="text-center text-red-400 p-10">Error: {error.message}</div>;
  if (!vehicle) return <div className="text-center text-gray-500 p-10">Vehicle not found.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8">
        <div className="flex items-center space-x-4">
            <div className="p-4 bg-gray-800 border border-gray-700 rounded-full">
                <Car className="w-10 h-10 text-blue-400" />
            </div>
            <div>
                <h1 className="text-4xl font-bold">{vehicle.nickname || `${vehicle.year} ${vehicle.make}`}</h1>
                <p className="text-xl text-gray-400">{vehicle.model} {vehicle.trim}</p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Core Specs */}
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Vehicle Specifications</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-center space-x-2"><Fingerprint className="w-5 h-5 text-gray-500" /><span><strong>VIN:</strong> {vehicle.vin || 'N/A'}</span></div>
              <div className="flex items-center space-x-2"><Droplets className="w-5 h-5 text-gray-500" /><span><strong>Fuel Type:</strong> {vehicle.fuelType || 'N/A'}</span></div>
              <div className="flex items-center space-x-2"><Cog className="w-5 h-5 text-gray-500" /><span><strong>Engine:</strong> {vehicle.engine || 'N/A'}</span></div>
              <div className="flex items-center space-x-2"><Cog className="w-5 h-5 text-gray-500" /><span><strong>Drivetrain:</strong> {vehicle.driveType || 'N/A'}</span></div>
            </div>
          </div>

          {/* On-Chain Identity - The Web3 Bridge */}
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">On-Chain Identity</h2>
            {vehicle.tokenId ? (
              <div className="space-y-2 text-gray-300">
                <p>This vehicle is represented as a digital asset on the blockchain.</p>
                <div className="flex items-center space-x-2"><Hash className="w-5 h-5 text-green-500" /><span><strong>Token ID:</strong> {vehicle.tokenId}</span></div>
                <p className="text-sm break-all"><strong>Contract:</strong> {vehicle.contractAddress}</p>
                <button className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">View on Etherscan</button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-400 mb-4">Create an immutable, on-chain record for your vehicle.</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">Mint Vehicle as NFT</button>
              </div>
            )}
          </div>
        </div>

        {/* Actions Column */}
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Actions</h2>
            <div className="flex flex-col space-y-3">
                <button className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg">Chat with this Vehicle</button>
                <button className="w-full text-left bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg">View Service History</button>
                <button className="w-full text-left bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg">Check for Recalls</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}