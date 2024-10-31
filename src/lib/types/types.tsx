
export interface User {
    id: number
    name: string
    token: string
}


export interface ProfileState {
    data: User | null;
    loading: boolean;
    error: string | null;
}


export interface TodoType {
    id: number;
    title?: string
    catId?: number
    description?: string 
}


export interface TodosState {
    value: TodoType[] | null;
    status: "loading" | "succeeded" | "failed";
    error: string | null;
}