import * as React from 'react';
import Contract from 'web3-eth-contract';

interface NewTaskProps {
  createTask: (content: string, author: string) => Promise<Contract.Contract>
};

class NewTask extends React.Component<NewTaskProps> {
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    this.props.createTask(
      (target.elements[0] as HTMLInputElement).value,
      (target.elements[1] as HTMLInputElement).value
    );
  }

  render() {
    return (
      <div className="card">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="orange">Create Task</h2>
          </div>
        </div>
        <div className="row">
          <form id="new-task" className="col-sm-12" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="task-content">Content</label>
              <input id="task-content" type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label htmlFor="task-author">Author</label>
                <input id="task-author" type="text" className="form-control"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewTask;
