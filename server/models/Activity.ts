import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  boardId?: Types.ObjectId;
  userId: Types.ObjectId;
  action: string;
  entityType: 'card' | 'board' | 'note' | 'user' | 'team';
  entityId?: Types.ObjectId;
  metadata?: any;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    entityType: {
      type: String,
      enum: ['card', 'board', 'note', 'user', 'team'],
      required: true,
    },
    entityId: { type: Schema.Types.ObjectId },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Activity =
  mongoose.models.Activity ||
  mongoose.model<IActivity>('Activity', ActivitySchema);
