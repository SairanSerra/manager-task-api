import { CreateTask } from 'App/Dtos/Repositoy/Task/CreateTask'
import { DeleteTask } from 'App/Dtos/Repositoy/Task/DeleteTask'
import type { ListTaskRepository } from 'App/Dtos/Repositoy/Task/ListTaks'
import { TaskById } from 'App/Dtos/Repositoy/Task/TaskById'
import { TaskByName } from 'App/Dtos/Repositoy/Task/TaskByName'
import { UpdateTask } from 'App/Dtos/Repositoy/Task/UpdateTask'
import Task from 'App/Models/Task'

export default class TaskRepository {
  private model: typeof Task
  constructor() {
    this.model = Task
  }

  public async listTask({ idUser, status, page = 1 }: ListTaskRepository) {
    return await this.model
      .query()
      .where('idUser', idUser)
      .where(function (query) {
        const hasExistUser = status
        if (hasExistUser) {
          query.where('status', status)
        }
      })
      .orderBy('createdAt', 'asc')
      .paginate(page, 7)
  }

  public async taskById({ idTask, idUser }: TaskById) {
    return await this.model.query().where('id', idTask).where('idUser', idUser).first()
  }

  public async updateTask({ idTask, idUser, ...rest }: UpdateTask) {
    return await this.model.query().where('id', idTask).where('idUser', idUser).update(rest)
  }

  public async deleteTask({ idTask, idUser }: DeleteTask) {
    return await this.model.query().where('id', idTask).where('idUser', idUser).delete()
  }
  public async taskByName({ idUser, nameTask }: TaskByName) {
    return await this.model
      .query()
      .where('name', nameTask)
      .whereNot('status', 'COMPLETED')
      .where('idUser', idUser)
      .first()
  }

  public async createTask(data: CreateTask) {
    return await this.model.create(data)
  }
}
