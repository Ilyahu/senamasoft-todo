import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../api/todosApi';


export const useDeleteTodo = (id: string) => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['todos']})
    },
  })

  return {mutate}
} 