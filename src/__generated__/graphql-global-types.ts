/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OwnershipType {
  OWNER = "OWNER",
  READ_ONLY = "READ_ONLY",
  READ_WRITE = "READ_WRITE",
}

export enum ShareStatus {
  NONE = "NONE",
  READ_ONLY = "READ_ONLY",
  READ_WRITE = "READ_WRITE",
}

export interface ProjectInput {
  name: string;
  owners?: ProjectOwnershipInput[] | null;
  description?: string | null;
  publicShareStatus?: ShareStatus | null;
}

export interface ProjectOwnershipInput {
  userId?: string | null;
  ownership?: OwnershipType | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
