export enum actionType {
    SET_PROJECT_ID
}

export interface Action{
    type:actionType,
    payload:any
}