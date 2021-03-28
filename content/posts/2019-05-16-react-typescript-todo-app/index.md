---
title: "From zero to hero with React and TypeScript: Let's build another to-do app!"
author: Jordy van Domselaar
date: 2019-05-16
hero: ./images/hero.png
excerpt: Learn everything you need to know to get started with React and Typescript. You don't need to have any prior TypeScript knowledge for this one!
---


import CodeSandbox from "../../../src/components/CodeSandbox";

## Table of Contents

## Intro

In this post, we'll be creating a to-do app using TypeScript and React. If you're new to using TypeScript with React this is a great tutorial to get you started!

Most of this tutorial will explain how React itself works as well so if you're not too familiar with React itself you should feel right at home. However, having at least a basic understanding of components, properties and state does help!

This tutorial will provide a short explanation about concepts such as state and props but I highly recommend getting the basics of React down first before diving into the wonderful world of using TypeScript with React.

If you're not sure what components, properties or state are you can find the documentation about them here: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html). Click on "MAIN CONCEPTS" and give it a read! Again, you don't need to know the ins and outs of React but having a basic understanding of these three concepts makes reading this tutorial a lot easier.

Here are a few things you'll be learning in this tutorial:

1. Setting up a React project with TypeScript
2. Writing a TypeScript interface
3. How to use TypeScript inside components
4. Setting up state with TypeScript
5. Passing down properties with TypeScript

I've added examples using CodeSandbox throughout this tutorial so you can hack away on the examples. Keep an eye out for them!

## Getting started

For this tutorial, we'll be using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app). To get started run the following command in your terminal;

```
npx create-react-app todoapp -—typescript
```

this will scaffold a new TypeScript React app. _This could take a while._

*Note: If something doesn't go as planned, Facebook has added a few tips and tricks: [https://facebook.github.io/create-react-app/docs/adding-typescript](https://facebook.github.io/create-react-app/docs/adding-typescript)*

When it's done you'll have the following file structure:

- README.md
- node_modules
- package-lock.json
- package.json
- public - favicon.ico - index.html - manifest.json
- src - App.css - App.test.tsx - App.tsx - index.css - index.tsx - logo.svg - react-app-env.d.ts - serviceWorker.ts
- tsconfig.json

To start a development server that automatically reloads your browser when changing code, run the following commands in your terminal:

```sh
cd todoapp
npm start
```

Your default browser should open automatically. If it doesn't, open your browser and go to `http://localhost:3000` manually.

You'll see the following screen:

<CodeSandbox
  title="Getting started"
  url="https://codesandbox.io/embed/5klroqv26l"
/>

Save for the SVG that's not rendering, but that's not important.

## Cleaning up

Before we get started building something, let's clean up some files we won't be needing for this tutorial.

Delete the following files:

- App.css
- App.test.tsx
- App.tsx
- index.css
- logo.svg

You'll notice you get a `ModuleNotFoundError` error. We'll fix that in the next step.

## Creating your first component

Let's create your first TypeScript component!

Inside the project create the following file: `src/components/App.tsx` with the following code:

```jsx
import React from "react";

const App = () => {
  return <h1>Welcome to my to-do app</h1>;
};

export default App;
```

Remember the error I told you about? To fix that, replace the code inside `index.tsx` with

```jsx jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

Your browser should automatically refresh to show the following:

<CodeSandbox
  title="Creating your first component"
  url="https://codesandbox.io/embed/l4w63r72om"
/>

## Adding basic styling

To provide our app with basic styling, we'll be using Bootstrap in this tutorial. When creating your own app, feel free to use any styling solution you prefer!

To install Bootstrap, we'll be following their tutorial: [https://getbootstrap.com/docs/4.3/getting-started/introduction/](https://getbootstrap.com/docs/4.3/getting-started/introduction/).

Since we won't be using any JavaScript plugins all you have to do is the following:

Append

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
```

to `public/index.html` in `<head></head>`.

Your `public/index.html` should now contain the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>

    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

Notice the `<link></link>` tag inside `<head></head>`.

You won't notice much difference right away. We'll be using Bootstrap's classes to style our components from now on.

## Creating your first interface

Looking at our design we'll need the following components:

1. A to-do list, you know, to render to-do's
2. A to-do component, this will represent one to-do
3. A form to create a new to-do
   1. A submit button
   2. An input to write our to-do in

With that out of the way let's think about our domain for this app. What entities do we have? For our to-do app, all we really need is a `Todo` entity. Let's create an `interface` for it.

Interfaces allow us to specify what data we need and what it looks like. You can define an interface of any data you need. This includes properties, state, API responses and anything in between. By defining an interface you get advanced auto-completions and static type checking. What this means is that TypeScript can tell you if you mistakenly add the wrong data to a component or if you're trying to use a `string` property as a `number` before even running your app.

The auto-completions are really neat as well. Most bigger JavaScript packages are written in TypeScript and thus contain types. What this means is that your editor can warn you if you're using a package in the wrong way and it can tell you about all the parameters a method expects in a package. This also works for components. You can now be warned about using the wrong properties of a component before you even run your app. You'll find this is incredibly useful when refactoring components or methods.

Create the following file: `src/interfaces/Todo.ts`, notice the file extension is `.ts` instead of `.tsx`. Since it won't contain any `JSX` (it will be plain TypeScript) you don't have to use `.tsx`. It's still possible to use `.tsx` if you like but as I said, it's not required.

A to-do has the following fields:

1. name
2. finished

`name` will be what we render inside the list, we'll use `finished` to determine if we've finished the to-do or not.

An example to-do would look like this:

```json
{
  "name": "My example to-do",
  "finished": false
}
```

As you can see `name` is a `string` and `finished` is a `boolean`.

Using this information we end up with the following interface:

```jsx
interface Todo {
  task: string;
  finished: boolean;
}
```

Put the following code inside `src/interfaces/Todo.ts`:

```jsx
export interface Todo {
  task: string;
  finished: boolean;
}
```

Now, when we specify that a component requires a `Todo` or an `array` of `Todos`, we'll get an error if we forget to add a task or if we forgot to specify the status of our to-do.

We'll be using this interface for our `TodoListItem` later!

## Creating static components

Let's start building static components. They'll show what the app is going to look like, but they won't be interactive yet. This is a good starting point for a simple demo using static data.

Let's start with our simple button.

Create the following file: `src/components/TodoList.tsx` with the following code:

```jsx
import React from "react";

const TodoList = () => {
  return (
    <ul>
      <li>Our first to-do</li>
    </ul>
  );
};

export default TodoList;
```

Right now we have no way to see what we're actually building. For now, replace the contents of `src/components/App.tsx` with the following code:

```jsx
import React from "react";
import TodoList from "./TodoList";

const App = () => {
  return (
    <div>
      <h1>Welcome to my to-do app.</h1>
      <TodoList />
    </div>
  );
};

export default App;
```

You'll notice we've added the following:

```jsx
import TodoList from "./TodoList";
```

this `imports` the component we just created into the `App` component.

```jsx
<TodoList />
```

This renders our new component. You should now see something like this:

![Preview of our TodoList component](./images/TodoList.png)

As you can see, Bootstrap has added some basic styling for us. We'll customize this in the last step.

Now, whenever we change the code inside `src/components/TodoList.tsx`, the page will automatically refresh so we can see the latest version of our app.

As we can see here: [https://getbootstrap.com/docs/3.4/components/#list-group](https://getbootstrap.com/docs/3.4/components/#list-group) Bootstrap has styling we can use for our list to make it look better. In `src/components/TodoList.tsx` replace

```jsx
<ul>
  <li>Our first to-do</li>
</ul>
```

with the following:

```jsx
<ul className="list-group">
  <li className="list-group-item">Our first to-do</li>
</ul>
```

You'll notice we've added the `list-group` and `list-group-item` `classNames`.

Typically you'd create a component for a single to-do in a list as well. To do (pun not intended) this, create the following file: `src/components/TodoListItem` and add the following:

```jsx
import React from "react";

const TodoListItem = () => {
  return <li className="list-group-item">Test to-do list item</li>;
};

export default TodoListItem;
```

Now to render our new component, we can alter `src/components/TodoList.tsx`:

Replace

```jsx
import React from "react";

const TodoList = () => {
  return (
    <ul className="list-group">
      <li className="list-group-item">Our first to-do</li>
    </ul>
  );
};

export default TodoList;
```

with

```jsx
import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  return (
    <ul className="list-group">
      <TodoListItem />
    </ul>
  );
};

export default TodoList;
```

You should now see something like this:

![TodoListItem preview](./images/TodoListItem.png)

Pretty neat isn't it?

As you might have noticed our `TodoListItem` isn't dynamic at all right now. It only ever renders `Test to-do list item`, let's fix that.

Inside `src/components/TodoListItem.tsx`, we'll use the `Todo` interface we created. Let's add it! 🚀️

Let's create an interface for `TodoListItem`. It should accept a `todo` property of type `Todo`.

Add the following code:

```jsx
interface Props {
  todo: Todo;
}
```

Don't forget to import your `Todo` interface! Your import statement should look like this:

```jsx
import { Todo } from "../interfaces/Todo";
```

Now add the `todo` property and the `Props` interface to the `TodoListItem` component. Your file should now look like this:

```jsx
import React from "react";
import { Todo } from "../interfaces/Todo";

interface Props {
  todo: Todo;
}

const TodoListItem = ({ todo }: Props) => {
  return <li className="list-group-item">{todo.task}</li>;
};

export default TodoListItem;
```

Right now our app shows an error:

`Cannot read property 'task' of undefined`

Let's fix that.

Open `src/components/TodoList.tsx`. If you're using Visual Studio Code, you should notice a red line underneath `<TodoListItem />`. It's telling us that we have an error. Uh-oh 🤦️

If you hover over the red line, you'll notice it's telling you what's wrong:

`Property 'todo' is missing in type '{}' but required in type 'Props'.ts(2741)`

That's more like it! Remember that `todo` property we added to our component? Time to pass a to-do to our `TodoListItem`.

Change

```jsx
<TodoListItem />
```

into

```jsx
<TodoListItem
  todo={{
    task: "Finish writing this blogpost",
    finished: false
  }}
/>
```

_Note: If you hit ctrl+space you should get top-notch autocompletions on your new property!_

Once you've done that you should now see "Finish writing this blogpost" come up on your screen. Woohoo! 🎉️

Now, let's build a form so we can add more to-do's!

To keep things simple, we'll be using standard HTML inputs. In a production app, you would most likely create separate components for them.

Create a new file inside `src/components`, name it `TodoForm.tsx` and add the following code:

```jsx
import React, { HTMLProps } from "react";

const TodoForm = (props: HTMLProps<HTMLFormElement>) => {
  return (
    <form {...props}>
      <input
        className="form-control"
        placeholder="What would you like to get done?"
      />
      <button className="btn btn-primary">Create</button>
    </form>
  );
};

export default TodoForm;
```

You'll notice the following code:

```
(props: HTMLProps<HTMLFormElement>)
```

HTML itself uses interfaces as well. The `HtmlFormElement` interface can be found here: [https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement).

JSX has a few subtle differences compared to HTML. For example, you have to use `className` instead of `class` to add classes to your elements. To account for this, the team behind React has defined a generic interface called `HTMLProps`.

So, what's a "generic"?

A generic is a type that takes another type as an argument. An example of this is an `Array`.

You can tell TypeScript that you're working with an array comprised of a certain type of data by defining your variable like so:

```jsx
const myVariable: Array<string> = ["I", "am", "an", "array", "of", "strings"];
```

As you can see the syntax for using generics is

```jsx
Generic<otherType>
```

In our case we used

```jsx
HTMLProps<HTMLFormElement>
```

So, we're telling TypeScript we have an interface of `HTMLProps` containing additional properties for a `HtmlFormElement`. You can also think of it like adding parameters to a type.

You'll also notice we used

```javascript
{...props}
```

This is called object destructuring. The `...` is called a [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). Using the spread operator allows us to pass all the properties, that our component receives, through to another component. _You can imagine that it would get really tiresome if you had to pass your properties manually._

Now, let's use our form!

Inside `src/components/App.tsx` append

```jsx
<TodoForm />
```

underneath

```jsx
<TodoList />
```

_Note: don't forget to import it!_

The final product for this step should look like this:

<CodeSandbox
  title="Creating static components"
  url="https://codesandbox.io/embed/2pmv7o11pn"
/>

If it doesn't, feel free to open the code sandbox and check what went wrong!

You can type in the input but submitting the form only seems to refresh the page. Hmmm, let's fix that. How? Glad you asked! By adding state. React ❤️ state.

## State

### What is state?

State is the data of our app. All our to-do's? State. The text we're currently typing into the fancy input we just created? Also state.

Because explaining how state and declarative rendering works is beyond the scope of this blog post, I recommend that you read this post about declarative programming: [https://dev.to/itsjzt/declarative-programming--react-3bh2](https://dev.to/itsjzt/declarative-programming--react-3bh2).

To quote their TL;DR:

> In declarative programming, you describe the program/UI/picture and someone else React/Browser/OS implements it.

So, we describe **what** we'd like to render, React figures out **how** to render what we want.

React has a one-way data flow. This forces the following rules:

1. A component can have state and it can pass state down to child components
2. Child components cannot change the state of their parent components\*

\*_Unless you also pass updater functions down, we'll use those as well, hang in there!_

### Adding state to our components

Because the state can only flow down, we first have to identify the common ancestor to all the components that require our data. Because we're currently building a super simple to-do app, that's `app.tsx`.

Inside `src/components/app.tsx`, add the following code just before `return (`:

```jsx
const [todos, setTodos] = useState([]);
```

Your `App` component should now look like this:

```jsx
const App = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>Welcome to my to-do app.</h1>
      <TodoList />
      <TodoForm />
    </div>
  );
};
```

We've just added state to our `App` component. Easy right? We've told `App` that it has a state called `todos` with an empty `array`. Since we're using TypeScript, we can tell `App` what kind of array it is as well!

To do this, change

```jsx
const [todos, setTodos] = useState([]);
```

into

```jsx
const [todos, setTodos] = useState<Array<Todo>> ([]);
```

As you can see, `useState` is a generic method. You can also see that it's possible to nest generics.

In React, you should not update your state variable manually. If you do, unexpected things might happen, such as your app not rendering your new todo's. If you update `todos` manually, React won't know something happened. That's why React has provided us with `setTodos`. When you call `setTodos` React will re-render the current component.

`useState` returns an array comprised of your state and a setter. Using array destructuring, you can provide names for both your state and the setter method.

Let's also create a state for the current value of our input, this makes adding the to-do later easier.

Add the following code as well:

```jsx
const [todoValue, setTodoValue] = useState("");
```

Because the initial value of our state is of the same type as any other value it will contain we don't have to tell TypeScript that it's a string, it can tell already! This is possible for most variables and methods that don't contain different data types.

This won't work for our `todos` state because it starts as an empty `array`, TypeScript doesn't know what data the `array` will contain.

Let's create a method called `handleSubmit()`, this method will take care of updating our state when we add a new to-do. Underneath `useState`, add the following code:

```jsx
const handleSubmit = event => {
  event.preventDefault();

  setTodos(previousTodos => [
    ...previousTodos,
    {
      task: todoValue,
      finished: false
    }
  ]);
};
```

You'll notice TypeScript throws an error with the following contents:

`Parameter 'event' implicitly has an 'any' type.ts(7006)`

What this means is that TypeScript doesn't know what type `event` has, a variable of type `any` could be anything! Right now TypeScript can't warn us if we make a mistake.

Let's tell TypeScript what type `event` is. Change

```jsx
event
```

Into

```jsx
(event: FormEvent<HTMLFormElement>)
```

_Note: Don't forget to import FormEvent from "react"!_

And just like that, the error is resolved.

Now, you might be wondering what's going on here:

```jsx
setTodos(previousTodos => [
  ...previousTodos,
  {
    task: todoValue,
    finished: false
  }
]);
```

Let's go over it one step at a time.

1. First we call `setTodos`, remember: we shouldn't update todos manually!
2. Inside `setTodos` we tell React to append our current todo to the already existing `array` of todos.

As the name suggests, `setTodos` sets the new value of `todos`. When we want to append a new todo we have to return a new array with the existing todos and our new todos in it.

You can call setTodos in one of two ways:

By specifying a new value, like this:

```jsx
setTodos([
  {
    task: "Finish writing this blogpost",
    finished: false
  }
]);
```

This removes all existing todo's and adds one new todo.

Or by specifying a callback, like this:

```jsx
setTodos(previousTodos => [
      ...previousTodos,
      {
        task: "Finish writing this blogpost",
        finished: false
      }
    ]))
```

As you can see, we're returning the previous array of to-do's plus our new to-do.

Here's a rule of thumb to help pick which one to use:

Are you updating state based on the previous state (This includes nested state)? Yes? Use the callback. No? Specify the new value.

To quote [the documentation](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous):

> Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.

Now, let's add our `handleSubmit` method to our `<TodoForm/>`.

Change

```jsx
<TodoForm />
```

into

```jsx
<TodoForm onSubmit={handleSubmit} />
```

So, the submitting works but nothing is happening. Why? We haven't told `<TodoList />` to use `App's` state yet! Let's get to it. On our `<TodoList />`, add the `todos` property with the value `todos` like so:

```jsx
<TodoList todos={todos} />
```

TypeScript will throw another error:

> Type '{ todos: Todo[]; }' is not assignable to type 'IntrinsicAttributes'. Property 'todos' does not exist on type 'IntrinsicAttributes'.ts(2322)

As you might be able to tell, this means that we've added a property that doesn't exist on our `TodoList` component. Let's add it to `TodoList`'s interface!

Inside `src/components/TodoList.tsx` add a new interface:

```jsx
interface Props {
  todos: Todo[];
}
```

_Note: When defining an interface using square brackets means it's an array of that type. `Todo[]` is the same as `Array<Todo>`._

Add the property to the component as well:

```jsx
const TodoList = ({todos}: Props) => {
```

While we're at it, let's render `TodoListItems` based on the `todos` this component receives as well! Change

```jsx
const TodoList = ({ todos }: Props) => {
  return (
    <ul className="list-group">
      <TodoListItem
        todo={{
          task: "Finish writing this blogpost",
          finished: false
        }}
      />
    </ul>
  );
};
```

into

```jsx
const TodoList = ({ todos }: Props) => {
  return (
    <ul className="list-group">
      {todos.map(todo => (
        <TodoListItem
          todo={{
            task: todo.task,
            finished: todo.finished
          }}
        />
      ))}
    </ul>
  );
};
```

You should see our "Finish writing this blogpost" to-do disappear. We're now officially rendering our to-do's from the state! 🎉️️️️️🎉️🎉️

One last problem: No matter what we do, we get an empty new to-do. Hey, that rhymes! If creating to-do apps doesn't work out, we could always try and become poets.

Inside `src/components/TodoForm.tsx`, we'll need another property: `onInputChange`. Because this attribute is not one that normally exists on a form, we'll need to define it on our own. We can't name it `onChange` because forms also have a `change` event. TypeScript will throw an error if we try to override it.

Our new interface has to extend `HTMLProps<HTMLFormElement>` like so:

```jsx
interface Props extends HTMLProps<HTMLFormElement> {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
```

We're telling TypeScript we're expecting a method that accepts an event as a parameter and doesn't return anything: `void`. After you've updated `TodoForm` it should look like this:

```jsx
import React, { HTMLProps, ChangeEvent } from "react";

interface Props extends HTMLProps<HTMLFormElement> {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TodoForm = ({ onInputChange, ...props }: Props) => {
  return (
    <form {...props}>
      <input
        className="form-control"
        placeholder="What would you like to get done?"
        onChange={onInputChange}
      />
      <button className="btn btn-primary">Create</button>
    </form>
  );
};

export default TodoForm;
```

You might notice this piece of code: `{ onInputChange, ...props }`. In React, `props` is an `object`. Right now we're `destructuring` the `props` object into 2 variables: `onInputChange` and `props`. By doing this we can use `onInputChange` whilst automatically passing the rest of the props to `form`. Let's update `src/components/app.tsx` to use this new property as well.

First, let's create a new method to update our state whenever the value of our input changes:

```typescript
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoValue(event.currentTarget.value);
  };
```

Again, don't forget adding the `ChangeEvent<HTMLInputElement>` interface!

Now, let's add our new method to the `TodoForm`. Change

```jsx
<TodoForm onSubmit={handleSubmit} />
```

into

```jsx
<TodoForm onSubmit={handleSubmit} onInputChange={handleChange} />
```

After you've done that, try creating a new to-do! You'll see new to-do's being added 🚀️. After hitting the create button the input isn't cleared however. Let's fix that whilst we're at it. In `src/components/app.tsx` change

```jsx
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  setTodos(previousTodos => [
    ...previousTodos,
    {
      task: todoValue,
      finished: false
    }
  ]);
};
```

into

```jsx
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  setTodos(previousTodos => [
    ...previousTodos,
    {
      task: todoValue,
      finished: false
    }
  ]);

  setTodoValue("");
};
```

As you can see, we're clearing the input value state.

The input itself isn't cleared yet, that's because even though we update `App's` state, we don't pass `todoValue` down yet. To do this change

```jsx
<TodoForm onSubmit={handleSubmit} onInputChange={handleChange} />
```

into

```jsx
<TodoForm
  onSubmit={handleSubmit}
  onInputChange={handleChange}
  inputValue={todoValue}
/>
```

In `src/components/TodoForm.tsx` add our new `inputValue` property:

```jsx
import React, { HTMLProps, ChangeEvent } from "react";

interface Props extends HTMLProps<HTMLFormElement> {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

const TodoForm = ({ onInputChange, inputValue, ...props }: Props) => {
  return (
    <form {...props}>
      <input
        className="form-control"
        placeholder="What would you like to get done?"
        onChange={onInputChange}
        value={inputValue}
      />
      <button className="btn btn-primary">Create</button>
    </form>
  );
};

export default TodoForm;
```

Try adding a todo: "Learn about becoming a poet". The input is now cleared on submit!

The final product should look like this:

<CodeSandbox
  title="Adding state"
  url="https://codesandbox.io/embed/101797r68q"
/>

## Closing thoughts

That's it for this tutorial. I hope you enjoyed it and that you've learned how to get started with using TypeScript and React together. I also hope this article shows you the benefits of using Typescript if you weren't sure yet. If you're up for a challenge, you can try to implement functionality to finish a to-do, or you could try disabling the create button if there is no text inside the to-do input. Good luck!
