import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { decodeVinNhtsa } from '../services/vin.service';
import { Prisma } from '@prisma/client';

// Define business logic for vehicle limits
const TIER_VEHICLE_LIMITS: { [key: string]: number } = {
    free: 1,
    pro: 5,
    dealer: 50,
};

// --- VIN Decoding ---
// ... (decodeVin function remains the same)
export const decodeVin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vin } = req.body;
        if (!vin) {
            return res.status(400).json({ error: 'VIN is required.' });
        }
        const decodedData = await decodeVinNhtsa(vin);
        res.status(200).json({ success: true, data: decodedData });
    } catch (error) {
        next(error);
    }
};

// --- Vehicle CRUD Operations ---

export const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user || !user.id) {
            return res.status(401).json({ error: 'Unauthorized: User not identified.' });
        }

        // --- BUSINESS LOGIC INTEGRATION ---
        const userTier = user.tier || 'free';
        const limit = TIER_VEHICLE_LIMITS[userTier] || 1;

        const vehicleCount = await prisma.vehicle.count({
            where: { ownerId: user.id },
        });

        if (vehicleCount >= limit) {
            return res.status(403).json({
                error: 'Forbidden',
                message: `Vehicle limit of ${limit} for the '${userTier}' tier has been reached. Please upgrade your plan to add more vehicles.`,
            });
        }
        // --- END BUSINESS LOGIC INTEGRATION ---

        const { year, make, model, registrationMethod, ...otherData } = req.body;

        if (!year || !make || !model || !registrationMethod) {
            return res.status(400).json({ error: 'Year, Make, Model, and RegistrationMethod are required.' });
        }

        const newVehicle = await prisma.vehicle.create({
            data: {
                ownerId: user.id,
                year,
                make,
                model,
                registrationMethod,
                ...otherData,
            },
        });

        res.status(201).json({ success: true, data: newVehicle });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({ error: 'Conflict', message: 'A vehicle with this VIN already exists.' });
        }
        next(error);
    }
};

// ... (other controller functions: getUserVehicles, getVehicleById, etc. remain the same as they already use req.user.id for authorization)
export const getUserVehicles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ownerId = req.user?.id;
        if (!ownerId) {
            return res.status(401).json({ error: 'Unauthorized: User not identified.' });
        }

        const vehicles = await prisma.vehicle.findMany({
            where: {
                ownerId: ownerId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        next(error);
    }
};

export const getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ownerId = req.user?.id;
        const { vehicleId } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: {
                id: vehicleId,
            },
        });

        if (!vehicle) {
            return res.status(404).json({ error: 'Not Found', message: 'Vehicle not found.' });
        }

        if (vehicle.ownerId !== ownerId) {
            return res.status(403).json({ error: 'Forbidden', message: 'You are not authorized to view this vehicle.' });
        }

        res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
        next(error);
    }
};

export const updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ownerId = req.user?.id;
        const { vehicleId } = req.params;
        const updateData = req.body;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId },
        });

        if (!vehicle || vehicle.ownerId !== ownerId) {
            return res.status(403).json({ error: 'Forbidden', message: 'You are not authorized to update this vehicle.' });
        }

        const updatedVehicle = await prisma.vehicle.update({
            where: {
                id: vehicleId,
            },
            data: updateData,
        });

        res.status(200).json({ success: true, data: updatedVehicle });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'Not Found', message: 'Vehicle to update not found.' });
        }
        next(error);
    }
};

export const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ownerId = req.user?.id;
        const { vehicleId } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId },
        });

        if (!vehicle || vehicle.ownerId !== ownerId) {
            return res.status(403).json({ error: 'Forbidden', message: 'You are not authorized to delete this vehicle.' });
        }

        await prisma.vehicle.delete({
            where: {
                id: vehicleId,
            },
        });

        res.status(204).send();
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'Not Found', message: 'Vehicle to delete not found.' });
        }
        next(error);
    }
};