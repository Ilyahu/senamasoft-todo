import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

export const createTodo = async (req, res, next) => {
  const newTodo = new Todo(req.body)
  try {
    const savedTodo = await newTodo.save()
    res.status(200).json(savedTodo)
  } catch (error) {
    next(error)
  }
}

export const toggleTodo = async(req, res, next) => {
  try {
    const todoRef = await Todo.findById(req.params.id);
    const updatedTodo = await Todo.findOneAndUpdate({_id: req.params.id}, {checked: !todoRef.checked})
    res.status(200).json(updatedTodo)
  } catch (error) {
    next(error)
  }
}

export const updateTodo = async(req, res, next) => {
  try {
    await Todo.findOneAndUpdate({ _id: req.params.id },{ title: req.body.updatedText })
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
} catch (error) {
    next(error)
}
}

export const deleteTodo = async(req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id)
    res.status(200).send("Task has been deleted")
  } catch (error) {
    next(error)
  }
}

export const getTodos = async(req, res, next) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
}

export default router