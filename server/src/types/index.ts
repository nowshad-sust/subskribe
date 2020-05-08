export interface Pagination {
  page: number;
  limit: number;
  filter?: string;
  userId?: number;
}

export interface CustomError extends Error {
  statusCode: number;
  message: any;
}

export interface AttachProgram {
  userId: number;
  programId: number;
}
