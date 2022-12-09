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
   * Card title
   */
  title?: ReactNode;

  /**
   * Card size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Card shape
   */
  shape?: 'square' | 'circle' | 'round';

  /**
   * Whether the card is loading
   */
  loading?: boolean;

  /**
   * Whether or not to disable the card
   */
  disabled?: boolean;

  /**
   * Card content
   */
  content?: ReactNode;

  /**
   * This function is called when card is clicked
   */
  onClick?: (e: React.MouseEvent<T, MouseEvent>) => void;

  /**
   * This function is called when the card is pressed
   */
  onTouchEnd?: (e: TouchEvent<T>) => void;

  /**
   * This function is called when the card is pressed -- react native
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
   * Render the card footer
   */
  renderFooter?: (props: CardFooterProps) => ReactNode;

  /**
   * Render the card main
   */
  renderMain: (props: CardMainProps<T>) => ReactNode;

  /**
   * Render the card container
   */
  renderContainer: (props: CardContainerProps) => ReactNode;
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

export type CardHeaderProps = CardChildrenProps;
export type CardFooterProps = CardChildrenProps;
export interface CardMainProps<T>
  extends Partial<CardChildrenProps & Pick<BaseCardProps<T>, 'ref'>> {
  /**
   * Card header
   */
  header?: ReactNode;

  /**
   * Card footer
   */
  footer?: ReactNode;
}

export type CardContainerProps = CardChildrenProps;

const Card = <T extends HTMLElement>(props: CardProps<T>) => {
  const {
    ref,
    loading,
    disabled,
    onClick,
    onPress,
    onTouchEnd,
    renderHeader,
    renderMain,
    renderFooter,
    renderContainer,
    ...args
  } = props;

  const id = useId();
  const events = Object.keys(props).filter(key => key.startsWith('on'));
  const childrenProps = {...args, loading, disabled, id};
  const handleResponse = <E,>(e: E, callback?: (e: E) => void) => {
    const isResponse = !disabled && !loading;

    isResponse && callback?.(e);
  };

  const handleCallback = (key: string) => {
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
  const main = renderMain({
    ...childrenProps,
    header,
    footer,
    ref,
    ...bindEvents(events, handleCallback),
  });

  const container = renderContainer({...childrenProps, children: main});

  return <>{container}</>;
};

export default Card;
