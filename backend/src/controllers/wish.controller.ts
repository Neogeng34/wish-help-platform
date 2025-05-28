import { Request, Response, NextFunction } from 'express';
import { Wish, IWish } from '../models/wish.model';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export class WishController {
  // Get all wishes with filtering and pagination
  getAllWishes = catchAsync(async (req: Request, res: Response) => {
    const {
      category,
      status,
      minBudget,
      maxBudget,
      location,
      radius,
      page = 1,
      limit = 10,
    } = req.query;

    const query: any = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }

    // Location-based search
    if (location && radius) {
      const [lng, lat] = (location as string).split(',').map(Number);
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: Number(radius) * 1000, // Convert km to meters
        },
      };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const wishes = await Wish.find(query)
      .skip(skip)
      .limit(Number(limit))
      .populate('creator', 'name avatar')
      .populate('helper', 'name avatar')
      .sort('-createdAt');

    const total = await Wish.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        wishes,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  });

  // Get a single wish by ID
  getWishById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const wish = await Wish.findById(req.params.id)
      .populate('creator', 'name avatar')
      .populate('helper', 'name avatar')
      .populate('reviews.reviewer', 'name avatar');

    if (!wish) {
      return next(new AppError('Wish not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { wish },
    });
  });

  // Create a new wish
  createWish = catchAsync(async (req: Request, res: Response) => {
    const wish = await Wish.create({
      ...req.body,
      creator: req.user.id,
    });

    res.status(201).json({
      status: 'success',
      data: { wish },
    });
  });

  // Update a wish
  updateWish = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const wish = await Wish.findById(req.params.id);

    if (!wish) {
      return next(new AppError('Wish not found', 404));
    }

    // Check if user is the creator
    if (wish.creator.toString() !== req.user.id) {
      return next(new AppError('Not authorized to update this wish', 403));
    }

    // Prevent updating certain fields
    const { status, creator, helper } = req.body;
    if (status || creator || helper) {
      return next(new AppError('Cannot update these fields', 400));
    }

    const updatedWish = await Wish.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: { wish: updatedWish },
    });
  });

  // Delete a wish
  deleteWish = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const wish = await Wish.findById(req.params.id);

    if (!wish) {
      return next(new AppError('Wish not found', 404));
    }

    // Check if user is the creator
    if (wish.creator.toString() !== req.user.id) {
      return next(new AppError('Not authorized to delete this wish', 403));
    }

    await wish.remove();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

  // Apply for a wish
  applyForWish = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const wish = await Wish.findById(req.params.id);

    if (!wish) {
      return next(new AppError('Wish not found', 404));
    }

    if (wish.status !== 'pending') {
      return next(new AppError('This wish is not available for application', 400));
    }

    if (wish.creator.toString() === req.user.id) {
      return next(new AppError('Cannot apply for your own wish', 400));
    }

    // Add application logic here
    // This could involve creating an application record
    // and notifying the wish creator

    res.status(200).json({
      status: 'success',
      message: 'Application submitted successfully',
    });
  });

  // Accept a helper for a wish
  acceptHelper = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const wish = await Wish.findById(req.params.id);

    if (!wish) {
      return next(new AppError('Wish not found', 404));
    }

    if (wish.creator.toString() !== req.user.id) {
      return next(new AppError('Not authorized to accept helpers', 403));
    }

    if (wish.status !== 'pending') {
      return next(new AppError('Cannot accept helper in current status', 400));
    }

    wish.helper = req.params.helperId;
    wish.status = 'in_progress';
    await wish.save();

    res.status(200).json({
      status: 'success',
      data: { wish },
    });
  });

  // Complete a wish
  completeWish = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const wish = await Wish.findById(req.params.id);

    if (!wish) {
      return next(new AppError('Wish not found', 404));
    }

    if (wish.creator.toString() !== req.user.id) {
      return next(new AppError('Not authorized to complete this wish', 403));
    }

    if (wish.status !== 'in_progress') {
      return next(new AppError('Cannot complete wish in current status', 400));
    }

    wish.status = 'completed';
    await wish.save();

    res.status(200).json({
      status: 'success',
      data: { wish },
    });
  });

  // Review a wish
  reviewWish = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const wish = await Wish.findById(req.params.id);

    if (!wish) {
      return next(new AppError('Wish not found', 404));
    }

    if (wish.status !== 'completed') {
      return next(new AppError('Cannot review incomplete wish', 400));
    }

    const { rating, comment } = req.body;

    wish.reviews.push({
      rating,
      comment,
      reviewer: req.user.id,
    });

    await wish.save();

    res.status(200).json({
      status: 'success',
      data: { wish },
    });
  });
} 