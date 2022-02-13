import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { GetReadmeAction, GetRepoAction, RepoActions, RepoState } from "../modules/types";
import { RepoRow } from "../types/Repo";

function* fetchRepoSaga(action: GetRepoAction) {
  try {
    const getRepo = () =>
    axios.get<RepoState[]>(`https://api.github.com/users/${action.payload}/repos`);

    const response: { data: RepoRow[]; } = yield call(getRepo);
    const responseBody: Array<RepoRow> = response.data;
    yield put({ type: RepoActions.GET_REPOSITORIES_SUCCESS, payload: responseBody })

  } catch (e) {
    yield put({ type: RepoActions.GET_REPOSITORIES_FAILED })

  }
}

function* fetchReadme(action: GetReadmeAction) {
  try {
    const getReadme = () =>
    axios.get<string>(`https://api.github.com/repos/${action.payload.user}/${action.payload.repo}/readme`);

    const response = yield call(getReadme);
    
    yield put({ type: RepoActions.GET_README_SUCCESS, payload: response.data.content })

  } catch (e) {
    yield put({ type: RepoActions.GET_README_FAILED })

  }
}

export function* getRepoSaga() {
  yield takeLatest(RepoActions.GET_REPOSITORIES, fetchRepoSaga);
}
export function* readmeSaga() {
   // @ts-ignore 
  yield takeLatest(RepoActions.GET_README, fetchReadme);
}
