const getAccount = (web3) => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, accounts) => {
      if(typeof error === null) {
        return reject(error);
      } 
      resolve(accounts[0]);
    });
  });
}

const getTasks = (todo) => {
  return new Promise((resolve, reject) => {
    todo.getTaskIds()
    .then((taskIds) => {
      const promises = [];
      taskIds.forEach((taskId) => {
        promises.push(todo.getTask(taskId));
      });
      return Promise.all(promises);
    })
    .then((tasks) => {
      resolve(tasks);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export { 
  getAccount,
  getTasks
};
