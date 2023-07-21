import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { CreateDto } from 'App/Dtos/Task/CreateDto'
import type { IndexDto } from 'App/Dtos/Task/IndexDto'
import type { UpdateTaskDto } from 'App/Dtos/Task/UpdateDto'
import TaskService from 'App/Services/TaskService'
import DeleteTaskValidator from 'App/Validators/DeleteTaskValidator'
import IndexTaskValidator from 'App/Validators/IndexTaskValidator'
import SpecificTaskValidator from 'App/Validators/SpecificTaskValidator'
import StoreTaskValidator from 'App/Validators/StoreTaskValidator'
import UpdateTaskValidator from 'App/Validators/UpdateTaskValidator'

export default class TasksController {
  private taskService: TaskService
  constructor() {
    this.taskService = new TaskService()
  }

  public async index({ request }: HttpContextContract) {
    const payload = (await request.validate(IndexTaskValidator)) as IndexDto
    return await this.taskService.index(payload)
  }

  public async store({ request }: HttpContextContract) {
    const payload = (await request.validate(StoreTaskValidator)) as CreateDto
    return await this.taskService.store(payload)
  }

  public async update({ request }: HttpContextContract) {
    const payload = (await request.validate(UpdateTaskValidator)) as UpdateTaskDto
    return await this.taskService.update(payload)
  }

  public async delete({ request }: HttpContextContract) {
    const payload = await request.validate(DeleteTaskValidator)
    return await this.taskService.delete(payload)
  }
  public async specific({ request }: HttpContextContract) {
    const payload = await request.validate(SpecificTaskValidator)
    return await this.taskService.specific(payload)
  }
}
