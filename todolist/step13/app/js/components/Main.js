import React, { Component } from 'react';
import NewTask from './NewTask';
import Tasks from './Tasks';

class Main extends Component {
  render() {
    const { tasks, createTask, toggleDone } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <NewTask createTask={createTask} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Tasks tasks={tasks} toggleDone={toggleDone} />
          </div>
        </div>
      </div>
    );
  }
};

export default Main;
