import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class JobsService {

  async getAll(query = {}) {
    const jobs = await dbContext.Jobs.find(query).populate('creator', 'salary hours')
    return jobs
  }

  async getById(id) {
    const job = await dbContext.Jobs.findById(id).populate('creator', 'salary hours')
    if (!job) {
      throw new BadRequest('Invalid Job Id')
    }
    return job
  }

  async create(body) {
    const job = await dbContext.Jobs.create(body)
    return job
  }

  async edit(body) {
    const job = await this.getById(body.id)
    if (job.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your job')
    }
    const update = dbContext.Jobs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return update
  }

  async remove(jobId, userId) {
    const job = await this.getById(jobId)
    if (job.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your job')
    }
    await dbContext.Jobs.findByIdAndDelete(jobId)
  }

}


export const jobsService = new JobsService()