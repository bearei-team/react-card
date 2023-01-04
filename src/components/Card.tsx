import {
  bindEvents,
  handleDefaultEvent,
} from '@bearei/react-util/lib/commonjs/event';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
  TouchEvent,
  useId,
} from 'react';
import type { GestureResponderEvent, ViewProps } from 'react-native';

/**
 * Base card props
 */
export interface BaseCardProps<T>
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
  onClick?: (e: MouseEvent<T>) => void;

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
  renderHeader?: (props: CardHeaderProps<T>) => ReactNode;

  /**
   * Render the card footer
   */
  renderFooter?: (props: CardFooterProps<T>) => ReactNode;

  /**
   * Render the card main
   */
  renderMain: (props: CardMainProps<T>) => ReactNode;

  /**
   * Render the card container
   */
  renderContainer: (props: CardContainerProps<T>) => ReactNode;
}

/**
 * Card children props
 */
export interface CardChildrenProps<T> extends Omit<BaseCardProps<T>, 'ref'> {
  /**
   * The unique ID of the component
   */
  id: string;
  children?: ReactNode;
}

export type CardHeaderProps<T> = CardChildrenProps<T>;
export type CardFooterProps<T> = CardChildrenProps<T>;
export interface CardMainProps<T>
  extends Partial<CardChildrenProps<T> & Pick<BaseCardProps<T>, 'ref'>> {
  /**
   * Card header
   */
  header?: ReactNode;

  /**
   * Card footer
   */
  footer?: ReactNode;
}

export type CardContainerProps<T> = CardChildrenProps<T>;
export type EventType = 'onClick' | 'onPress' | 'onTouchEnd';

const Card = <T extends HTMLElement = HTMLElement>(props: CardProps<T>) => {
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
  const bindEvenNames = ['onClick', 'onPress', 'onTouchEnd'];
  const eventNames = Object.keys(props).filter(key =>
    bindEvenNames.includes(key),
  ) as EventType[];

  const childrenProps = { ...args, loading, disabled, id };
  const handleResponse = <E,>(e: E, callback?: (e: E) => void) => {
    const isResponse = !disabled && !loading;

    isResponse && callback?.(e);
  };

  const handleCallback = (event: EventType) => {
    const eventFunctions = {
      onClick: handleDefaultEvent((e: MouseEvent<T>) =>
        handleResponse(e, onClick),
      ),
      onTouchEnd: handleDefaultEvent((e: TouchEvent<T>) =>
        handleResponse(e, onTouchEnd),
      ),
      onPress: handleDefaultEvent((e: GestureResponderEvent) =>
        handleResponse(e, onPress),
      ),
    };

    return eventFunctions[event];
  };

  const header = renderHeader?.(childrenProps);
  const footer = renderFooter?.(childrenProps);
  const main = renderMain({
    ...childrenProps,
    ref,
    header,
    footer,
    ...(bindEvents(eventNames, handleCallback) as {
      onClick?: (e: MouseEvent<T>) => void;
      onTouchEnd?: (e: TouchEvent<T>) => void;
      onPress?: (e: GestureResponderEvent) => void;
    }),
  });

  const container = renderContainer({ ...childrenProps, children: main });

  return <>{container}</>;
};

export default Card;
