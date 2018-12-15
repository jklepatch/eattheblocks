const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledTodo = require('../build/contracts/ToDo');

let accounts
before(async () =>  accounts = await web3.eth.getAccounts());

let todo;
beforeEach(async () => {
  todo = await new web3.eth.Contract(compiledTodo.abi)
    .deploy({ data: compiledTodo.bytecode })
    .send({ from: accounts[0], gas: '1000000' });
})

describe('Todo methods', () => {
  it('Adds tasks correctly', async () => {
    let taskIds = await todo.methods.getTaskIds().call();
    assert.equal(taskIds.length, 0);

    await todo.methods.createTask('eat the blocks', 'Julien')
      .send({ from: accounts[0], gas: '1000000' });
    taskIds = await todo.methods.getTaskIds().call();
    assert.equal(taskIds.length, 1);

    await todo.methods.createTask('eat the blocks again', 'Julien')
      .send({ from: accounts[0], gas: '1000000' });
    taskIds = await todo.methods.getTaskIds().call();
    assert.equal(taskIds.length, 2);
  })

  it('Returns tasks correctly', async () => {
    const content = 'eat the blocks';
    const author = 'Julien';
    await todo.methods.createTask(content, author)
      .send({ from: accounts[0], gas: '1000000' });
    const task = await todo.methods.getTask(1).call();

    const actualKeys = Object.keys(task);
    const expectedKeys = ['taskId', 'dateCreated', 'content', 'author', 'isDone', 'dateComplete'];
    for (key of expectedKeys) {
      assert(actualKeys.includes(key));
    }

    assert(actualKeys.includes('taskId'));
    assert(actualKeys.includes('dateCreated'));
    assert(actualKeys.includes('content'));
    assert(actualKeys.includes('author'));
    assert(actualKeys.includes('isDone'));
    assert(actualKeys.includes('dateComplete'));

    assert.equal(task.taskId, 1);
    assert(!isNaN(task.dateCreated));
    assert.equal(task.content, content);
    assert.equal(task.author, author);
    assert(!task.isDone);
    assert(!isNaN(task.dateComplete));
  })

  it("Throws if task doesn't exist", async () => {
    todo.methods.getTask(1).call()
      .catch(assert);
  })

  it('Will toggle done status on and off', async () => {
    await todo.methods.createTask('foo', 'bar')
      .send({ from: accounts[0], gas: '1000000' });
    await todo.methods.toggleDone(1)
      .send({ from: accounts[0], gas: '1000000' });

    let task = await todo.methods.getTask(1).call();
    assert(task.isDone);
    assert(task.dateComplete);

    await todo.methods.toggleDone(1)
      .send({ from: accounts[0], gas: '1000000' });

    task = await todo.methods.getTask(1).call();

    assert.equal(task.isDone, false);
    assert.equal(!task.dateComplete, false);
  })
})
