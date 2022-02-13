import { createSelector } from "reselect";

import { AppState } from "./modules";

const getRepo = (state: AppState) => state.repo.list;
const getReadme = (state: AppState) => state.repo.readme;

export const getRepoSelector = createSelector(
  getRepo,
  (list) => list,
);
export const getReadmeSelector = createSelector(
  getReadme,
  (readme) => readme,
);