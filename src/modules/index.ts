import { combineReducers } from "redux";

import {repo} from "./reducers";

const rootReducer = combineReducers({
  repo: repo,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;