import {bindEvents, handleDefaultEvent} from '@bearei/react-util/lib/event';
import {DetailedHTMLProps, HTMLAttributes, ReactNode, Ref, TouchEvent, useId} from 'react';
import type {GestureResponderEvent, ViewProps} from 'react-native';

/**
 * Base card props
 */
export interface BaseCardProps<T = HTMLElement>
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<T>, T> & ViewProps,
    'title' | 'onClick' | 'onTouchEnd' | 'onPress'
  > {
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

  /**
   * Call this function back when you click the card
   */
  onClick?: (e: React.MouseEvent<T, MouseEvent>) => void;

  /**
   * Call this function after pressing the card
   */
  onTouchEnd?: (e: TouchEvent<T>) => void;

  /**
   * Call this function after pressing the card -- react native
   */
  onPress?: (e: GestureResponderEvent) => void;
}

/**
 * Card props
 */
export interface CardProps<T> extends BaseCardProps<T> {
  /**
   * Render the card header
   */
  renderHeader?: (props: CardHeaderProps) => ReactNode;

  /**
   * Render the card main
   */
  renderMain?: (props: CardMainProps) => ReactNode;

  /**
   * Render the card footer
   */
  renderFooter?: (props: CardFooterProps) => ReactNode;

  /**
   * Render the card container
   */
  renderContainer?: (props: CardContainerProps<T>) => ReactNode;
}

/**
 * Card children props
 */
export interface CardChildrenProps extends Omit<BaseCardProps, 'ref'> {
  /**
   * The unique ID of the component
   */
  id: string;
  children?: ReactNode;
}

export type CardMainProps = CardChildrenProps;
export type CardHeaderProps = CardChildrenProps;
export type CardFooterProps = CardChildrenProps;
export type CardContainerProps<T> = CardChildrenProps & Pick<BaseCardProps<T>, 'ref'>;

const Card = <T extends HTMLElement>(props: CardProps<T>) => {
  const {
    ref,
    loading,
    renderHeader,
    renderMain,
    renderFooter,
    renderContainer,
    onClick,
    onTouchEnd,
    onPress,
    ...args
  } = props;

  const id = useId();
  const events = Object.keys(props).filter(key => key.startsWith('on'));
  const childrenProps = {...args, loading, id};

  const handleCallback = (key: string) => {
    const handleResponse = <E,>(e: E, callback?: (e: E) => void) => {
      const response = !loading;

      response && callback?.(e);
    };

    const event = {
      onClick: handleDefaultEvent((e: React.MouseEvent<T, MouseEvent>) =>
        handleResponse(e, onClick),
      ),
      onTouchEnd: handleDefaultEvent((e: TouchEvent<T>) => handleResponse(e, onTouchEnd)),
      onPress: handleDefaultEvent((e: GestureResponderEvent) => handleResponse(e, onPress)),
    };

    return event[key as keyof typeof event];
  };

  const header = renderHeader?.(childrenProps);
  const footer = renderFooter?.(childrenProps);
  const main = renderMain?.(childrenProps);
  const content = (
    <>
      {header}
      {main}
      {footer}
    </>
  );

  const container = renderContainer?.({
    ...childrenProps,
    children: content,
    ref,
    ...bindEvents(events, handleCallback),
  });

  return <>{container}</>;
};

export default Card;
