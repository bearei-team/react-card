import * as React from 'react';
import {useId} from 'react';
import {ViewProps} from 'react-native';
import {handleEvent} from '@bearei/react-util/lib/event';

/**
 * Card props
 */
export interface CardProps
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & ViewProps,
    ''
  > {
  /**
   * Card header title
   */
  title?: string;

  /**
   * Set the card size
   */
  size?: 'default' | 'small' | 'large';

  /**
   * Set the card shape
   */
  shape?: 'default' | 'circle' | 'round';

  /**
   * Loading can be used to display a placeholder while the card content is still loading
   */
  loading?: boolean;

  /**
   * Whether or not to disable the card
   */
  disabled?: boolean;

  /**
   * Render the card header
   */
  renderHeader?: (props: CardHeaderProps) => React.ReactNode;

  /**
   * Render the card main
   */
  renderMain?: (props: CardMainProps) => React.ReactNode;

  /**
   * Render the card footer
   */
  renderFooter?: (props: CardHeaderProps) => React.ReactNode;

  /**
   * Render the card container
   */
  renderContainer?: (props: CardContainerProps, element?: React.ReactNode) => React.ReactNode;
}

export interface CardChildrenProps
  extends Omit<
    CardProps,
    'renderContainer' | 'renderMain' | 'renderHeader' | 'renderFooter' | 'ref'
  > {
  /**
   * Unique ID of card component
   */
  id: string;

  /**
   * Used to handle some common default events.
   */
  handleEvent: typeof handleEvent;
}

/**
 * Card main props
 */
export type CardMainProps = CardChildrenProps;

/**
 * Card container props
 */
export type CardContainerProps = CardChildrenProps;

/**
 * Card header props
 */
export type CardHeaderProps = CardChildrenProps;

/**
 * Card footer props
 */
export type CardFooterProps = CardChildrenProps;

const Card: React.FC<CardProps> = ({
  renderHeader,
  renderContainer,
  renderMain,
  renderFooter,
  ...args
}) => {
  const id = useId();
  const childrenProps = {...args, id, handleEvent};
  const headerElement = <>{renderHeader?.(childrenProps)}</>;
  const renderElement = <>{renderFooter?.(childrenProps)}</>;
  const mainElement = (
    <>
      {headerElement}
      {renderMain?.(childrenProps)}
      {renderElement}
    </>
  );

  const containerElement = renderContainer ? (
    renderContainer?.(childrenProps, mainElement)
  ) : (
    <>{mainElement}</>
  );

  return <>{containerElement}</>;
};

export default Card;
