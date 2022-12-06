import '@testing-library/jest-dom';
import React from 'react';
import Card from '../../src/components/Card';
import {render} from '../utils/testUtils';
import userEvent from '@testing-library/user-event';

describe('test/components/Card.test.ts', () => {
  test('It should be a render card', async () => {
    const {getByDataCy} = render(
      <Card
        title="card"
        renderHeader={({title}) => <div data-cy="header">{title}</div>}
        renderMain={({title}) => <div data-cy="card">{title}</div>}
        renderFooter={({title}) => <div data-cy="footer">{title}</div>}
        renderContainer={({id, children}) => (
          <div data-cy="container" data-id={id} tabIndex={1}>
            {children}
          </div>
        )}
      />,
    );

    expect(getByDataCy('container')).toHaveAttribute('tabIndex');
    expect(getByDataCy('header')).toHaveTextContent('card');
    expect(getByDataCy('footer')).toHaveTextContent('card');
    expect(getByDataCy('card')).toHaveTextContent('card');
  });

  test('It should be a card click', async () => {
    const user = userEvent.setup();
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Card
        onClick={e => (eventType = e?.type)}
        renderMain={({title}) => <div data-cy="card">{title}</div>}
        renderContainer={({id, children, onClick}) => (
          <div data-cy="container" data-id={id} tabIndex={1} onClick={onClick}>
            {children}
          </div>
        )}
      />,
    );

    await user.click(getByDataCy('container'));
    expect(eventType).toEqual('click');
  });

  test('It should be a card disabled', async () => {
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Card
        disabled
        onClick={e => (eventType = e?.type)}
        renderMain={({title}) => <div data-cy="card">{title}</div>}
        renderContainer={({id, children, onClick}) => (
          <div data-cy="container" data-id={id} tabIndex={1} onClick={onClick}>
            {children}
          </div>
        )}
      />,
    );

    getByDataCy('container');
    expect(eventType).toEqual(undefined);
  });

  test('It should be a card loading', async () => {
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Card
        loading
        onClick={e => (eventType = e?.type)}
        renderMain={({title}) => <div data-cy="card">{title}</div>}
        renderContainer={({id, children, onClick}) => (
          <div data-cy="container" data-id={id} tabIndex={1} onClick={onClick}>
            {children}
          </div>
        )}
      />,
    );

    getByDataCy('container');
    expect(eventType).toEqual(undefined);
  });
});
