export interface Pagination {
  page: number;
  limit: number;
  filter?: string;
}

export interface CustomError extends Error {
  statusCode: number;
  message: any;
}

export interface AttachProgram {
  userId: number;
  programId: number;
}
