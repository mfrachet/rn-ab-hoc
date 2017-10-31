[![Build Status](https://travis-ci.org/mfrachet/rn-ab-hoc.svg?branch=master)](https://travis-ci.org/mfrachet/rn-ab-hoc)
[![Coverage Status](https://coveralls.io/repos/github/mfrachet/rn-ab-hoc/badge.svg?branch=master)](https://coveralls.io/github/mfrachet/rn-ab-hoc?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Poor intrusive way to make A/B Testing by using an `HoC` instead of components.

---
<p align="center">
<img height="300" src="https://img4.hostingpics.net/pics/219640VariantFlatList.gif"/>
<img height="300" src="https://img4.hostingpics.net/pics/966777VariantListView.gif"/>
</p>

---




# Usage

### Installation

```
$ npm install --save rn-ab-hoc
```

### Component


```javascript
/* list.js */

import abConnect from 'rn-ab-hoc';
import FlatList from './flatList.js';
import ListView rom './listView.js';
import OtherList rom './otherList.js';

export default abConnect('ListExperiment',
 { variant: 'FlatList', component: FlatList },
 { variant: 'ListView', component: ListView },
 { variant: 'OtherList', component: OtherList }
);
```

The previous code defines :

- An experiment name
- A list of different variants with their names and associated components

### Using a random variant


```javascript
/* app.js */

import React from 'react';
import List from './list';

export default function App() {
    return (
      <List />
    );
}
```

This will load one of the three previous components (variants) defined using a [randomize function](https://github.com/mfrachet/rn-ab-hoc/blob/master/src/reactNativeAbHoc.js#L16)

### Forcing a variant

```javascript
/* app.js */

import React from 'react';
import List from './list';

export default function App() {
    return (
      <List variant="FlatList" />
    );
}
```

This will force a specific variant (maybe sent by your backend) to be used inside the app.

*Note that the forced variant takes over the random one. If you set a variant by forcing it, the previous random one will be erased and replaced by the forced one. Inverse is not true.*

### Which variant am I using ?

```javascript
/* app.js */

import React from 'react';
import List from './list';

export default function App() {
    return (
      <List
        variant="FlatList"
        onVariantSelect={(variant) => console.log(variant)}
      />
    );
}
```

This will print `FlatList`. It also work with random variants.


### Storage

The default storage system is  [`AsyncStorage`](https://facebook.github.io/react-native/docs/asyncstorage.html) with a key that follows the pattern :

```javascript
abhoc-variant-${experiment}
```

In the previous case, it would have been :

```
abhoc-variant-ListExperiment
```
