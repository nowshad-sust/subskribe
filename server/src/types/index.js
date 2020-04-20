export interface Pagination {
  page: number;
  limit: number;
}

export interface CustomError extends Error {
  statusCode: number;
  message: any;
}
