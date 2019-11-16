/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: VariantsList
// ====================================================

export interface VariantsList_variants {
  __typename: "VariantType";
  id: any | null;
  name: string;
}

export interface VariantsList {
  __typename: "ExperimentType";
  variants: VariantsList_variants[];
}
