import { useEffect, Suspense } from "react"
import { useNavigate } from "react-router-dom"

import { Outlet } from "react-router-dom"
import Main_Header from "./main/header"

import { useAppDispatch, useAppSelector } from "../lib/redux/hooks"
import { fetchTodosSlice } from "../lib/redux/slices/todosSlice/todosSlice"

import Navbar from "./navbar/navbar"

export default function layout() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const token = useAppSelector(state => state.token.token)

    useEffect(() => {
        if (!token) navigate("/login")
        dispatch(fetchTodosSlice())
    }, [token])



    return (
        <div className="bg-[#333333] h-[100dvh] px-[15px] pt-[15px] flex justify-center relative">
            <div className="max-w-[650px] w-full">
                <Main_Header />

                <div className="p-[15px_30px] mt-[15px] bg-gray-400 rounded-[16px]">
                    <Navbar />
                    <Suspense fallback={<div>Loading...</div>}>
                        <div className="overflow-y-auto h-[500px] 1240:h-[400px]" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                            <Outlet />
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
