---
title: Getting started with code splitting in a create-react-app
author: Jordy van Domselaar
date: 2021-03-28
hero: https://raw.githubusercontent.com/gregberge/loadable-components/master/resources/loadable-components.png
---
import CodeSandbox from "../../../src/components/CodeSandbox";

When building your app using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) you'll notice that as your app gets bigger, loading the app becomes slower and uses more bandwidth. This happens because when users load your app, they download all of the app's code at once, even code that's not used by the page they're currently loading. If the user opens the dashboard, the app also downloads all the code for the authentication pages and all other pages.

The solution to this problem is code splitting. Tools like Next.JS implement route-based code splitting out of the box but in this blog post, I'll guide you on your way to splitting your code when you use create-react-app.

Throughout this blog post, I've added CodeSandbox examples so you can tinker with the code yourself!

Here's the example project we'll be using: 

<CodeSandbox
  title="Example project"
  url="https://codesandbox.io/s/practical-lehmann-jfbvl?fontsize=14&hidenavigation=1&theme=dark"
/>