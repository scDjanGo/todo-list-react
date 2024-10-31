import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";



import Input from "../UI/input"
import { AUTHAPI } from "../../lib/axios";
import { setToken } from "../../lib/redux/slices/token/tokenSlice";
import { useAppDispatch } from "../../lib/redux/hooks";


export default function Login() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState<boolean>(false);
    const [error, setError] = useState<string>("")

    const handleShowPassword = () => {
        setShow((prev) => !prev);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const formData = Object.fromEntries(new FormData(e.currentTarget));

        AUTHAPI.get(`auth?email=${formData.email}&passport=${formData.passport}`,)
            .then(res => {
                if (res.data) {
                    if (res.data.find((item: any) => item.email === formData.email)) {

                        let obj = res.data.find((item: any) => item.email === formData.email)

                        if (obj.passport === formData.passport) {
                            dispatch(setToken(obj.token))
                            navigate("/");
                        } else {
                            setError("Не правильный эл.почта или пароль");
                        }

                    } else {
                        setError("Не правильный эл.почта или пароль");
                    }
                } else {
                    setError("Не правильный эл.почта или пароль");
                }
            }).catch(() => {
                setError("Не правильный эл.почта или пароль")
            })

    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-[#333333] h-[100vh]">
            <div className="bg-[#ffffff] flex flex-col items-center justify-center gap-[10px] rounded-[24px] pb-12 max-w-[600px] w-full">
                <div className="sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Войти в профиль
                    </h2>
                </div>

                <div className="mt-10 sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Эл.почта
                            </label>
                            <div className="mt-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="">
                            <div className="flex items-center justify-between">
                                <label htmlFor="passport" className="block text-sm/6 font-medium text-gray-900">
                                    Пароль
                                </label>
                            </div>
                            <div className="mt-2 relative">
                                <Input
                                    id="passport"
                                    name="passport"
                                    type={show ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                />

                                <div onClick={handleShowPassword} className="absolute top-[10px] right-[10px] cursor-pointer">
                                    {show ? <img src="/svg/eye.svg" alt="Показать" /> : <img src="/svg/eyeOff.svg" alt="Скрыть" />}
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-[red]">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Войти
                            </button>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <Link to="/auth" className=" text-[blue] font-[200] border-b-[1px] border-[blue]">Регистрация</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
