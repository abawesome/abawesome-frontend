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

export enum QuestionKind {
  RATING = "RATING",
  YES_NO = "YES_NO",
}

export enum ShareStatus {
  NONE = "NONE",
  READ_ONLY = "READ_ONLY",
  READ_WRITE = "READ_WRITE",
}

export interface EventInput {
  name: string;
  description?: string | null;
}

export interface ExperimentInput {
  name: string;
  description?: string | null;
  variants?: VariantInput[] | null;
  events?: EventInput[] | null;
  questions?: QuestionInput[] | null;
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

export interface QuestionInput {
  name: string;
  description?: string | null;
  kind?: QuestionKind | null;
}

export interface VariantInput {
  name: string;
  description?: string | null;
  photoUrl?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
