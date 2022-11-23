import '@testing-library/jest-dom';
import {render} from '../utils/testUtils';
import Card from '../../src/components/Card';
import React from 'react';

describe('test/components/Card.test.ts', () => {
  test('It should be a render card', async () => {
    const {getByDataCy} = render(
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
      />,
    );

    expect(getByDataCy('container')).toHaveAttribute('tabIndex');
    expect(getByDataCy('header')).toHaveTextContent('card');
    expect(getByDataCy('footer')).toHaveTextContent('card');
    expect(getByDataCy('card')).toHaveTextContent('card');
  });
});
