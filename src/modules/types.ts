import { Action } from "../types/Redux";
import { ReadmeRow, RepoRow } from "../types/Repo";

export enum RepoActions{
    GET_REPOSITORIES = '@Repo/GET_REPOSITORIES',
    GET_REPOSITORIES_SUCCESS = '@Repo/GET_REPOSITORIES_SUCCESS',
    GET_REPOSITORIES_FAILED = '@Repo/GET_REPOSITORIES_FAILED',

    GET_README = '@Repo/GET_README',
    GET_README_SUCCESS = '@Repo/GET_README_SUCCESS',
    GET_README_FAILED = '@Repo/GET_README_FAILED',
}

export interface RepoState{
    list: Array<RepoRow>;
    readme: string;
}

export type GetRepoAction = Action<typeof RepoActions.GET_REPOSITORIES, string>;
export type GetRepoActionSuccess = Action<typeof RepoActions.GET_REPOSITORIES_SUCCESS, Array<RepoRow>>;
export type GetRepoActionFailed = Action<typeof RepoActions.GET_REPOSITORIES_FAILED>;

export type GetReadmeAction = Action<typeof RepoActions.GET_README, ReadmeRow>;
export type GetReadmeActionSuccess = Action<typeof RepoActions.GET_README_SUCCESS, string>;
export type GetReadmeActionFailed = Action<typeof RepoActions.GET_README_FAILED>;

export type actionType = 
GetReadmeAction | GetReadmeActionSuccess | GetReadmeActionFailed |
GetRepoAction | GetRepoActionSuccess | GetRepoActionFailed;