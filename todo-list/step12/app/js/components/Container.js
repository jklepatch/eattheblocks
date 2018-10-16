import React from 'react';
import Header from './Header'
import NewTask from './NewTask'
import Tasks from './Tasks'

export default (props) => (
  <div>
    <Header/>
    <NewTask {...props}/>
    <Tasks {...props}/>
  </div>
)