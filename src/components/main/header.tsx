import { useState } from "react"
import { Link } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks"
import { AUTHAPI } from "../../lib/axios"
import { setInitialItems } from "../../lib/redux/slices/todosSlice/todosSlice"
import { TodoType } from "../../lib/types/types"

export default function Main_Header() {
  const dispatch = useAppDispatch()
  const [del, setDel] = useState<boolean>(false)
  const todos = useAppSelector(state => state.todos.value)



  const handleShowModal = () => {
    setDel(prev => !prev)
  }

  const handleDeleteAll = async () => {
    if(!todos) return

    try {
      const deleteRequests = todos.map((todo : TodoType) => AUTHAPI.delete(`todo/${todo.id}/`));
      await Promise.all(deleteRequests);

      dispatch(setInitialItems([]))
    } catch (error) {
      console.error("Ошибка при удалении записей:", error);
    }
  };

  return (
    <div className="p-[30px] flex items-center justify-between gap-[15px] bg-gray-400 rounded-[16px] flex-wrap">
      {del &&
        <div onClick={() => handleShowModal()} className="flex items-center justify-center fixed z-[100] top-0 left-0 w-[100vw] h-[100dvh] p-[15px] bg-[rgb(0,0,0,0.5)]">
          <div onClick={(e) => e.stopPropagation()} className="p-[15px] rounded-[18px] bg-[#ffffff] flex flex-col items-center justify-center gap-[15px]">

            <h2 className="text-center">Вы уверены что хотите удалить все задачи?</h2>


            <div className="flex gap-[15px]">

              <button onClick={handleShowModal} className="text-[24px] font-[600] text-[#ffffff]  p-[5px_10px]   rounded-[6px] bg-blue-600 cursor-pointer hover:bg-blue-800 w-[70px] h-[46px]">
                Нет
              </button>

              <div onClick={() => { handleShowModal(); handleDeleteAll() }} className=" flex items-center justify-center gap-[5px] p-[5px_10px] rounded-[6px] bg-red-600 cursor-pointer hover:bg-red-800 w-[70px] h-[46px]">
                <p className="text-[24px] font-[600] text-[#ffffff]">Да</p>
              </div>

            </div>
          </div>
        </div>
      }


      <Link to={"add-todo"} className="text-[24px] font-[600] text-[#ffffff]  p-[5px_10px]   rounded-[6px] bg-blue-600 cursor-pointer hover:bg-blue-800">
        + Добавить
      </Link>

      <div onClick={handleShowModal} className=" flex items-center justify-center gap-[5px] p-[5px_10px] rounded-[6px] bg-red-600 cursor-pointer hover:bg-red-800">
        <p className="text-[24px] font-[600] text-[#ffffff]">Очистить </p>
        <img className="w-[14px] h-[14px]" src="/svg/delete.svg" alt="*" />
      </div>

    </div>
  )
}
