import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CarSchema } from '../models/Car'
import { HousesSchema } from "../models/House";
import { JobsSchema } from "../models/Job";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Cars = mongoose.model('Car', CarSchema)

  Jobs = mongoose.model('Job', JobsSchema)

  Houses = mongoose.model('House', HousesSchema)
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
