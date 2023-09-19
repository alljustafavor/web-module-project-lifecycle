import React from 'react'
import axios from 'axios';

import Form from './Form';

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
        <div id='todos'>
          <h2>Todos:</h2>
          {
              this.state.todos.reduce((acc, td) => {
                if (this.state.displayCompleted || !td.completed) return acc.concat(
                  <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? "  ✔" : ""}</div>
                )
                return acc
              }, [])
            // return <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? "  ✔" : ""}</div>
          }
        </div>
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
