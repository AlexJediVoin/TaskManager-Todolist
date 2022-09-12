import axios, {AxiosResponse} from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '2aa454df-5c09-4e9d-a457-e6e882c52689'
    }
}

export type LoginResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        userId: number
    }
}
export type LoginOutResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}
type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: boolean,
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean, captcha?: boolean) {
        let promise = instance.post<any, AxiosResponse<LoginResponseType>, LoginParamsType>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
        return promise;
    },
    logout() {
        let promise = instance.delete<any, AxiosResponse<LoginOutResponseType>>('auth/login').then(res => res.data);
        return promise;
    }
}
