import React, { useState } from 'react';

export default ({ createTask }) => {
  const [description, setDescription] = useState(undefined);

  const handleSubmit = e => {
    e.preventDefault();
    createTask(description);
  }

  return (
    <div>
      <h2>New task</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
