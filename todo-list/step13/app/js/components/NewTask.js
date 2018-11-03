import React from 'react';

class NewTask extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: ''
    }
    this.onInput = this.onInput.bind(this)
    this.onsubmit = this.onsubmit.bind(this)
  }

  onInput(e, fieldName) {
    this.setState({ ...this.state, [fieldName]: e.target.value })
  }

  onsubmit(e) {
    e.preventDefault()
    const { drizzle, drizzleState: { accounts } } = this.props.drizzleContext
    const { content, author } = this.state

    drizzle.contracts.ToDo.methods.createTask
      .cacheSend(content, author, { from: accounts[0], gas: '5000000' })

    this.setState({ content: '', author: '' })
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
          <form id="new-task" class="col-sm-12" onSubmit={this.onsubmit}>
            <div class="form-group">
              <label for="task-content">Content</label>
              <input
                id="task-content"
                type="text"
                class="form-control"
                onChange={e => this.onInput(e, 'content')}
                value={this.state.content}
              ></input>
            </div>
            <div class="form-group">
              <label for="task-author">Author</label>
              <input
                id="task-author"
                type="text"
                class="form-control"
                onChange={e => this.onInput(e, 'author')}
                value={this.state.author}
              ></input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewTask;