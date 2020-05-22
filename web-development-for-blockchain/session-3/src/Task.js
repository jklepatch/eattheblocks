import React from 'react';

export default ({ task, markTaskDone, deleteTask }) => {
  return (
  <>
    {task.done ? (
      <span style={{textDecoration: 'line-through'}}>
        {task.description}
      </span>
    ) : task.description}
    <br />
    <div className="btn-group mr-2">
      {task.done ? null : (
        <button type="button" className="btn btn-success" onClick={() => markTaskDone(task.id)}>
          <svg className="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path 
              fillRule="evenodd" 
              d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" 
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <button type="button" className="btn btn-danger" onClick={() => deleteTask(task.id)}>
        <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd"/>
          <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd"/>
        </svg>
      </button>
    </div>
  </>
  );
};
