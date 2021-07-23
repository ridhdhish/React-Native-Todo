import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import styles from "./Style";

import { AntDesign } from "@expo/vector-icons";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodoHandler = () => {
    const newTodos = [...todos];
    newTodos.push({ title: newTodo, completed: false });
    setTodos(newTodos);
    setNewTodo("");
  };

  const updateTodoHandler = (index) => {
    const newTodos = [...todos];
    const todo = newTodos[index];
    todo.completed = !todo.completed;
    newTodos[index] = todo;
    setTodos(newTodos);
  };

  return (
    <View>
      <View>
        <View style={styles.Container}>
          <TextInput
            value={newTodo}
            style={styles.TextBox}
            onChangeText={(text) => {
              setNewTodo(text);
            }}
            placeholder="Enter Todo"
          />
          <TouchableOpacity
            onPress={() => {
              if (newTodo !== "") addTodoHandler();
            }}
          >
            <AntDesign name="pluscircle" size={45} color="#4d70eb" />
          </TouchableOpacity>
        </View>

        <>
          {todos.length === 0 ? (
            <Text>No Todos are created yet!</Text>
          ) : (
            todos.map((todo, index) => {
              return (
                <View key={index} style={styles.Todo}>
                  <Checkbox
                    style={{ width: 35, height: 35 }}
                    value={todo.completed}
                    onValueChange={() => {
                      updateTodoHandler(index);
                    }}
                  />
                  <Text
                    style={
                      todo.completed
                        ? {
                            textDecorationLine: "line-through",
                            fontSize: 18,
                            textDecorationStyle: "solid",
                          }
                        : { fontSize: 18 }
                    }
                  >
                    {todo.title}
                  </Text>
                </View>
              );
            })
          )}
        </>
      </View>
    </View>
  );
}
