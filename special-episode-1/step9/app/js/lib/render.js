import { formatDate } from './utils';

const renderTasks = ($tasks, tasks = []) => {
  if(tasks.length == 0) {
    $tasks.html('<tr><td scope="row">No task created yet...</td></tr>');
    return;
  }

  const html = tasks.map((task) => {
    return(`<tr>
      <td>${task[0]}</td>
      <td>${formatDate(task[1])}</td>
      <td>${task[2]}</td>
      <td>${task[3]}</td>
      <td><input type="checkbox" id="checkbox-${task[0]}" ${task[4] ? 'checked' : ''}/></td>
      <td>${task[5] ? formatDate(task[5]) : ''}</td>
     </tr>`);
   });
  $tasks.html(html.join(''));
};

export {
  renderTasks
}
