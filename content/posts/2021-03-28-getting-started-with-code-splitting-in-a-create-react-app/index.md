---
title: Getting started with smart code splitting in a create-react-app
author: Jordy van Domselaar
date: 2021-03-28
hero: https://raw.githubusercontent.com/gregberge/loadable-components/master/resources/loadable-components.png
---
import CodeSandbox from "../../../src/components/CodeSandbox";
import Tip from "../../../src/components/Tip"

When building your app using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) you'll notice that as your app gets bigger, loading the app becomes slower and uses more bandwidth. This happens because when users load your app, they download all of the app's code at once, even code that's not used by the page they're currently loading. If the user opens the dashboard, the app also downloads all the code for the authentication pages and all other pages.

The solution to this problem is code splitting. Tools like Next.JS implement route-based code splitting out of the box but in this blog post, I'll guide you on your way to splitting your code when you use create-react-app.

<Tip title="important!">

This post assumes you're at least familiar with React. If you're new to React, please read [From zero to hero with React and TypeScript: Let's build another to-do app!](https://jordy.app/from-zero-to-hero-with-react-and-typescript:-let's-build-another-to-do-app!) first! It explains how you can use TypeScript but also explains basic concepts in React. 

</Tip>

Throughout this blog post, I've added CodeSandbox examples so you can tinker with the code yourself. Here's an example showing the project we'll be using:

<CodeSandbox
  title="Example project"
  url="https://codesandbox.io/embed/competent-frost-kp2x4"
/>

It's a stripped-down version of this material-UI starter kit: <https://github.com/devias-io/material-kit-react>.

## Code splitting our pages

If you look in `src/App.js`, it currently contains the following code:

```javascript
import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import DashboardLayout from './components/DashboardLayout';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import Settings from './pages/Settings';
import { Switch } from 'react-router';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <GlobalStyles />
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/app/account" component={Account}/>
          <Route exact path="/app/dashboard" component={Dashboard}/>
          <Route exact path="/app/products" component={ProductList}/>
          <Route exact path="/app/settings" component={Settings}/>
        </Switch>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default App;
```

 This should look familiar. First, we import our pages then we create our routes. Right now Webpack combines all code from all of our imported pages into one big bundle. To fix this we can use [dynamic imports](https://webpack.js.org/guides/code-splitting/). A dynamic import is different from your standard import because it accepts dynamic strings as paths so you can use variables in your import path and because Webpack by default splits any dynamically imported code into its own `chunk`.

To use dynamic imports, we can call `import` as a method instead of a keyword so instead of `import Dashboard from './pages/Dashboard';` we use `const Dashboard = import('./pages/Dashboard');`. One difference to keep in mind is that instead of a component, the `Dashboard` variable is a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to a component. This happens because when a user opens our website, we only serve them the code that's required for the current page. The other code is loaded on demand so we can't assume we already have access to our code.

Let's split our Account page from the rest of our code: 

```diff
 import './mixins/chartjs';
 import theme from './theme';
 import DashboardLayout from './components/DashboardLayout';
-import Account from './pages/Account';
 import Dashboard from './pages/Dashboard';
 import ProductList from './pages/ProductList';
 import Settings from './pages/Settings';
 import { Switch } from 'react-router';

+const Account = import('./pages/Account');
+
 const App = () => {

   return (
```

Now, because Account is a promise, we'll get an error:

`Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports. Check the render method of Router.Consumer.`

React is trying to tell you it expected a component, but got a Promise.

There are a few ways we can solve this. One way is to not render anything, wait for the component to download, and then render the component:

```diff
 import './mixins/chartjs';
 import theme from './theme';
 import DashboardLayout from './components/DashboardLayout';
-import Account from './pages/Account';
 import Dashboard from './pages/Dashboard';
 import ProductList from './pages/ProductList';
 import Settings from './pages/Settings';
 import { Switch } from 'react-router';
+import { useEffect, useState } from 'react';

 const App = () => {
+  const [AccountComponent, setAccountComponent] = useState(null);
+
+  useEffect(() => {
+    import('./pages/Account').then(component => {
+      const LoadedAccountComponent = component.default;
+
+      setAccountComponent(<LoadedAccountComponent/>);
+    });
+  }, [])

   return (
     <ThemeProvider theme={theme}>
         <GlobalStyles />
         <Switch>
           <Route exact path="/" component={Dashboard}/>
-          <Route exact path="/app/account" component={Account}/>
+          <Route exact path="/app/account" component={() => AccountComponent}/>
           <Route exact path="/app/dashboard" component={Dashboard}/>
           <Route exact path="/app/products" component={ProductList}/>
           <Route exact path="/app/settings" component={Settings}/>

```

First, we initialize the state where we can store the loaded component. We initialize it to `null` because we don't want to render anything until it's done loading. If you have a loading screen, you can initialize it to your loading screen component.

 Then, in a `useEffect` call, we wait for the component to load and update the state so we can render the actual component instead of `null`.

Using this approach is tedious and still doesn't completely fit our use-case. It still starts to download the split component as soon as the page loads. We wanted to load the code on-demand. Of course, you build on top of this to fix that, or you could use `React.lazy` and `Suspense`.

lazy + Suspense are a really good combo, lazy takes care of rendering your component as soon as it has been downloaded while suspense takes care of rendering a loading screen while your component is being loaded. If we use lazy + suspense, it looks like this:

```diff
-import React from "react";
+import React, {lazy, Suspense} from "react";
 import 'react-perfect-scrollbar/dist/css/styles.css';
 import { Route } from 'react-router-dom';
 import { ThemeProvider } from '@material-ui/core';
 import './mixins/chartjs';
 import theme from './theme';
 import DashboardLayout from './components/DashboardLayout';
-import Account from './pages/Account';
 import Dashboard from './pages/Dashboard';
 import ProductList from './pages/ProductList';
 import Settings from './pages/Settings';
 import { Switch } from 'react-router';

+const Account = lazy(() => import('./pages/Account'));
+
 const App = () => {
   return (
     <ThemeProvider theme={theme}>
       <DashboardLayout>
         <GlobalStyles />
-        <Switch>
-          <Route exact path="/" component={Dashboard}/>
-          <Route exact path="/app/account" component={Account}/>
-          <Route exact path="/app/dashboard" component={Dashboard}/>
-          <Route exact path="/app/products" component={ProductList}/>
-          <Route exact path="/app/settings" component={Settings}/>
-        </Switch>
+        <Suspense fallback={null}>
+          <Switch>
+            <Route exact path="/" component={Dashboard}/>
+            <Route exact path="/app/account" component={Account}/>
+            <Route exact path="/app/dashboard" component={Dashboard}/>
+            <Route exact path="/app/products" component={ProductList}/>
+            <Route exact path="/app/settings" component={Settings}/>
+          </Switch>
+        </Suspense>
       </DashboardLayout>
     </ThemeProvider>
   );

```

*I've set `fallback` to `null` because I don't have a loading screen.*

This is a lot less manual work and it actually only loads the code when we need it. Win-win! Here's a CodeSandbox  where I've converted all pages to use lazy:

<CodeSandbox
  title="Components are lazy-loaded per route"
  url="https://codesandbox.io/embed/bold-lewin-vxljt"
/>

As you can see in this video:

![](images/virtualdesktop.android-20210326-001316.jpg)