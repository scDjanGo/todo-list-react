import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="h-[80%] flex items-center justify-start gap-[15px] overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <NavLink to="2" className={({ isActive }) => (isActive ? "text-[#ffffff] whitespace-nowrap duration-200 border-b-[2px] border-blue-600" : "text-[#ffffff] duration-200 whitespace-nowrap border-b-[2px] border-gray-400")}>Все задачи</NavLink>
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-[#ffffff] whitespace-nowrap duration-200 border-b-[2px] border-green-600" : "text-[#ffffff] duration-200 whitespace-nowrap border-b-[2px] border-gray-400")}>Текущие задачи</NavLink>
            <NavLink to={"3"} className={({ isActive }) => (isActive ? "text-[#ffffff] whitespace-nowrap duration-200 border-b-[2px] border-yellow-400" : "text-[#ffffff] duration-200 whitespace-nowrap border-b-[2px] border-gray-400")}>Выполненные задачи</NavLink>
            <NavLink to={"4"} className={({ isActive }) => (isActive ? "text-[#ffffff] whitespace-nowrap duration-200 border-b-[2px] border-red-600" : "text-[#ffffff] duration-200 whitespace-nowrap border-b-[2px] border-gray-400")}>Корзина</NavLink>
        </nav>
    )
}
