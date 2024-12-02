import React, { useState, useEffect } from 'react';
import { database } from '../Firebase';
import { ref, onValue, update, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { FaTrashAlt } from 'react-icons/fa';

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const user = getAuth().currentUser;
  const userId = user?.uid;
  const todoRef = ref(database, `users/${userId}/todos`);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onValue(todoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todoList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTodos(todoList);
      } else {
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, [userId, todoRef]);

  const handleAddTodo = () => {
    if (newTodo) {
      const newTodoItem = {
        text: newTodo,
        completed: false,
        timestamp: Date.now(),
      };

      update(todoRef, {
        [Date.now()]: newTodoItem,
      })
        .then(() => {
          setNewTodo('');
        })
        .catch((error) => {
          console.error('Error adding todo:', error);
        });
    }
  };

  const handleToggleComplete = (id, completed) => {
    const todoItemRef = ref(database, `users/${userId}/todos/${id}`);
    update(todoItemRef, {
      completed: !completed,
    });
  };

  const handleDeleteTodo = (id) => {
    const todoItemRef = ref(database, `users/${userId}/todos/${id}`);
    remove(todoItemRef).catch((error) => console.error('Error deleting todo:', error));
  };

  return (
    <div className="w-full h-full bg-white/10 p-4 rounded-lg shadow-md grid grid-rows-[auto,1fr]">
      {/* Group title and input */}
      <div>
        <p className="text-white text-base font-semibold text-center">Add Todo</p>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="w-full p-2 border border-gray-300 bg-white/10 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleAddTodo}
            className="w-32 p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Add 
          </button>
        </div>
      </div>

      {/* Bottom Part: Task List */}
      <div className="overflow-y-auto max-h-[calc(100vh-150px)] mt-4">
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id, todo.completed)}
                    className="w-5 h-5 bg-white/10 border-2 border-gray-300 rounded-md focus:outline-none"
                  />
                  <span
                    className={`flex-1 ${todo.completed ? 'line-through text-gray-300' : ''}`}
                  >
                    {todo.text}
                  </span>
                </div>
                {!todo.completed && (
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 text-center">No todos added</p>
        )}
      </div>
    </div>
  );
};

export default ToDo;
