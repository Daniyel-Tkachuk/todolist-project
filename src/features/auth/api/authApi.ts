import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { Inputs } from "../ui/Login/Login"
import { AxiosResponse } from "axios"

export const authApi = {
  login(payload: Inputs) {
    return instance.post<null, AxiosResponse<BaseResponse<PostResponse>>, Inputs>(`/auth/login`, payload)
  },
}

type PostResponse = {
  userId: number
  token: string
}
