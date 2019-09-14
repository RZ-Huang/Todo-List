import React, { Component } from 'react';
import Todo from './todo.js';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
      todoText: '',
    };
    this.id = 1;

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.markTodo = this.markTodo.bind(this);
  }

  componentDidMount() {
    const todoData = window.localStorage.getItem('todoapp');
    if (todoData) {
      const prevItemList = JSON.parse(todoData);

      this.setState({
        itemsList: prevItemList,
      });
      if (prevItemList[prevItemList.length - 1] !== undefined) {
        this.id = prevItemList[prevItemList.length - 1].id + 1;
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { itemsList } = this.state;
    if (prevState.itemsList !== itemsList) {
      window.localStorage.setItem('todoapp', JSON.stringify(itemsList));
    }
  }

  handleChange(e) {
    this.setState({
      todoText: e.target.value,
    });
  }

  addTodo() {
    const { todoText, itemsList } = this.state;
    this.setState({
      itemsList: [...itemsList, {
        id: this.id,
        checked: false,
        todo: todoText,
      }],
      todoText: '',
    });
    this.id += 1;
  }

  deleteTodo(id) {
    const { itemsList } = this.state;
    this.setState({
      itemsList: itemsList.filter(todo => todo.id !== id),
    });
  }

  markTodo(id) {
    const { itemsList } = this.state;
    this.setState({
      itemsList: itemsList.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          checked: !todo.checked,
        };
      }),
    });
  }

  render() {
    const { itemsList, todoText } = this.state;
    return (
      <div>
        <nav id="Home" className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#Home">Todo List</a>
        </nav>
        <main>
          <div className="create-item">
            <input type="text" name="input-item" id="input-item" value={todoText} onChange={this.handleChange} placeholder="請輸入項目名稱" />
            <button type="button" className="add-btn btn btn-primary btn-sm" onClick={this.addTodo}>Add</button>
          </div>
          <div className="Todo-items">
            <ul>
              {itemsList.map(
                todo => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    deleteTodo={this.deleteTodo}
                    markTodo={this.markTodo}
                  />
                ),
              )}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
