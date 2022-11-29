import type {HandleEvent} from '@bearei/react-util/lib/event';
import handleEvent from '@bearei/react-util/lib/event';
import type {DetailedHTMLProps, HTMLAttributes, ReactNode, Ref} from 'react';
import {useId} from 'react';
import type {ViewProps} from 'react-native';

/**
 * Base card props
 */
export interface BaseCardProps<T, E>
  extends Omit<DetailedHTMLProps<HTMLAttributes<T>, T> & ViewProps, 'title'> {
  /**
   * Custom ref
   */
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
export interface CardProps<T, E> extends BaseCardProps<T, E> {
  /**
   * Render the card header
   */
  renderHeader?: (props: CardHeaderProps<T, E>) => ReactNode;

  /**
   * Render the card main
   */
  renderMain?: (props: CardMainProps<T, E>) => ReactNode;

  /**
   * Render the card footer
   */
  renderFooter?: (props: CardFooterProps<T, E>) => ReactNode;

  /**
   * Render the card container
   */
  renderContainer?: (props: CardContainerProps<T, E>) => ReactNode;
}

/**
 * Card children props
 */
export interface CardChildrenProps<T, E> extends Omit<BaseCardProps<T, E>, 'ref'> {
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

export type CardMainProps<T, E> = CardChildrenProps<T, E>;
export type CardHeaderProps<T, E> = CardChildrenProps<T, E>;
export type CardFooterProps<T, E> = CardChildrenProps<T, E>;
export type CardContainerProps<T, E> = CardChildrenProps<T, E> & Pick<BaseCardProps<T, E>, 'ref'>;

function Card<T, E = React.MouseEvent<T, MouseEvent>>({
  ref,
  renderHeader,
  renderMain,
  renderFooter,
  renderContainer,
  ...props
}: CardProps<T, E>) {
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
