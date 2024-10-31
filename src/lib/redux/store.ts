import { configureStore } from "@reduxjs/toolkit"



import token from "./slices/token/tokenSlice"
import profile from "./slices/profileSlice/profileSlice"
import todos from "./slices/todosSlice/todosSlice"




export const makeStore = () => {
    return configureStore({
        reducer: {
            token,
            profile,
            todos,
        }
    })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]