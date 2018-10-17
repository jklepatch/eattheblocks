import React from 'react';
import { formatDate } from '../lib/utils'

class Task extends React.Component {
  constructor() {
    super()
    this.state = { dataKey: null }
  }

  toggleDone(bool) {
    
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
          <td>{String(tuple[4])}</td>
          <td><input
            type="checkbox"
            checked={tuple(5)}
            onChange={()=>console.log('c')}
          /></td>
          <td>{formatDate(tuple[5])}</td>
        </tr>
      )
    } catch (e) {
      console.log(e)
      task = <div/>
    }
    return task
  }
}

export default Task;