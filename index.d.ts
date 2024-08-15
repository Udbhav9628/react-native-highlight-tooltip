declare module 'react-native-highlight-tooltip' {
  import { Component } from 'react';
  import { GestureResponderEvent } from 'react-native';
  import React from 'react';

  interface CustomTooltipStyle {
    height: number;
    width: number;
    padding?: number;
    borderRadius?: number;
    backgroundColor?: string;
  }

  interface CustomTooltip {
    style: CustomTooltipStyle;
    component: React.ReactElement;
  }

  interface TooltipProps {
    visible: boolean;
    highlightRef: React.RefObject<any>;
    tooltipText?: string;
    offset?: number;
    arrowOffset?: number;
    overlayColor?: string;
    tooltipPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'top' | 'bottom';
    customTooltip?: CustomTooltip;
    onRequestClose?: () => void;
    onPressHighlight?: (event: GestureResponderEvent) => void;
  }

  export default class Tooltip extends Component<TooltipProps> {}
}