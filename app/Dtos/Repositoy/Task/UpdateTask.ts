export interface UpdateTask {
  name: string
  idUser: number
  idTask: number
  description: string
  status: 'PENDING' | 'INPROGRESS' | 'COMPLETED'
}
