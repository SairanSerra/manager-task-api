import type { CreateDto } from 'App/Dtos/Task/CreateDto'
import type { DeleteDto } from 'App/Dtos/Task/DeleteDto'
import type { IndexDto } from 'App/Dtos/Task/IndexDto'
import type { SpecificDto } from 'App/Dtos/Task/SpecificDto'
import type { UpdateTaskDto } from 'App/Dtos/Task/UpdateDto'
import CustomException from 'App/Exceptions/CustomException'
import TaskRepository from 'App/Repository/TaskRepository'
import DataUser from 'App/Utils/DataUser'
import DefaultResponse from 'App/Utils/DefaultResponse'

export default class TaskService {
  private model: TaskRepository
  private defaultResponse: DefaultResponse
  private dataUser: DataUser
  constructor() {
    this.model = new TaskRepository()
    this.defaultResponse = new DefaultResponse()
    this.dataUser = new DataUser()
  }

  public async index({ status, page }: IndexDto) {
    const idUser = Number((await this.dataUser.user())?.id)
    const tasks = await this.model.listTask({ idUser, status, page })
    const listIsEmpty = tasks.isEmpty

    if (listIsEmpty) {
      throw new CustomException('Taks is empty', 404)
    }

    return this.defaultResponse.isSuccessWithContent('list task', 200, tasks)
  }

  public async store({ name, ...rest }: CreateDto) {
    const idUser = Number((await this.dataUser.user())?.id)
    const nameHasExistInProgress = await this.model.taskByName({ nameTask: name, idUser: idUser })
    if (nameHasExistInProgress) {
      throw new CustomException('Name taks has exist', 400)
    }
    try {
      await this.model.createTask({ ...rest, name, idUser })
      return this.defaultResponse.isSuccess('Task created', 201)
    } catch (err) {
      throw new CustomException('Failed record Task', 400)
    }
  }

  public async update({ id, ...rest }: UpdateTaskDto) {
    const idUser = Number((await this.dataUser.user())?.id)

    const taskNotFound = !(await this.verifyTaskHasNotExist(id, idUser))

    if (taskNotFound) {
      throw new CustomException('Task not found', 404)
    }

    try {
      await this.model.updateTask({ ...rest, idTask: id, idUser })
      return await this.defaultResponse.isSuccess('task as updated', 200)
    } catch (err) {
      throw new CustomException('Failed update task', 400)
    }
  }

  public async delete({ id }: DeleteDto) {
    const idUser = Number((await this.dataUser.user())?.id)
    const taskNotFound = !(await this.verifyTaskHasNotExist(id, idUser))
    if (taskNotFound) {
      throw new CustomException('Task not found', 404)
    }
    try {
      this.model.deleteTask({ idTask: id, idUser })
      this.defaultResponse.isSuccess('task as deleted', 200)
    } catch (err) {
      throw new CustomException('Failed delete task', 400)
    }
  }

  public async specific({ id }: SpecificDto) {
    const idUser = Number((await this.dataUser.user())?.id)
    const task = await this.model.taskById({ idTask: id, idUser })
    const taskNotFound = !(await this.verifyTaskHasNotExist(id, idUser))
    if (taskNotFound) {
      throw new CustomException('Task not found', 404)
    }
    return this.defaultResponse.isSuccessWithContent('Task specific found', 200, task)
  }

  public async verifyTaskHasNotExist(idTask: number, idUser: number) {
    const task = await this.model.taskById({ idTask: idTask, idUser })
    const taskExist = !!task
    return taskExist
  }
}
