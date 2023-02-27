import mongoose, { Schema } from 'mongoose';

export const robotSchema = new Schema({
  id: String,
  thumb: String,
  name: String,
  speed: Number,
  endurance: Number,
  creationDate: Date,
});

export const RobotModel = mongoose.model('robot', robotSchema, 'robots');
