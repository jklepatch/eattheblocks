import React from 'react';

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
    const { drizzleState } = this.props.drizzleContext
    try{
      console.log(drizzleState.contracts.ToDo.getTaskIds[this.state.dataKey].value)
    } catch (e) { console.log(e)}

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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Tasks;