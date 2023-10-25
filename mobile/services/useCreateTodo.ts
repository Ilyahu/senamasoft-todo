import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../api/todosApi';
import { Todo } from '../components/Todo';


export const useCreateTodo = () => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      client.setQueriesData<Todo[]>({queryKey: ['todos']}, (oldTodos) => {
        return [...(oldTodos || []), newTodo]
      })
      client.invalidateQueries({queryKey: ['todos'], refetchType: 'none'})
    },
  })

  return {mutate}
} 