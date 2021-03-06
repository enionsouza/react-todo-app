import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import About from '../pages/About';
import NotMatch from '../pages/NotMatch';
import Navbar from './Navbar';

const TodoContainer = () => {
  const initialValue = [
    {
      id: uuidv4(),
      title: 'First sample',
      completed: false,
    },
  ];
  const [todos, setTodos] = useState(
    localStorage.todos ? JSON.parse(localStorage.todos) : initialValue,
  );

  const updateLocalStorage = () => {
    localStorage.todos = JSON.stringify(todos);
  };
  updateLocalStorage();

  const handleChange = (id) => {
    setTodos((prevState) => prevState.map(
      (todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      },
    ));
    updateLocalStorage();
  };

  const delTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => todo.id !== id),
    ]);
    updateLocalStorage();
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    updateLocalStorage();
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: updatedTitle,
          };
        }
        return todo;
      }),
    );
    updateLocalStorage();
  };

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div className="container">
            <div className="inner">
              <Header />
              <InputTodo addTodoProps={addTodoItem} />
              <TodosList
                todos={todos}
                handleChangeProps={handleChange}
                deleteTodoProps={delTodo}
                setUpdate={setUpdate}
              />
            </div>
          </div>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotMatch />
        </Route>
      </Switch>
    </>
  );
};

export default TodoContainer;
