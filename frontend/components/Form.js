import React from 'react'

export default class Form extends React.Component {

  render() {
    return (
      <>
        <form id='todoForm' onSubmit={this.props.onTodoFormSubmit}>
          <input
            onChange={this.props.onTodoChange}
            value={this.props.todoNameInput} 
            type='text' 
            placeholder='Type Todo'>
          </input>
          <input type='submit'></input>
        </form>
        <button 
          onClick={this.props.toggleDisplayCompletes}>
          {this.props.displayCompleted ? 'Hide' : 'Show'} Completed
        </button>
      </>
    )
  }
}
