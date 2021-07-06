// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TodoList is Ownable {
  event NewTodo(uint placeId, string name);
  event UpdateTodoList(address customerAddress, uint placeId);

  struct TodoItem {
    string name;
    string priority;
    bool isDone;
    uint createdAt;
    uint updatedAt;
  }

  struct UpdatedTodoItem {
    string name;
    string priority;
    bool isDone;
  }

  struct TodoListResponse {
    TodoItem[] todoList;
    uint todoListCount;
  }


  TodoItem[]  public  todoList;
  uint todoListCount = 0;

  mapping(uint => address) public todoToOwner;

  function getTodoList() public view returns (TodoListResponse memory) {
    return TodoListResponse(todoList, todoListCount);
  }

  function getTodoListCount() public view returns(uint) {
    return todoListCount;
  }

  function createNewTodo(string memory _name, string memory _priority) public {
    if(todoList.length == todoListCount) {
      todoList.push(TodoItem(_name, _priority, false, block.timestamp, block.timestamp));
    } else {
      todoList[todoListCount] = (TodoItem(_name, _priority, false, block.timestamp, block.timestamp));
    }

    todoListCount++;

    uint id = todoList.length - 1;

    todoToOwner[id] = msg.sender;
    emit NewTodo(id, _name);
  }

  function updateTodoItem(uint _placeId, UpdatedTodoItem memory _updatedTodoItem) public {
    TodoItem storage todoItem = todoList[_placeId];

    todoItem.name = _updatedTodoItem.name;
    todoItem.priority = _updatedTodoItem.priority;
    todoItem.isDone = _updatedTodoItem.isDone;


    emit UpdateTodoList(msg.sender, _placeId);
  }

  function removeTodo(uint _todoId) public {
      todoList[_todoId] = todoList[todoList.length - 1];
      delete todoList[todoList.length - 1];
      todoListCount = todoListCount - 1;
  }
}
