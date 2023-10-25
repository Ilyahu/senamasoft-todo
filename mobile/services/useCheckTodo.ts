import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkTodo } from '../api/todosApi';

export const useCheckTodo = (id:string) => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: () => checkTodo(id),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['todos']})
    },
  })

  return {mutate}
} 