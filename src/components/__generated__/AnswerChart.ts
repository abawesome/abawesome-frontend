/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { QuestionKind } from "./../../__generated__/graphql-global-types";

// ====================================================
// GraphQL fragment: AnswerChart
// ====================================================

export interface AnswerChart_variants {
  __typename: "VariantType";
  id: any | null;
  name: string;
}

export interface AnswerChart_questions_results {
  __typename: "QuestionResultType";
  answer: number;
  count: number;
  id: any | null;
  variantId: any | null;
}

export interface AnswerChart_questions {
  __typename: "QuestionType";
  id: any | null;
  name: string;
  kind: QuestionKind | null;
  results: AnswerChart_questions_results[];
}

export interface AnswerChart {
  __typename: "ExperimentType";
  variants: AnswerChart_variants[];
  questions: AnswerChart_questions[];
}
