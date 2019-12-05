/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { QuestionKind } from "./../../__generated__/graphql-global-types";

// ====================================================
// GraphQL query operation: ExperimentPage
// ====================================================

export interface ExperimentPage_project_experiment_variants {
  __typename: "VariantType";
  name: string;
  id: any | null;
  description: string | null;
}

export interface ExperimentPage_project_experiment_questions_results {
  __typename: "QuestionResultType";
  answer: number;
  count: number;
  id: any | null;
  variantId: any | null;
}

export interface ExperimentPage_project_experiment_questions {
  __typename: "QuestionType";
  name: string;
  id: any | null;
  description: string | null;
  kind: QuestionKind | null;
  results: ExperimentPage_project_experiment_questions_results[];
}

export interface ExperimentPage_project_experiment_events_results {
  __typename: "EventResultType";
  count: number;
  id: any | null;
  variantId: any | null;
}

export interface ExperimentPage_project_experiment_events {
  __typename: "EventType";
  name: string;
  description: string | null;
  id: any | null;
  results: ExperimentPage_project_experiment_events_results[];
}

export interface ExperimentPage_project_experiment {
  __typename: "ExperimentType";
  id: any | null;
  name: string;
  description: string | null;
  variants: ExperimentPage_project_experiment_variants[];
  questions: ExperimentPage_project_experiment_questions[];
  events: ExperimentPage_project_experiment_events[];
  usersTested: number;
}

export interface ExperimentPage_project {
  __typename: "ProjectType";
  experiment: ExperimentPage_project_experiment | null;
  name: string;
  id: any | null;
}

export interface ExperimentPage_me {
  __typename: "UserType";
  userName: string;
  id: any | null;
}

export interface ExperimentPage {
  project: ExperimentPage_project | null;
  me: ExperimentPage_me | null;
}

export interface ExperimentPageVariables {
  projectId: string;
  experimentId: string;
}
