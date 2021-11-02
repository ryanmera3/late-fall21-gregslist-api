import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


export const HousesSchema = new Schema(
  {
    address: { type: String, unique: true },
    price: { type: Number, required: true, min: 1 },
    description: { type: String, default: 'No Description Provided' },
    built: { type: Number, required: true, min: 1850 },
    bathrooms: { type: Number, required: true, min: 1 },
    bedrooms: { type: Number, required: true, min: 1 },
    creatorId: { type: ObjectId, required: true, ref: 'Profile' }
    // NOTE Additional properties below
  },
  { timestamps: true, toJSON: { virtuals: true } })

HousesSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

