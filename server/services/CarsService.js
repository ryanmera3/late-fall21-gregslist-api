import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CarsService {
  // set the query to either the data passed or default to {} (match all)
  async getAll(query = {}) {
    // find looks for all objects that match the provided object pattern
    // if passed an empty object, will find all items
    // populate goes and gets extra data based on the property provided, given it is a relationship
    const cars = await dbContext.Cars.find(query).populate('creator', 'name picture')
    return cars
  }

  async getById(id) {
    const car = await dbContext.Cars.findById(id).populate('creator', 'name picture')
    if (!car) {
      throw new BadRequest('Invalid Car Id')
    }
    return car
  }

  async create(body) {
    const car = await dbContext.Cars.create(body)
    return car
  }

  async edit(body) {
    // check that the car exists
    const car = await this.getById(body.id)
    // check if the car is yours
    if (car.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your car')
    }
    // findOne allows to check multiple properties
    const update = dbContext.Cars.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return update
  }

  async remove(carId, userId) {
    // use getById because it will already handle the null check and throw an error if its a badId
    const car = await this.getById(carId)
    // NOTE the car creatorId is type ObjectId, it cannot be compared to a string
    // convert toString and you are all set
    if (car.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your car')
    }
    await dbContext.Cars.findByIdAndDelete(carId)
  }
}

export const carsService = new CarsService()
