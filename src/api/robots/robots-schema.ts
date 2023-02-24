import mongoose, { Schema } from 'mongoose';

const robotSchema = new Schema({
  id: String,
  name: String,
  speed: Number,
  endurance: Number,
  creationDate: Date,
});

export const RobotModel = mongoose.model('robot', robotSchema, 'robots');
