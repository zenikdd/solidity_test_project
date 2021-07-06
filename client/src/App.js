import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { TODO_CONTRACT_ABI, TODO_CONTRACT_ADDRESS } from './config';

import {InputForm} from "./components/input-form/InputForm";
import {Container} from "@material-ui/core";
import {TodoList} from "./components/todo/TodoList";
import {FilterConstant} from "./common";
import {Filter} from "./components/filter/Filter";

export const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [todos, setTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState([])


    useEffect(() => {
        const fetchBlockchainData = async () => {
            const web3 = new Web3('http://localhost:8545');

            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            const contract = new web3.eth.Contract(TODO_CONTRACT_ABI, TODO_CONTRACT_ADDRESS);

            setContract(contract);
        };

        fetchBlockchainData();
    }, []);

    useEffect(() => {
        fetchTodoList();
    }, [contract]);

    const fetchTodoList = async () => {
        if (!contract) {
            return;
        }

        const {todoList, todoListCount} = await contract.methods.getTodoList().call();

        const mappedTodos = todoList.filter((todo, index) => index < todoListCount).map((todo) => ({
            ...todo,
            createdAt: new Date(parseInt(todo.createdAt) * 1000),
            updatedAt: new Date(parseInt(todo.updatedAt) * 1000) }) )

        setTodos(mappedTodos);
    };


    const addNewTodo = ({name, priority}) => {
        contract.methods.createNewTodo(name, priority).send({from: account, gas: 3000000})
            .then(() => {
                fetchTodoList();
            })
    }

    useEffect(() => {
        setFilteredTodos(todos)
    }, [todos])

    const handleToggle = indexTodoForUpdate => {
        const todoForUpdate = todos[indexTodoForUpdate];
        updateTodo(indexTodoForUpdate, {isDone: !todoForUpdate.isDone})
    }

  const handleDelete = indexTodoForDelete => {
      contract.methods.removeTodo(indexTodoForDelete).send({from: account, gas: 3000000})
          .then(() => setTodos(prev => prev.filter((todo, index) => index !== indexTodoForDelete)))

  }

  const handleEdit = (newName, indexTodoForEdit) => {
      updateTodo(indexTodoForEdit, {name: newName})
  }

  const updateTodo = (todoIndex, updatedTodoFields) => {
      const todoForUpdate = todos[todoIndex];

      const updatedTodo = {
          name: todoForUpdate.name,
          priority: todoForUpdate.priority,
          isDone: todoForUpdate.isDone,
          ...updatedTodoFields
      }

      contract.methods.updateTodoItem(todoIndex, updatedTodo).send({from: account, gas: 3000000})
          .then(() =>
              setTodos(prev => prev.map((todo, index) => {
                  if (index !== todoIndex) return todo
                  return {...todo, ...updatedTodo}
              }))
          )
  }

  const handleChange = selector => {
      switch (selector) {
          case FilterConstant.ALL: setFilteredTodos(todos)
              break;
          case FilterConstant.COMPLETED: setFilteredTodos(todos.filter(item => item.isDone))
              break;
          case FilterConstant.UNCOMPLETED: setFilteredTodos(todos.filter(item => !item.isDone))
              break;

      }
  }

  return (
          <Container maxWidth="sm">
              <h1>Todo list</h1>
              <InputForm
                  onAdd = {addNewTodo}
              />
              <Filter
                  handleChange = {handleChange}
              />
              {todos && filteredTodos.length?   <TodoList
                  handleToggle = {handleToggle}
                  handleDelete = {handleDelete}
                  handleSave = {handleEdit}
                  todos = {filteredTodos}
              /> : <h3 className="text-center">No todos</h3> }
          </Container>
  );
};
