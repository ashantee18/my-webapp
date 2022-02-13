import { ReadmeRow } from "../types/Repo";
import { actionType, RepoActions } from "./types";

export const actionGetRepositories = (payload: string) : actionType => ({
    payload: payload,
    type: RepoActions.GET_REPOSITORIES,
})

export const actionGetReadme = (payload: ReadmeRow) : actionType => ({
    payload: payload,
    type: RepoActions.GET_README,
})