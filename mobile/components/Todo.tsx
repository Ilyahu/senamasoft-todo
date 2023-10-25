import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTodos } from "../services/useTodos";
import { useCreateTodo } from "../services/useCreateTodo";
import { useQueryClient } from "@tanstack/react-query";
import TodoItem from "./TodoItem";
import axios from "axios"

export type Todo = {
  title: string,
  checked: boolean,
  _id: string,
  handleEditTodo: () => void
}

const url = 'http://192.168.0.104:3000/api/todos/'

const Todo = () => {
  const {data: todos, isLoading, error} = useTodos()
  const {mutate: create} = useCreateTodo()
  const queryClient = useQueryClient()
  const [todo, setTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);

  const handleAddTodo = () => {
    if (todo === "") {
      return;
    }
    create(todo)
    setTodo("");
  };

  const handleEditTodo = (todo: Todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };
  
  const handleUpdateTodo = () => {
    axios.put(`${url}/update/${editedTodo?._id}`, {updatedText: todo})
    .then(res => {
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      }
    })

    setEditedTodo(null)
    setTodo("");
  };

  const renderTodos = ({item} : {item: Todo}) => {
    return (
      <TodoItem handleEditTodo={handleEditTodo} todo={item}/>
    );
  };

  if (error) {
    return <Text style={{marginLeft: 40, marginTop: 60}}>{error.message}</Text>
  }

  if (isLoading) {
    return <Text style={{marginLeft: 40, marginTop: 60}}>LOADING...</Text>
  }

  return (
    <View style={{ marginHorizontal: 16, marginTop: 40 }}>
      <TextInput
        style={styles.textInput}
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      {editedTodo ? (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleUpdateTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={todos}
        renderItem={renderTodos}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: "#000000",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  saveButton: {
    backgroundColor: "#00887a",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  }
});