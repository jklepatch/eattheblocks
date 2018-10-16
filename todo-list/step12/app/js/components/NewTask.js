import React from 'react';

class NewTask extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: ''
    }
  }

  onchange(e, fieldName) {
    this.setState({
      ...this.state,
      [fieldName]: e.target.value,
    })
  }

  onsubmit(e) {
    e.preventDefault()
    const { drizzle } = this.props.drizzleContext
    const { content, author } = this.state

    drizzle.contracts.ToDo.methods.createTask.cacheSend(content, author)

    this.setState({
      content: '',
      author: ''
    })
  }

  render() {
    return (
      <div class="card">
        <div class="row">
          <div class="col-sm-12">
            <h2 class="orange">Create Task</h2>
          </div>
        </div>
        <div class="row">
          <form id="new-task" class="col-sm-12">
            <div class="form-group">
              <label for="task-content">Content</label>
              <input
              id="task-content"
              type="text"
              class="form-control"
              onChange={e => onchange(e, 'content')}
              ></input>
            </div>
            <div class="form-group">
              <label for="task-author">Author</label>
              <input id="task-author" type="text" class="form-control"></input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewTask;