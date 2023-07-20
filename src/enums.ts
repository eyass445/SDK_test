export enum Status {
  // IDLE = 'IDLE',
  UPLOADING = "UPLOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
}

export enum Storage {
  IPFS = "IPFS",
  EDGE = "EDGE",
  WEB3_STORAGE = 'WEB3STORAGE',
}

export enum FilesStatus {
  GETSHAREDWITHME = "getSharedWithMe",
  GETSHAREDBYME = "getSentByMe",
}

export enum AppMenuConstants {
  UPLOAD_FILES,
  SHARED_WITH_ME,
  SHARED_BY_ME,
}

export enum OrderBy {
  NAME = "name",
  SIZE = "size",
  DATE = "date",
}
export const ChainName: any = {
  "56": "bsc",
  "137": "polygon",
  "1": "ethereum",
  "80001": "mumbai",
  "97": "bscTestnet",
};
