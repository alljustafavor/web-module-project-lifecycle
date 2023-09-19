import React from 'react'
import axios from 'axios';

import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
      displayCompleted: true,
    }
  }

  resetForm = () => {
    this.setState({
      ...this.state,
      todoNameInput: ''
    })
  }

  errorResponse = err => {
    this.setState({
      ...this.state,
      error: err.response.data.message
    })
  }



  onTodoChange = evt => {
    const { value } = evt.target
    this.setState({
      ...this.state,
      todoNameInput: value
    })
  } 

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(res.data.data)
        })
        this.resetForm()
      })
      .catch(this.errorResponse)
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state,
          todos: res.data.data
        })
        })
        .catch(this.errorResponse)
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ 
          ...this.state,
          todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(this.errorResponse)
  }

  toggleDisplayCompletes = () => {
    this.setState({
      ...this.state,
      displayCompleted: !this.state.displayCompleted
    })
  }

  componentDidMount() {
    console.log('CDM')
    //get todos
    this.fetchAllTodos()
  }

  render() {
    console.log('Render Ran')
    return (
      <div className='App'>
        <div id='error'>{this.state.error}</div>
        <TodoList 
          toggleCompleted={this.toggleCompleted}
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
        />
        <Form 
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoChange={this.onTodoChange}
          toggleDisplayCompletes={this.toggleDisplayCompletes}
          todoNameInput={this.state.todoNameInput}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}
