import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View } from 'react-native'
import { useCheckTodo } from "../services/useCheckTodo"
import { useDeleteTodo } from "../services/useDeleteTodo"
import { Todo } from './Todo'
import { IconButton } from 'react-native-paper'

type TodoItemProps = {
  todo: Todo,
  handleEditTodo: (todo: Todo) => void
}
const TodoItem = ({todo, handleEditTodo}: TodoItemProps) => {
  const {title, _id, checked} = todo
    
  const {mutate: toggle} = useCheckTodo(_id)
  const {mutate: deleteTodo} = useDeleteTodo(_id)

  return (
    <View style={styles.todoItem}>
      <Checkbox
      value={checked}
      style={{margin: 10}}
      onValueChange={() => toggle()}
      />

      <Text style={styles.todoItemText}>
        {title}
      </Text>

      <IconButton
        icon="pencil"
        iconColor="#000000"
        onPress={() => handleEditTodo(todo)}
      />
      
      <IconButton
        icon="trash-can"
        iconColor="#000000"
        onPress={() => deleteTodo()}
      />
  </View>
  )
}

export default TodoItem

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  todoItemText: { 
    color: "#000000",
    fontSize: 20,
    fontWeight: "800",
    flex: 1
  }
})