import mongoose, { Document, Schema } from 'mongoose';

export interface IWish extends Document {
  title: string;
  description: string;
  category: string;
  creator: mongoose.Types.ObjectId;
  helper?: mongoose.Types.ObjectId;
  status: 'draft' | 'pending' | 'in_progress' | 'completed' | 'cancelled';
  budget: number;
  location: {
    type: string;
    coordinates: number[];
    address: string;
  };
  deadline: Date;
  isPublic: boolean;
  tags: string[];
  media: {
    type: 'image' | 'video' | 'audio';
    url: string;
    thumbnail?: string;
  }[];
  reviews: {
    rating: number;
    comment: string;
    reviewer: mongoose.Types.ObjectId;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const wishSchema = new Schema<IWish>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    category: {
      type: String,
      required: true,
      enum: ['charity', 'life', 'skill', 'emotion', 'education', 'health', 'travel', 'other'],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    helper: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'in_progress', 'completed', 'cancelled'],
      default: 'draft',
    },
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    deadline: {
      type: Date,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    media: [{
      type: {
        type: String,
        enum: ['image', 'video', 'audio'],
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      thumbnail: String,
    }],
    reviews: [{
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        trim: true,
        maxlength: 200,
      },
      reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes
wishSchema.index({ location: '2dsphere' });
wishSchema.index({ category: 1, status: 1 });
wishSchema.index({ creator: 1, status: 1 });
wishSchema.index({ helper: 1, status: 1 });

// Virtual for time remaining
wishSchema.virtual('timeRemaining').get(function() {
  return this.deadline.getTime() - Date.now();
});

// Pre-save middleware
wishSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed') {
    // Add completion logic here
  }
  next();
});

export const Wish = mongoose.model<IWish>('Wish', wishSchema); 