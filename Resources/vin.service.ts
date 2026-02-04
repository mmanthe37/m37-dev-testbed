import axios from 'axios';
import { Vehicle } from '@gear-ai/ts-types';

const NHTSA_API_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

interface NhtsaVariable {
  Variable: string;
  Value: string | null;
}

/**
 * Decodes a Vehicle Identification Number (VIN) using the NHTSA API.
 * @param vin The 17-character VIN to decode.
 * @returns A partial Vehicle object with decoded information.
 * @throws An error if the VIN is invalid or the API call fails.
 */
export const decodeVinNhtsa = async (vin: string): Promise<Partial<Vehicle>> => {
  if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) {
    throw new Error('Invalid VIN format. VIN must be 17 alphanumeric characters.');
  }

  try {
    const response = await axios.get<{ Results: NhtsaVariable[] }>(
      `${NHTSA_API_URL}/DecodeVin/${vin}?format=json`
    );

    const results = response.data.Results;

    const getValue = (variableName: string): string | null => {
      const item = results.find(r => r.Variable === variableName);
      return item?.Value || null;
    };
    
    const yearValue = getValue('Model Year');

    const decodedVehicle: Partial<Vehicle> = {
      vin: vin.toUpperCase(),
      year: yearValue ? parseInt(yearValue, 10) : 0,
      make: getValue('Make') || undefined,
      model: getValue('Model') || undefined,
      trim: getValue('Trim') || undefined,
      bodyStyle: getValue('Body Class') || undefined,
      engine: getValue('Engine Configuration') || undefined,
      driveType: getValue('Drive Type') || undefined,
      fuelType: getValue('Fuel Type - Primary') || undefined,
    };
    
    if (!decodedVehicle.year || !decodedVehicle.make || !decodedVehicle.model) {
        throw new Error('Failed to decode essential vehicle information (Year, Make, Model).');
    }

    return decodedVehicle;
  } catch (error) {
    console.error(`Error decoding VIN ${vin} with NHTSA API:`, error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`NHTSA API responded with status ${error.response.status}`);
    }
    throw new Error('An unexpected error occurred during VIN decoding.');
  }
};