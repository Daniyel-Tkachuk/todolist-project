import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { AxiosResponse } from "axios"
import { LoginArgs, LoginResponse } from "./authApi.types"

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<null, AxiosResponse<BaseResponse<LoginResponse>>, LoginArgs>(`/auth/login`, payload)
  },
}
