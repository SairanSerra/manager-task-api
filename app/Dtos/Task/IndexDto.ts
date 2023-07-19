export interface IndexDto {
  status: 'PENDING' | 'INPROGRESS' | 'COMPLETED' | undefined
  page?: number
}
