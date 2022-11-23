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
    'title'
  > {
  /**
   * Card header title
   */
  title?: React.ReactNode;

  /**
   * Set the card size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Set the card shape
   */
  shape?: 'square' | 'circle' | 'round';

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

/**
 * Card children props
 */
export interface CardChildrenProps
  extends Omit<CardProps, 'renderContainer' | 'renderMain' | 'renderHeader' | 'renderFooter'> {
  /**
   * Unique ID of card component
   */
  id: string;

  /**
   * Used to handle some common default events
   */
  handleEvent: typeof handleEvent;
}

/**
 * Card main props
 */
export type CardMainProps = CardChildrenProps;

/**
 * Card header props
 */
export type CardHeaderProps = CardChildrenProps;

/**
 * Card footer props
 */
export type CardFooterProps = CardChildrenProps;

/**
 * Card container props
 */
export type CardContainerProps = Pick<CardProps, 'ref'> & CardChildrenProps;

const Card: React.FC<CardProps> = ({
  ref,
  renderHeader,
  renderMain,
  renderFooter,
  renderContainer,
  ...args
}) => {
  const id = useId();
  const childrenProps = {...args, id, handleEvent};
  const headerElement = <>{renderHeader?.(childrenProps)}</>;
  const footerElement = <>{renderFooter?.(childrenProps)}</>;
  const mainElement = (
    <>
      {headerElement}
      {renderMain?.(childrenProps)}
      {footerElement}
    </>
  );

  const containerElement = (
    <>{renderContainer ? renderContainer?.({...childrenProps, ref}, mainElement) : mainElement}</>
  );

  return <>{containerElement}</>;
};

export default Card;
