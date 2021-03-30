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

This post assumes you're at least with React. If you're new to React, please read [From zero to hero with React and TypeScript: Let's build another to-do app!](https://jordy.app/from-zero-to-hero-with-react-and-typescript:-let's-build-another-to-do-app!) first!

</Tip>

Throughout this blog post, I've added CodeSandbox examples so you can tinker with the code yourself. Here's an example showing the project we'll be using:

<CodeSandbox
  title="Example project"
  url="https://codesandbox.io/embed/practical-lehmann-jfbvl"
/>

It's a fork of this material-UI starter kit: <https://github.com/devias-io/material-kit-react>.

## Installing packages

In this blog post, we're using [loadable-components](https://github.com/gregberge/loadable-components). loadable-components works similar to React's `lazy`  and `suspense` but has [better server-side rendering support](https://reactjs.org/docs/code-splitting.html#reactlazy) and provides us with the tools we need to intelligently pre-load components. More on that later.

To install loadable-components, open your favorite terminal and run `npm install @loadable/component --save`.

## Creating static routes

Right now, you might be used to having `<Route path="..." component="..." />` routes. This is a great way to define routes dynamically but has one issue: We have no way to know what component is registered to what route throughout your app. This is a problem because we can't know what component to pre-load.

To make sure we can intelligently pre-load components, we need to know what route is going to render what component. To do this we can create a route map.

Inside `src/App.js` you can see that our routes are currently defined like so:

```javascript
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <GlobalStyles />
        <Route path="/" component={Dashboard}/>
        <Route path="/app/account" component={Account}/>
        <Route path="/app/dashboard" component={Dashboard}/>
        <Route path="/app/products" component={ProductList}/>
        <Route path="/app/settings" component={Settings}/>
      </DashboardLayout>
    </ThemeProvider>
  );
};
```

Let's change that to a static route map. To do this, create a `routes.js` file next to `App.js` and add this:

```javascript
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import ProductList from './pages/ProductList';
import Settings from './pages/Settings';

export const routes = {
  home: {
    path: "/",
    component: Dashboard
  },
  account: {
    path: "/app/account",
    component: Account
  },
  dashboard: {
    path: "/app/dashboard",
    component: Dashboard
  },
  productList: {
    path: "/app/products",
    component: ProductList
  },
  settings: {
    path: "/app/settings",
    component: Settings
  },
}
```

We've achieved a few things:

1. We've split the routes from `App.js`, cleaning `App.js` up
2. We now have a static route map where routes are coupled to components so we can easily access the component later
3. We have named routes. Instead of navigating to `/app/dashboard`, we can navigate to `routes.dashboard`. If you're using TypeScript, you now have the added benefit of TypeScript telling you if you're using a route that doesn't exist