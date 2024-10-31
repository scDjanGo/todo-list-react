import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


import Input from "../UI/input";
import { AUTHAPI } from "../../lib/axios";
import { setToken } from "../../lib/redux/slices/token/tokenSlice";
import { useAppDispatch } from "../../lib/redux/hooks";

export default function Auth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const handleShowPassword1 = () => {
    setShowPassword1((prev) => !prev);
  };

  const handleShowPassword2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    if (formData.passport !== formData.repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    delete formData.repeatPassword

    AUTHAPI.post(`auth/`, formData)
      .then((res) => {
        dispatch(setToken(res.data.token))
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError("Произошла ошибка при авторизации");
      });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    if (e.target.value !== password) {
      setError("Пароли не совпадают");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-[#333333] h-[100vh]">
      <div className="bg-[#ffffff] flex flex-col items-center justify-center gap-[10px] rounded-[24px] pb-12 max-w-[600px] w-full">
        <div className="sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Регистрация
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

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="passport" className="block text-sm/6 font-medium text-gray-900">
                  Пароль
                </label>
              </div>
              <div className="mt-2 relative">
                <Input
                  id="passport"
                  name="passport"
                  type={showPassword1 ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div onClick={handleShowPassword1} className="absolute top-[10px] right-[10px] cursor-pointer">
                  {showPassword1 ? <img src="/svg/eye.svg" alt="Показать" /> : <img src="/svg/eyeOff.svg" alt="Скрыть" />}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="repeatPassword" className="block text-sm/6 font-medium text-gray-900">
                  Повторить пароль
                </label>
              </div>
              <div className="mt-2 relative">
                <Input
                  id="repeatPassword"
                  name="repeatPassword"
                  type={showPassword2 ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                />
                <div onClick={handleShowPassword2} className="absolute top-[10px] right-[10px] cursor-pointer">
                  {showPassword2 ? <img src="/svg/eye.svg" alt="Показать" /> : <img src="/svg/eyeOff.svg" alt="Скрыть" />}
                </div>
              </div>
            </div>

            {error && <p className="text-[red]">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Регистрация
              </button>
            </div>


            <div className="w-full flex items-center justify-center">
              <Link to="/login" className=" text-[blue] font-[200] border-b-[1px] border-[blue]">Войти</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
