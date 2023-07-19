export interface ListTaskRepository {
  idUser: number
  status?: 'PENDING' | 'INPROGRESS' | 'COMPLETED'
}
