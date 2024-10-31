import { useAppSelector } from "../../lib/redux/hooks"

import { TodoType } from "../../lib/types/types";
import { AUTHAPI } from "../../lib/axios";
import { useAppDispatch } from "../../lib/redux/hooks";
import { setInitialItems } from "../../lib/redux/slices/todosSlice/todosSlice";

export default function CurrentTodo() {
    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todos.value)


    const handleGetTodo = (todo: TodoType) => {

        AUTHAPI.put(`/todo/${todo.id}/`, { ...todo, catId: Number(todo.catId) + 1 })
            .then(res => {
                dispatch(setInitialItems(todos?.map(item => item.id === todo.id ? res.data : item) || []))
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDeleteTodo = (id: number) => {
        AUTHAPI.delete(`/todo/${id}/`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            dispatch(setInitialItems(todos?.filter(item => item.id !== id) || []))
        }).catch(err => console.error(err));
    };
    return (
        <div className="mt-[24px]">
            <div className="w-full flex flex-col gap-[15px]">
                {todos?.filter(item => item.catId == 2).map((item, index) =>
                    <div key={index} className={`flex items-center justify-between gap-[5px] p-[10px_15px] rounded-[0_12px_0_12px] border-[1px] duration-200 hover:bg-green-600`}>
                        <h4 className="text-[#ffffff] text-[18px] font-[600]">{item.title}</h4>

                        <div className="flex items-center gap-[5px]">
                            <div onClick={() => handleGetTodo(item)} className={`duration-200 p-[4px] cursor-pointer rounded-[8px] hover:bg-green-800`}>
                                <img className="w-[14px] h-[14px]" src="/svg/check.svg" alt="*" />
                            </div>
                            <div onClick={() => handleDeleteTodo(item.id)} className={`p-[4px] cursor-pointer rounded-[8px] hover:bg-red-600`}>
                                <img className="w-[14px] h-[14px]" src="/svg/delete.svg" alt="*" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
