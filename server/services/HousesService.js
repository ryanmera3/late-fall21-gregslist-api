import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'


class HousesService {

  async getAll(query = {}) {
    const houses = await dbContext.Houses.find(query).populate('creator', 'address')
    return houses
  }

  async getById(id) {
    const house = await dbContext.Houses.findById(id).populate('creator', 'address')
    if (!house) {
      throw new BadRequest('Invalid House Id')
    }
    return house
  }

  async create(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }

  async edit(body) {
    const house = await this.getById(body.id)
    if (house.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your house')
    }
    const update = dbContext.Houses.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return update
  }

  async remove(houseId, userId) {
    const house = await this.getById(houseId)
    if (house.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your house')
    }
    await dbContext.Houses.findByIdAndDelete(houseId)
  }
}




export const housesService = new HousesService()