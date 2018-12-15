import React from 'react';

const Tasks = () => (
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

export default Tasks;