export interface CreateDto {
  name: string
  description: string
  status: 'PENDING' | 'INPROGRESS' | 'COMPLETED'
}
