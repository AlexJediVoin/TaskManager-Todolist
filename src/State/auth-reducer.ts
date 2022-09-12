import {Dispatch} from 'redux'
import {setAppErrorACType, setAppStatusAC, setAppStatusACType} from '../State/app-reducer'
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {authAPI} from "../api/auth-api";
import {AppActionsType, AppThunk} from "./store";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha?: boolean): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(email, password, rememberMe, captcha)
        .then(res => {

            console.log(res)
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {

            console.log(res)
            if (res.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | setAppStatusACType | setAppErrorACType

