import type {HandleEvent} from '@bearei/react-util/lib/event';
import handleEvent from '@bearei/react-util/lib/event';
import type {DetailedHTMLProps, HTMLAttributes, ReactNode, Ref} from 'react';
import {useId} from 'react';
import type {ViewProps} from 'react-native';

/**
 * Base card props
 */
export interface BaseCardProps<T>
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & ViewProps,
    'title' | 'ref'
  > {
  ref?: Ref<T>;

  /**
   * Card header title
   */
  title?: ReactNode;

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
   * The main area content of the card
   */
  content?: ReactNode;
}

/**
 * Card props
 */
export interface CardProps<T> extends BaseCardProps<T> {
  /**
   * Render the card header
   */
  renderHeader?: (props: CardHeaderProps<T>) => ReactNode;

  /**
   * Render the card main
   */
  renderMain?: (props: CardMainProps<T>) => ReactNode;

  /**
   * Render the card footer
   */
  renderFooter?: (props: CardFooterProps<T>) => ReactNode;

  /**
   * Render the card container
   */
  renderContainer?: (props: CardContainerProps<T>) => ReactNode;
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
   * The unique ID of the component
   */
  id: string;
  children?: ReactNode;

  /**
   * Used to handle some common default events
   */
  handleEvent: HandleEvent;
}

export type CardMainProps<T> = CardChildrenProps<T>;
export type CardHeaderProps<T> = CardChildrenProps<T>;
export type CardFooterProps<T> = CardChildrenProps<T>;
export type CardContainerProps<T> = Pick<CardProps<T>, 'ref'> & CardChildrenProps<T>;

function Card<T>({
  ref,
  renderHeader,
  renderMain,
  renderFooter,
  renderContainer,
  ...props
}: CardProps<T>) {
  const id = useId();
  const childrenProps = {...props, id, handleEvent};
  const header = renderHeader?.(childrenProps);
  const footer = renderFooter?.(childrenProps);
  const main = (
    <>
      {header}
      {renderMain?.(childrenProps)}
      {footer}
    </>
  );

  const container = renderContainer?.({...childrenProps, children: main, ref}) ?? main;

  return <>{container}</>;
}

export default Card;
