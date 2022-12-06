# react-card

Base card components that support React and React native

## Installation

> yarn add @bearei/react-card --save

## Parameters

| Name | Type | Required | Description |
| :-- | --: | --: | :-- |
| title | `ReactNode` | ✘ | Card title |
| size | `small` `medium` `large` | ✘ | Card size |
| shape | `square` `circle` `round` | ✘ | Card shape |
| loading | `boolean` | ✘ | Whether the card is loading |
| disabled | `boolean` | ✘ | Whether or not to disable the card |
| content | `ReactNode` | ✘ | Card content |
| onClick | `(e: React.MouseEvent) => void` | ✘ | This function is called when card is clicked |
| onTouchEnd | `(e: React.TouchEvent) => void` | ✘ | This function is called when the card is pressed |
| onPress | `(e: GestureResponderEvent) => void` | ✘ | This function is called when the card is pressed -- react native |
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
