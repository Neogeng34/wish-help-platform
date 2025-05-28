import express from 'express';
import { WishController } from '../controllers/wish.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateWish } from '../middleware/validation.middleware';

const router = express.Router();
const wishController = new WishController();

// Public routes
router.get('/', wishController.getAllWishes);
router.get('/:id', wishController.getWishById);
router.get('/category/:category', wishController.getWishesByCategory);
router.get('/location/nearby', wishController.getNearbyWishes);

// Protected routes (require authentication)
router.use(authMiddleware);
router.post('/', validateWish, wishController.createWish);
router.put('/:id', validateWish, wishController.updateWish);
router.delete('/:id', wishController.deleteWish);

// Wish interaction routes
router.post('/:id/apply', wishController.applyForWish);
router.post('/:id/accept/:helperId', wishController.acceptHelper);
router.post('/:id/complete', wishController.completeWish);
router.post('/:id/review', wishController.reviewWish);

// Wish status management
router.patch('/:id/status', wishController.updateWishStatus);
router.post('/:id/extend', wishController.extendDeadline);

// Wish media management
router.post('/:id/media', wishController.uploadMedia);
router.delete('/:id/media/:mediaId', wishController.deleteMedia);

export default router; 