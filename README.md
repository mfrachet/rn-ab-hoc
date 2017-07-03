[![Build Status](https://travis-ci.org/mfrachet/react-native-ab-hoc.svg?branch=master)](https://travis-ci.org/mfrachet/react-native-ab-hoc)
[![Coverage Status](https://coveralls.io/repos/github/mfrachet/react-native-ab-hoc/badge.svg?branch=master)](https://coveralls.io/github/mfrachet/react-native-ab-hoc?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Provide a poor intrusive way to make [A/B Testing](https://en.wikipedia.org/wiki/A/B_testing) by using an `HOC` instead of `components`

This way, extracting the AB implementation consists only of removing / modifying an import statement instead of code refactoring.

---
<p align="center">
<img src="https://img4.hostingpics.net/pics/219640VariantFlatList.gif"/>
<img src="https://img4.hostingpics.net/pics/966777VariantListView.gif"/>
</p>

# Installation

```
npm install --save react-native-ab-hoc
```

# Usage

Now, let's imagine that you have two lists :

- One built with a `FlatList` inside of `flatList.js`
- One built with a `ListView` inside of `listView.js`

Let's create an AbTestFile :

```javascript
// list.ab-test.js
import AbHoc from 'react-native-ab-hoc';
import FlatList from './flatList.js';
import ListView rom './listView.js';

export default AbHoc('ListExperiment',
 { variant: 'FlatList', component: FlatList },
 { variant: 'ListView', component: ListView }
);
```

## Random variant

Inside of your app, let's do something like :

```javascript
// app.js
import React from 'react';
import List from './list.ab-test';

export default function App() {
    return (
      <List />
    );
}
```

This will load and store locally one of the two variant randomly (see [randomize function](https://github.com/mfrachet/react-native-ab-hoc/blob/master/src/reactNativeAbHoc.js#L16))

## Forced variant

You can force the chosen variant using a `variant` props :

```javascript
// app.js
import React from 'react';
import List from './list.ab-test';

export default function App() {
    return (
      <List variant="FlatList"/>
    );
}
```

*Note that the forced variant takes over the random one. If you set a variant by forcing it, the previous random one will be erased and replaced by the forced one. Inverse is not true.*

# Storage

By default, we're using [`AsyncStorage`](https://facebook.github.io/react-native/docs/asyncstorage.html) using a key that follows the pattern :

```javascript
abhoc-variant-${experiment}-${variant}
```

In the previous case, it would have been :

```
abhoc-variant-ListExperiment-ListView
```
