import React, { useState } from 'react';
import { BsPlus, BsCheck, BsTrash, BsCircle, BsCheckCircle } from 'react-icons/bs';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Build an awesome portfolio', completed: true },
    { id: 2, text: 'Create interactive project demos', completed: false },
    { id: 3, text: 'Learn new technologies', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Todo App</h2>
        <p className="text-blue-100">
          {completedCount} of {totalCount} tasks completed
        </p>
        <div className="w-full bg-blue-400/30 rounded-full h-2 mt-3">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
          ></div>
        </div>
      </div>

      {/* Add Todo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <BsPlus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <BsCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No tasks yet. Add one above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                todo.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`text-xl transition-colors ${
                  todo.completed
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {todo.completed ? <BsCheckCircle /> : <BsCircle />}
              </button>
              
              <span
                className={`flex-1 transition-all duration-200 ${
                  todo.completed
                    ? 'text-green-700 dark:text-green-300 line-through opacity-75'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {todo.text}
              </span>
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600 transition-colors p-1"
              >
                <BsTrash className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {todos.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {todos.filter(todo => !todo.completed).length} remaining
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoApp;