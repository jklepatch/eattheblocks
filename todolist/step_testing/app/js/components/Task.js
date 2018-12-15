import React from 'react';
import { formatDate } from '../lib/utils'

class Task extends React.Component {
  constructor() {
    super()
    this.state = { dataKey: null }
    this.toggleDone = this.toggleDone.bind(this)
  }

  toggleDone(e) {
    const { target: { name } } = e
    const { drizzle, drizzleState: { accounts } } = this.props

    drizzle.contracts.ToDo.methods.toggleDone.cacheSend(name, { from: accounts[0], gas: '5000000' })
  }

  componentDidMount() {
    const { drizzle, tid } = this.props
    const dataKey = drizzle.contracts.ToDo.methods.getTask.cacheCall(tid)
    this.setState({ dataKey })
  }

  render() {
    const { drizzleState } = this.props
    let task
    try {
      const tuple = drizzleState.contracts.ToDo.getTask[this.state.dataKey].value
      task = (
        <tr>
          <td>{tuple[0]}</td>
          <td>{formatDate(tuple[1])}</td>
          <td>{tuple[2]}</td>
          <td>{tuple[3]}</td>
          <td>
            <input
              name={tuple[0]}
              type="checkbox"
              checked={tuple[4]}
              onChange={this.toggleDone}
            />
          </td>
          <td>{formatDate(tuple[5])}</td>
        </tr>
      )
    } catch (e) {
      task = <tr/>
    }
    return task
  }
}

export default Task;