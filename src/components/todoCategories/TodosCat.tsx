import { useParams } from "react-router-dom";
import { useAppSelector } from "../../lib/redux/hooks";
import { TodoType } from "../../lib/types/types";
import { AUTHAPI } from "../../lib/axios";
import { useAppDispatch } from "../../lib/redux/hooks";
import { setInitialItems } from "../../lib/redux/slices/todosSlice/todosSlice";

export default function TodosCat() {
    const dispatch = useAppDispatch()
    const { catId } = useParams();
    const todos = useAppSelector(state => state.todos.value);

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
                {todos?.filter(item => Number(catId) === 2 || Number(item.catId) === Number(catId)).map(item => (
                    <div key={item.id} className={`flex items-center justify-between gap-1 p-3 rounded-[0_12px_0_12px] border duration-200  ${Number(catId) === 2 ? Number(item.catId) === 1 ? "hover:bg-blue-600" : Number(item.catId) === 2 ? "hover:bg-green-600" : Number(item.catId) === 4 ? "hover:bg-red-600" : "hover:bg-yellow-400" :  Number(item.catId) === 4 ? "hover:bg-red-600" : "hover:bg-yellow-400"}`}>
                        <h4 className="text-[#ffffff] text-[18px] font-[600]">{item.title}</h4>

                        <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-1">
                            {Number(catId) !== 4 && Number(item.catId) !== 4 &&
                                <div onClick={() => handleGetTodo(item)} className={`p-1 duration-200 cursor-pointer rounded-[8px] ${Number(catId) === 2 ? Number(item.catId) === 1 ? "hover:bg-blue-600" : Number(item.catId) === 2 ? "hover:bg-green-800" : "hover:bg-yellow-600" : "hover:bg-yellow-600"}`}>
                                    <img className="w-[14px] h-[14px]" src="/svg/check.svg" alt="Complete" />
                                </div>}
                            <div onClick={() => handleDeleteTodo(item.id)} className={`p-1 cursor-pointer rounded-[8px] hover:bg-red-800`}>
                                <img className="w-[14px] h-[14px]" src="/svg/delete.svg" alt="Delete" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
