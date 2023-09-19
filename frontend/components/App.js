import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
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
        this.fetchAllTodos()
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
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id='todoForm' onSubmit={this.onTodoFormSubmit}>
          <input
            onChange={this.onTodoChange}
            value={this.state.todoNameInput} 
            type='text' 
            placeholder='Type Todo'>
          </input>
          <input type='submit'></input>
        </form>
      </div>
    )
  }
}
