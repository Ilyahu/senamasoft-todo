import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../api/todosApi';

export const useUpdateTodo = (title: string, id:string ) => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: () => updateTodo(title, id),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['todos']})
    },
  })

  return {mutate}
} 