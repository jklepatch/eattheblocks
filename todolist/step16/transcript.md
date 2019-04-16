In the last video, we started our refactor of the todolist dapp and in this video we are going to finish it. We are going to:

* integrate the Tasks component to drizzle, so that we can list existing tasks
* and also integrate the newTask component, so that we can create new tasks

We'll start by integrating the Tasks component.

So lets go to our terminal. I have 2 tabs:

* one for the truffle console, where I deployed the smart contract
* and another one for the webpack process, where I am running the npm start command inside the app directory

Now, in your code editor open the Tasks component inside the src/components folder.This is the code that we took from the refactor with React. In order to integrate Drizzle, we will need to do a few changes, but for the most part, it will stay the same.

On top, let's import our drizzle container component, and we ll call our import withDrizzle...

Next, at the bottom of the file, where we export the Tasks component, we are going to wrap everything with the drizzle container by calling withDrizzle and giving it as argument the Tasks component.

And after we have done that, the Tasks component will receive the drizzle object and the drizzle state.

We are going to use these things inside our component, but before we will need to refactor our Tasks component into a class-based component because we are going to use one of the lifecycle method of React, which will make our components stateful, and only class-based components can be stateful.

So let's replace this const keyword by a class keyword then let's get rid of all of this... alright.. then we'll extend the Component class of React...and we all need to import it at the top of the file..

let's also transform the renderTasks function into a method of our class...

And finally we will put our return statement inside the render() method of our component...and we also need to reference the renderTasks method properly... ok..

So, so need to configure Drizzle so that it knows how to fetch the tasks from the smart contract...this configuration should only be done once, so we will use the componendDidMount() method of React, that is executed only once, when the component is added to the Dom...

So let's create this method...alright...so first, we need to reference the contract instance of our todo smart contract... so let's define a Todo variable for this, and we'll grab this contract instance using the drizzle object, in the contracts key. 

Now, with this Todo object we can tell Drizzle what do we want to fetch from the smart contract...so, on this object. there is a methods key, like for web3, and afterwe reference the smart contract function that we want to call...and finally we execute the cacheCall() function...this is a method specify to Drizzle that is used to let Drizzle know that we want to always have the latest value of the result of calling a function of our smart contract. So whenever the result of this call will change, Drizzle will take care of updating its state, which will re-render our component...

Contrary to what you may this, we don't get the returned value of the function of the smart contract, but instead we get a key...we'll store this key...
And we will use this key to reference the piece of the drizzle state that we are interested in.
At the moment, we will just store this key in the state of our component, and we will use it in the render() function

So now, let's go to the render() function and let's connect the UI to the state of Drizzle.

First, we will grab a key that reference the whole drizzle state relevant to our smart contract... we use the drizzleState props, and inside we simply reference our Todo smart contract...

With this Todo variable we have all the results of the function calls of our todo smart contract. When I say that we have all these results, I mean that we only have the results of the function calls that we configured before. If you don't tell Drizzle what do you want on smart contract, Drizzle will not fetch anything. In our case, we only configured Drizzle to call our getTasks() function, with no argument. So that's the only thing that we have in this todo object.

In order to reference the correct entry in the drizzle state, we also need the tasksKey that is stored in the component state.

Now, we can finally grab our tasks by referencing the Todo object, then methods, then name of method and finally we use our tasksKey. To be honest with you, I am actually not a big fan of all this verbosity, and I wish that we could simply grab the result that we want just with the tasksKey, so something like drizzleState, then you pass the tasks key directly, but that's not how drizzle work unfortunately.

Next, with our tasks object, we can render the list of tasks. let scroll down... So we just need to do a small modification compared to what we had before...
Let's delete our previous way of referencing tasks.. and now we will use the tasks object directly.. and now the actual data is under the data key on this object. So first we make sure that we have something and if thats the case then we render these tasks. If you never saw this notation this is what we call a shortcircuit operator and that means that the right part will only be executed if the left part evaluate to true.

Alright, so we are done for our tasks component. So just to recap, we had to use the componentDidMoun() method of React to configure Drizzle to call the getTasks() function of the smart contract, we received a key from drizzle that is used to find the results of the call to our smart contract, and finally in the render() method we used this key to get the value of the tasks object, and we connected that to our UI.

We also need to render this component in the App component. Let's go to the app component. Let's import the Tasks component... let's scroll down to the render() function.... and let's add the Tasks component..

Ok, The Tasks component has been integrated to our dapp. Let's move on to the next item on our list which is to create a newTask component so that we can create new tasks from the frontend.

Let's go back to our code editor and we will open the NewTask component. So once again this is directly taken from the refactor with React, so you should feel familiar with this code. This is a simply form that allows to create a task. using different input fields.

So, first things first, we need to wrap this component inside our drizzle container so that it get access to all the drizzle objects. So let's import our drizzle container.....

Then let's go to the bottom, and we will wrap our NewTask component with the drizzle container... ok, we are ready to start the work.

First, let's define the initial  state of our component. A new task has 2 string fields: the content and the author. Let's define them in our state objet...
And we'll also store a transaction id to be able to give some feedback after a user click on submit. I will explain this after.

Next, we'll create a function to update the state as the user types the value of the content and author field... Let's call this handleChange... Its gonna receive 2 arguments... the first one is the name of the field, and the second is an event object that will allow us to get the value of the changed field. we'll store the new value in the state...if you never this square bracket notation for the key of the object that's a notation that allow you to dynamically define the key of an object in Javascript.

After this, let's bind the 2 text inputs in the form to this function, so that our component state stays in sync with what the user types in the form.

We'll scroll down to the `render()` function and find the input for the content field.. let's put all the props on their own line... and lets add a props called on Change. This props is used to trigger an arbitrary function everytime the value of the input changes. So we define an anonymous function for this props. It receives a react synthetic dom event, and in the body of this function we execute the handleChange function. As a first argument we pass it the name of field, and as a second argument we pass it the event object, so that handleChange can find the current value of this field. Alright, we are done with this field.

Next, let's do the same thing for the author field..
So we put all the props on their own line...
We also add an onChange props...
And we attach it to the handleChange function, this time specifying the author field...Ok, we are done for the handleChange function

Next, we'll create a function to handle form submition when user click on the submit button of the form. this will also be an arrow function because we need it to be bound to the class of our component... it takes a single argument, the synthetic dom event fired by react...

First, we prevent the default behavior of the form, so that the page does not reload. next, we grab the drizzle object and the drizzle from the props. Next, we grab the content and author fields of the state. That's basically the current value of the form. Next we grab the Todo contract instance from drizzle, so that we can execute the Ethereum transaction to create a task in our smart contract.

With all of these variables, we can finally execute our transaction. We use the Todo object, then we execute the createTask function of the smart contract, and we specify to drizzle that we want to execute a transaction, using the `cacheSend()` method. We pass this arguments for createTask() in the first arguments of `cacheSend()` and for the last argument of `cacheSend()` we pass an object to configure the transaction. In this object, you can pass the same fields as you would to configure a transaction in web3, so refer to the documentation of web3 if you want to know more, but for this tutorial we will only use the from field which specify which ethereum address will send this transaction 

Then, once you have done that, what you get from `cacheSend()` is not the transaction receipt like what you get with web3, but instead you get a transactionid. This is entirely managed by Drizzle client side, so you cant use this transactionId in an Ethereum blockchain explorer to find info about your transaction. Only Drizzle knows how to map this transactionId to the actual Ethereum transaction.

I'll show you how to use this tranactionId in the `render()` function, but for now let's just store it inside the state of our component. 

So at this point its important to understand that we already covered the execution of the transaction in our smart contract. The rest of what we will do is just to give a feedback to the user about the status of the transaction. As you probably know, in Ethereum transactions are not executed right away but they need to be mined by miners, and it takes about 15 seconds. In our case it will be much faster because on our local Ethereum blockchain provided by ganache the mining time is almost 0.

Alright, so let's go to our render() function and we will make use of the transactionID. So at the top of the function, let's extract 2 objects from the drizzleState, called transactions and transactionStack. The first object contains information about Ethereum transactions that we triggered, and the second object is a key value store that maps Drizzle transactionIds to Ethereum transactionHash.

In the transactions object, transactions are ordered by transactionHash, so we first need to get the transactionhash of our transaction. So let's extract this transaction hash first, using the transactionStack object...

Now that we have our transaction hash, we can use it to reference the transaction in the transactions object.

So let's scroll down to the bottom of the form...
And we will add a paragraph to show the status of the transaction, if there is one
Inside this paragraph, let's first check that our txHash is defined.. 
If that is the case, let's create a template literal where we will show the transaction status... and to show the transaction status we will use the transactions object defined earlier, and we pass it the transactionHash. We are almost done, however, the status is one of the field of the object that we get from the transactions object... So we need to reference our transaction status like this... but we want to be sure that we are not trying to reference an empty object... So lets use the and shortcircuit operator to make sure that its not empty...

Now we can close our template literal...and the last thing to do is to specify the other branch of the ternary operator, in the case that txHash is empty..in this case we return null..and we close our JSX tag

Alright, so now we are done with our NewTask component.
We have just one thing left before its totally finished: we need to render this component in the app component. 
So let's go to the app component. Let's import the NewTask component.
Let's scroll down to the render function...
And we'll do just replace our Todo string by the NewTask component

Alright, we are totally done with this refactor of the todolist dapp with Drizzle!

Just to recap what we have done, in this video we added the Tasks component to list the tasks of the smart contract, and the NewTask component to create new tasks. In the Tasks component, we configured Drizzle to keep us updated of the return value of the getTasks() function of the smart contract, and we displayed the result to the user, and in the newTasks component, we configured Drizzle to execute in a transaction the createTask function of our smart contract when a user submit the form. We also displayed the transaction status on the frontend using the transactions object of the drizzle state.

If you compare with what we did with the React refactor, you probably notice that our code became more clean with Drizzle, and allow to show transaction status very simply to the user.

We havent covered all the possibilities of Drizzle. For example, Drizzle can be integrated directly to the redux store of your applicaiton. Its also possible to deal with smart contract events using Drizzle. We'll cover these in other videos on EatTheBlocks.

Congratulations for following this course up to the end!. Now you know how to create an Ethereum Dapp using jQuery, React, and Drizzle. And you also know how to write a Solidity smart contract and integrate it with your frontend. From there, you can explore other topics such as testing, smart contract security, integration testing, and I'll do videos on these topics on EatTheBlocks.

Thanks for watching this course, and if you have any questions, dont hesitate to reach out to me or other in the telegram group
