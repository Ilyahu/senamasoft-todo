import {useQuery} from "@tanstack/react-query"
import { getTodos } from "../api/todosApi"

export const useTodos = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    retry: false,
  })
  
  return {data, isLoading, error}
}