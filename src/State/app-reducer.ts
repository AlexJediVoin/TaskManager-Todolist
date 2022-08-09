export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType;
    error: null | string;
}

const initialState: InitialStateType = {
    status: 'loading',
    error: null
}

export type setAppStatusACType = {
    type:'APP/SET-STATUS',
    status: RequestStatusType
}
export type setAppErrorACType = {
    type:'APP/SET-ERROR',
    error: null | string
}

export type AppReducerActionsType =
    setAppStatusACType
    | setAppErrorACType;

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType): setAppStatusACType => {
    return ({type:'APP/SET-STATUS', status})
}
export const setAppErrorAC = (error: null | string): setAppErrorACType => {
    return ({type:'APP/SET-ERROR', error})
}

