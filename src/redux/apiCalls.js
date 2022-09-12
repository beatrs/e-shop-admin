import { loginStart, loginSuccess, loginFailure } from "./userRedux"
import { genRequest } from "../reqMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await genRequest.post("/auth/admin/login", user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}