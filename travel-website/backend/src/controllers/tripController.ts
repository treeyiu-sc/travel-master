import { Request, Response } from 'express';
import Trip from '../models/Trip';

export const getTrips = async (_req: Request, res: Response): Promise<void> => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error });
  }
};

export const getTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      res.status(404).json({ message: 'Trip not found' });
      return;
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip', error });
  }
};

export const createTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: 'Error creating trip', error });
  }
};

export const updateTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) {
      res.status(404).json({ message: 'Trip not found' });
      return;
    }
    res.json(trip);
  } catch (error) {
    res.status(400).json({ message: 'Error updating trip', error });
  }
};

export const deleteTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      res.status(404).json({ message: 'Trip not found' });
      return;
    }
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error });
  }
};
