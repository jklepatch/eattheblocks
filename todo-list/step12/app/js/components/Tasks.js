import React from 'react';
import Task from './Task';

class Tasks extends React.Component {
  constructor() {
    super()
    this.state = { dataKey: null }
  }

  componentDidMount() {
    const { initialized, drizzle } = this.props.drizzleContext
    if (initialized) {
      const dataKey = drizzle.contracts.ToDo.methods.getTaskIds.cacheCall()
      this.setState({ dataKey })
    }
  }

  render() {
    const { drizzleState, drizzle } = this.props.drizzleContext

    let tasks
    try {
      tasks = drizzleState.contracts.ToDo.getTaskIds[this.state.dataKey].value
        .map(tid =><Task tid={tid} drizzle={drizzle} drizzleState={drizzleState}/>)
    } catch (e) {
      tasks = []
    }

    return (
      <div class="card">
        <div class="row">
          <div class="col-sm-12">
            <h2 class="orange">Tasks</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Content</th>
                  <th>Author</th>
                  <th>Done</th>
                  <th>Date Complete</th>
                </tr>
              </thead>
              <tbody id="tasks">
                {tasks}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Tasks;