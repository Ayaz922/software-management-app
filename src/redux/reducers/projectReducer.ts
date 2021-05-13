import { getProjectId } from '../../utils/general_data';
import {actionType} from '../actions/project/project-actiontype'
const initialState = {
    projectId:getProjectId()
}

function projectReducer(state=initialState,action:any){
    switch(action.type){
        case actionType.SET_PROJECT_ID:
            return {...state,projectId:action.payload}
    }
    return state;
}
export default projectReducer;