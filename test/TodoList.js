const {assert} = require("chai");
const truffleAssert = require('truffle-assertions');

const TodoList = artifacts.require('TodoList');

contract('TodoList', accounts => {
    const [acc1] = accounts;

    it('should initialize with empty tod list', async () => {
        const instance = await TodoList.new();
        const todoListCount = await instance.getTodoListCount();

        assert(todoListCount.toNumber() === 0);
    })

    it('should be create new todo item', async () => {
        const name = "Buy new car";

        const instance = await TodoList.new();

        let result = await instance.createNewTodo(name, 'high');

        truffleAssert.eventEmitted(result, 'NewTodo', (ev) => {
            return ev.placeId.toNumber() === 0 && ev.name.toString() === name;
        });

        const todoListCount = await instance.getTodoListCount();
        const todoItem = await instance.todoList.call(0);
        const owner = await instance.todoToOwner.call(0);

        assert(todoListCount.toNumber() === 1);
        assert(!!todoItem === true);
        assert(todoItem.name === name);
        assert(owner === acc1);
    })

    it('should delete items', async () => {
        const name1 = "New todo 1";
        const name2 = "New todo 2";

        const instance = await TodoList.new();

        await instance.createNewTodo(name1, 'high');
        await instance.createNewTodo(name2, 'high');

        await instance.removeTodo(0);
        let todoListCount = await instance.getTodoListCount();
        assert(todoListCount.toNumber() === 1);

        await instance.removeTodo(0);
        todoListCount = await instance.getTodoListCount();
        assert(todoListCount.toNumber() === 0);
    })

    it('should update items', async () => {
        const name = "Buy new car";

        const instance = await TodoList.new();

        await instance.createNewTodo(name, 'high');

        const updatedTodoItem = {
            name: 'test',
            priority: 'high',
            isDone: false
        }

        await instance.updateTodoItem(0, updatedTodoItem);

        const todoItem = await instance.todoList.call(0);

        assert(todoItem.name === updatedTodoItem.name);
        assert(todoItem.priority === updatedTodoItem.priority);
        assert(todoItem.isDone === updatedTodoItem.isDone);
    })
})
