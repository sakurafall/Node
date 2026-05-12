export interface URLRecord {
  id: string;
  originURL: string;
  shortURL: string;
  urlCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateURLRecordPayload {
  originURL: string;
  urlCode?: string;
}

export interface ApiEnvelope<T> {
  message: string;
  data: T;
}

export interface ApiError {
  message: string;
  status: number;
}
