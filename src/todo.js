import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.mark = this.mark.bind(this);
  }

  delete() {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  }

  mark() {
    const { todo, markTodo } = this.props;
    markTodo(todo.id);
  }

  render() {
    const { todo } = this.props;
    return (
      <li className="item">
        <input type="checkbox" defaultChecked={todo.checked} onClick={this.mark} />
        <span className={`item-name ${todo.checked ? 'checked' : ''}`}>{todo.todo}</span>
        <button type="button" className="delete-btn" onClick={this.delete}>X</button>
      </li>
    );
  }
}

export default Todo;
