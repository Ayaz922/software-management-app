import  {actionType} from './project-actiontype'

export const setProjectId = (projectId:any | null)=>{
    return {type: actionType.SET_PROJECT_ID,payload:projectId}
}