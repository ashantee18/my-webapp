import { all, fork } from "redux-saga/effects";

import { getRepoSaga, readmeSaga } from "./repoSagas";

export function* rootSaga() {
  yield all([
    fork(getRepoSaga),
    fork(readmeSaga)
  ]);
}