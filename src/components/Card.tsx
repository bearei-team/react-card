import {useId} from 'react';
import type {DetailedHTMLProps, HTMLAttributes, ReactNode, Ref} from 'react';
import type {ViewProps} from 'react-native';
import handleEvent from '@bearei/react-util/lib/event';
import type {HandleEvent} from '@bearei/react-util/lib/event';

/**
 * Base card props
 */
export interface BaseCardProps<T>
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & ViewProps,
    'title' | 'ref'
  > {
  /**
   * Custom button ref
   */
  ref?: Ref<T>;

  /**
   * Card header title
   */
  title?: ReactNode;

  /**
   * Set the button size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Set the button shape
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
}

/**
 * Card props
 */
export interface CardProps<T> extends BaseCardProps<T> {
  /**
   * Render the card header
   */
  renderHeader?: (props: CardHeaderProps<T>) => React.ReactNode;

  /**
   * Render the card main
   */
  renderMain?: (props: CardMainProps<T>) => React.ReactNode;

  /**
   * Render the card footer
   */
  renderFooter?: (props: CardHeaderProps<T>) => React.ReactNode;

  /**
   * Render the card container
   */
  renderContainer?: (props: CardContainerProps<T>, element?: React.ReactNode) => React.ReactNode;
}

/**
 * Card children props
 */
export interface CardChildrenProps<T>
  extends Omit<
    CardProps<T>,
    'renderContainer' | 'renderMain' | 'renderHeader' | 'renderFooter' | 'ref'
  > {
  /**
   * Unique ID of card component
   */
  id: string;

  /**
   * Used to handle some common default events
   */
  handleEvent: HandleEvent;
}

/**
 * Card main props
 */
export type CardMainProps<T> = CardChildrenProps<T>;

/**
 * Card header props
 */
export type CardHeaderProps<T> = CardChildrenProps<T>;

/**
 * Card footer props
 */
export type CardFooterProps<T> = CardChildrenProps<T>;

/**
 * Card container props
 */
export type CardContainerProps<T> = Pick<CardProps<T>, 'ref'> & CardChildrenProps<T>;

function Card<T>({
  ref,
  renderHeader,
  renderMain,
  renderFooter,
  renderContainer,
  ...args
}: CardProps<T>) {
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
    <>{renderContainer?.({...childrenProps, ref}, mainElement) ?? mainElement}</>
  );

  return <>{containerElement}</>;
}

export default Card;
