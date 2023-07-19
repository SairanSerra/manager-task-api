export interface CreateTask {
  idUser: number
  name: string
  description: string
  status: 'PENDING' | 'INPROGRESS' | 'COMPLETED'
}
