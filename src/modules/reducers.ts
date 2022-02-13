import { actionType, RepoActions, RepoState } from "./types";

const initialState: RepoState = {
  list: [],
  readme: ''
};

export function repo(state = initialState, action: actionType): RepoState {
  switch (action.type) {
    case RepoActions.GET_REPOSITORIES_SUCCESS:
      return { ...state, list: action.payload }
    case RepoActions.GET_README_SUCCESS:
      return { ...state, readme: action.payload }
    default:
      return state;
  }
}