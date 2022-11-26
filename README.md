# react-card

A basic card component that supports react and native react.

## Installation

> yarn add @bearei/react-card --save

## Parameters

| Name | Type | Required | Description |
| :-- | --: | --: | :-- |
| title | `ReactNode` | ✘ | Card header title |
| size | `small` `medium` `large` | ✘ | Set the card size |
| shape | `square` `circle` `round` | ✘ | Set the card shape |
| loading | `boolean` | ✘ | Loading can be used to display a placeholder while the card content is still loading |
| disabled | `boolean` | ✘ | Whether or not to disable the card |
| renderHeader | `(props: CardHeaderProps) => ReactNode` | ✘ | Render the card header |
| renderMain | `(props: CardMainProps) => ReactNode` | ✘ | Render the card main |
| renderFooter | `(props: CardFooterProps) => ReactNode` | ✘ | Render the card footer |
| renderContainer | `(props: CardContainerProps) => ReactNode` | ✘ | Render the card container |

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Card from '@bearei/react-card';

const card = (
  <Card
    title="card"
    renderHeader={({title}) => <div>{title}</div>}
    renderMain={({title}) => <div>{title}</div>}
    renderFooter={({title}) => <div>{title}</div>}
    renderContainer={({id, children}) => (
      <div data-id={id} tabIndex={1}>
        {children}
      </div>
    )}
  />
);

ReactDOM.render(card, container);
```
