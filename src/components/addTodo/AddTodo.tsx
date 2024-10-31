import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../UI/input"
import { AUTHAPI } from "../../lib/axios";



export default function AddTodo() {
    const navigate = useNavigate()
    const [error, setError] = useState<string>("")

    useEffect(() => {

    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const formData = Object.fromEntries(new FormData(e.currentTarget));
        

        AUTHAPI.post(`todo/`, formData)
            .then(() => {
                navigate(-1)
                
            }).catch(() => {
                setError("Не правильный эл.почта или пароль")
            })

    };

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-[#333333] h-[100vh]">
            <div className="bg-[#ffffff] flex flex-col items-center justify-center gap-[10px] rounded-[24px] pb-12 max-w-[600px] w-full relative">
                <div onClick={handleBack} className="p-[4px] rounded-[8px] absolute duration-200 cursor-pointer top-[4px] left-[14px] hover:bg-indigo-600">
                    <img className="w-[32px]" src="/svg/back.svg" alt="*" />
                </div>

                <div className="mt-10 sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                Название
                            </label>
                            <div className="mt-2">
                                <Input
                                    id="title"
                                    name="title"
                                    type="title"
                                    required
                                    autoComplete="title"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                Описание
                            </label>
                            <div className="mt-2">
                                <Input
                                    id="description"
                                    name="description"
                                    type="description"
                                    autoComplete="description"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="catId" className="block text-sm/6 font-medium text-gray-900">
                                Категория
                            </label>
                            <div className="mt-2">
                                <select name="catId" id="catId" className="px-[10px] cursor-pointer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                    <option value="1">Все</option>
                                    <option value="2">Текущее</option>
                                    <option value="3">Выполнено</option>
                                </select>
                            </div>
                        </div>
                        {error && <p className="text-[red]">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Добавить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
