# react-card

A basic card component that supports react and native react.

## Installation

> yarn add @bearei/react-card --save

## Parameters

| Name | Type | Required | Description |
| :-- | --: | --: | :-- |
| title | React.ReactNode | ✘ | Card header title |
| size | 'small','medium','large' | ✘ | Set the card size |
| shape | 'square','circle','round' | ✘ | Set the card shape |
| loading | boolean | ✘ | Loading can be used to display a placeholder while the card content is still loading |
| disabled | boolean | ✘ | Whether or not to disable the card |
| renderHeader | function(props) | ✘ | Render the card header |
| renderMain | function(props) | ✘ | Render the card main |
| renderFooter | function(props) | ✘ | Render the card footer |
| renderContainer | function(props,element) | ✘ | Render the card container |

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
