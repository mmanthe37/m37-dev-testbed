/**
 * @file Defines the core data models for the Gear AI ecosystem.
 * These types are shared across all services and the frontend application.
 */

// --- User Model ---
// Represents a user in the system, accommodating both Web2 and Web3 identities.

export interface User {
  id: string; // UUID, primary key
  
  // Web2 Identity
  email?: string | null;
  hashedPassword?: string | null;
  displayName?: string | null;
  
  // Web3 Identity
  walletAddress?: string | null; // e.g., '0x...'
  
  // Profile & Metadata
  avatarUrl?: string | null;
  tier: 'free' | 'pro' | 'dealer';
  stripeCustomerId?: string | null;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

// --- Vehicle Model ---
// Represents a vehicle, designed to be extensible for NFT representation.

export enum RegistrationMethod {
  MANUAL = 'manual',
  VIN = 'vin',
}

export interface Vehicle {
  id: string; // UUID, primary key
  ownerId: string; // Foreign key to User.id
  
  // Core Identification
  vin?: string | null;
  year: number;
  make: string;
  model: string;
  trim?: string | null;
  nickname?: string | null;
  
  // Enriched Data (from VIN decoding or manual input)
  engine?: string | null;
  transmission?: string | null;
  driveType?: string | null;
  fuelType?: string | null;
  bodyStyle?: string | null;
  color?: string | null;
  mileage?: number | null;
  
  // Media & Documents
  imageUrl?: string | null;
  manualId?: string | null; // Link to a manual in storage
  
  // Web3 Metadata (for future NFT minting)
  tokenId?: number | null; // NFT token ID if it exists
  tokenStandard?: 'ERC721' | 'ERC1155' | null;
  contractAddress?: string | null;
  serviceHistoryChain?: string | null; // e.g., 'polygon'
  
  // System Metadata
  registrationMethod: RegistrationMethod;
  createdAt: Date;
  updatedAt: Date;
}

// --- API Payloads ---
// Standardized API response formats

export interface ApiErrorResponse {
  error: string;
  message: string;
  details?: any;
}

export interface ApiSuccessResponse<T> {
  success: boolean;
  data: T;
  metadata?: {
    timestamp: string;
    [key: string]: any;
  };
}