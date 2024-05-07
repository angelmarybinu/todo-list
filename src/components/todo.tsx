
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './todo.css';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    toggleTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

interface NewTodoFormProps {
    onSubmit: (title: string) => void;
}

function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
    return (
        <ul className="list">
            {todos.length === 0 && <li>No Todos</li>}
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    {...todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
}

function TodoItem({ id, title, completed, toggleTodo, deleteTodo }: Todo) {
    return (
        <li className={`todo-item ${completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleTodo(id, !completed)}
            />
            <span>{title}</span>
            <button onClick={() => deleteTodo(id)}>Delete</button>
        </li>
    );
}

function NewTodoForm({ onSubmit }: NewTodoFormProps) {
    const [newItem, setNewItem] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newItem === '') return;

        onSubmit(newItem);
        setNewItem('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New Item</label>
                <input
                    value={newItem}
                    onChange={handleChange}
                    type="text"
                    id="item"
                />
            </div>
            <button type="submit" className="btn">Add</button>
        </form>
    );
}

function TodoApp() {
    const navigate = useNavigate();
    const username = localStorage.getItem('loggedInUser');
    const [todos, setTodos] = useState<Todo[]>(() => {
        const localValue = localStorage.getItem('ITEMS');
        if (localValue === null) return [];
        return JSON.parse(localValue);
    });
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        if (!username) {
            console.log("error")
        }
    }, [navigate, username]);

    useEffect(() => {
        if (username) {
            localStorage.setItem('ITEMS', JSON.stringify(todos));
        }
    }, [todos, username]);

    const addTodo = (title: string) => {
        const newTodo: Todo = { id: uuidv4(), title, completed: false,toggleTodo: (id: string, completed: boolean) => toggleTodo(id, completed),
            deleteTodo: (id: string) => deleteTodo(id) };
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    const toggleTodo = (id: string, completed: boolean) => {
        setTodos(prevTodos =>
            prevTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo))
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo(newItem);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="new-item-form">
                <div className="form-row">
                    <label htmlFor="item">New Item</label>
                    <input
                        value={newItem}
                        onChange={handleChange}
                        type="text"
                        id="item"
                    />
                </div>
                <button type="submit" className="btn">Add</button>
            </form>
            <h1 className="header">My List</h1>
            <TodoList 
                todos={todos} 
                toggleTodo={toggleTodo} 
                deleteTodo={deleteTodo} 
            />
        </>
    );
}

export default TodoApp;
