# react-card

A basic card component that supports react and native react.

## Installation

> yarn add @bearei/react-card --save

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Card from '@bearei/react-card';

const card = (
  <Card
    title="card"
    renderHeader={({title}) => <div data-cy="header">{title}</div>}
    renderMain={({title}) => <div data-cy="card">{title}</div>}
    renderFooter={({title}) => <div data-cy="footer">{title}</div>}
    renderContainer={({id}, element) => (
      <div data-cy="container" data-id={id} tabIndex={1}>
        {element}
      </div>
    )}
  />
);

ReactDOM.render(card, container);
```
