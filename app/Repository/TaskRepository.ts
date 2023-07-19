import { DeleteTask } from 'App/Dtos/Repositoy/Task/DeleteTask'
import type { ListTaskRepository } from 'App/Dtos/Repositoy/Task/ListTaks'
import { TaskById } from 'App/Dtos/Repositoy/Task/TaskById'
import { UpdateTask } from 'App/Dtos/Repositoy/Task/UpdateTask'
import Task from 'App/Models/Task'

export default class TaskRepository {
  private model: typeof Task
  constructor() {
    this.model = Task
  }

  public async listTask({ idUser, status }: ListTaskRepository) {
    return await this.model
      .query()
      .where('idUser', idUser)
      .where(function (query) {
        const hasExistUser = status
        if (hasExistUser) {
          query.where('status', status)
        }
      })
      .paginate(7)
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
}
