import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


export const JobsSchema = new Schema(
  {
    company: { type: String, unique: true },
    salary: { type: Number, required: true, min: 1 },
    description: { type: String, default: 'No Description Provided' },
    hours: { type: Number, required: true, min: 35 },
    creatorId: { type: ObjectId, required: true, ref: 'Profile' }
    // NOTE Additional properties below
  },
  { timestamps: true, toJSON: { virtuals: true } })

JobsSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

