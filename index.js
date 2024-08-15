import {
  View,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Tooltip from './tooltip';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';

const index = ({
  offset,
  visible,
  tooltipText,
  arrowOffset,
  overlayColor,
  highlightRef,
  customTooltip,
  onRequestClose,
  tooltipPosition,
  onPressHighlight,
}) => {
  if (customTooltip) {
    const { style, component } = customTooltip;
    const { width, height } = style;
    if (component === undefined) {
      throw new Error(`The component of the custom tooltip is required.`);
    }
    if (style === undefined) {
      throw new Error(`The style of the custom tooltip is required.`);
    }
    if (height === undefined) {
      throw new Error(`The height of the custom tooltip is required.`);
    }
    if (width === undefined) {
      throw new Error(`The width of the custom tooltip is required.`);
    }
    if (width < 60) {
      throw new Error(
        `The width of the custom tooltip cannot be less than 60. Provided width: ${width}`,
      );
    }
  }

  const { style, component } = customTooltip || {};

  const [componentPositionOnScreen, setComponentPositionOnScreen] =
    useState(null);

  const [toolTipPosition, setToolTipPosition] = useState(null);
  const [toolTipArrowPosition, setToolTipArrowPosition] = useState(null);

  const measurePosition = useCallback(() => {
    if (highlightRef?.current && visible) {
      setTimeout(() => {
        highlightRef.current.setNativeProps({
          backgroundColor: 'transparent',
        });
        highlightRef.current.measure((x, y, width, height, pageX, pageY) => {
          if (
            componentPositionOnScreen?.x != pageX ||
            componentPositionOnScreen?.y != pageY ||
            componentPositionOnScreen?.width != width ||
            componentPositionOnScreen?.height != height
          ) {
            setComponentPositionOnScreen({
              x: pageX,
              y: pageY,
              height: height,
              width: width,
            });
          }
        });
      }, 0);
    }
  }, [highlightRef?.current, visible]);

  const measurePositionAndStyle = useCallback(() => {
    if (highlightRef?.reference?.current && visible) {
      setTimeout(() => {
        highlightRef.reference.current.setNativeProps({
          backgroundColor: 'transparent',
        });
        highlightRef.reference.current.measure(
          (x, y, width, height, pageX, pageY) => {
            setComponentPositionOnScreen({
              x:
                (highlightRef.style?.positionX || pageX) -
                ((highlightRef.style?.margin || 0) +
                  (highlightRef.style?.marginLeft || 0) || 0),
              y:
                (highlightRef.style?.positionY || pageY) -
                ((highlightRef.style?.margin || 0) +
                  (highlightRef.style?.marginTop || 0) || 0),
              height:
                (highlightRef.style.height || height) +
                (2 * (highlightRef.style?.margin || 0) +
                  (highlightRef.style?.marginBottom || 0) || 0) +
                (highlightRef.style?.marginTop || 0),
              width:
                (highlightRef.style.width || width) +
                (2 * (highlightRef.style?.margin || 0) +
                  (highlightRef.style?.marginRight || 0) || 0) +
                (highlightRef.style?.marginLeft || 0),
            });
          },
        );
      }, 0);
    }
  }, [highlightRef?.reference?.current, visible]);

  useEffect(() => {
    measurePosition();
  }, [measurePosition]);

  useEffect(() => {
    measurePositionAndStyle();
  }, [measurePositionAndStyle]);

  useLayoutEffect(() => {
    if (componentPositionOnScreen?.y && componentPositionOnScreen?.width) {
      if (tooltipPosition === 'topLeft') {
        if (customTooltip) {
          setToolTipArrowPosition({
            top: style?.height - 15,
            left: style.width - 40 + (arrowOffset || 0),
          });
          const position = {
            top: -(style?.height + 15) || -115,
            right:
              componentPositionOnScreen?.width / 2 - 30 + (offset || 0) || 0,
          };
          setToolTipPosition(position);
        } else {
          //Setting The Position Of TollTip Arrow
          setToolTipArrowPosition({
            top: 85,
            left: 180 + (arrowOffset || 0),
          });
          const position = {
            top: -115,
            right: componentPositionOnScreen?.width / 2 - 30 + (offset || 0),
          };
          setToolTipPosition(position);
        }
      } else if (tooltipPosition === 'topRight') {
        if (customTooltip) {
          setToolTipArrowPosition({
            top: style?.height - 15,
            right: style.width - 40 + (arrowOffset || 0),
          });
          const position = {
            top: -(style?.height + 15) || -115,
            left:
              componentPositionOnScreen?.width / 2 - 30 + (offset || 0) || 0,
          };
          setToolTipPosition(position);
        } else {
          //Setting The Position Of TollTip Arrow
          setToolTipArrowPosition({
            top: 85,
            right: 180 + (arrowOffset || 0),
          });
          const position = {
            top: -115,
            left: componentPositionOnScreen?.width / 2 - 30 + (offset || 0),
          };
          setToolTipPosition(position);
        }
      } else if (tooltipPosition === 'bottomLeft') {
        if (customTooltip) {
          //Setting The Position Of TollTip Arrow
          setToolTipArrowPosition({
            top: -5,
            left: style.width - 40 + (arrowOffset || 0),
          });
          const position = {
            bottom: -(style?.height + 15) || -120,
            right:
              componentPositionOnScreen?.width / 2 - 30 + (offset || 0) || 0,
          };
          setToolTipPosition(position);
        } else {
          //Setting The Position Of TollTip Arrow
          setToolTipArrowPosition({
            top: -5,
            left: 180 + (arrowOffset || 0),
          });
          const position = {
            bottom: -(style?.height + 10) || -115,
            right: componentPositionOnScreen?.width / 2 - 30 + (offset || 0),
          };
          setToolTipPosition(position);
        }
      } else if (tooltipPosition === 'bottomRight') {
        if (customTooltip) {
          //Setting The Position Of TollTip Arrow
          setToolTipArrowPosition({
            top: -5,
            right: style.width - 40 + (arrowOffset || 0),
          });
          const position = {
            bottom: -(style?.height + 15) || -120,
            left:
              componentPositionOnScreen?.width / 2 - 30 + (offset || 0) || 0,
          };
          setToolTipPosition(position);
        } else {
          //Setting The Position Of TollTip Arrow
          setToolTipArrowPosition({
            top: -5,
            right: 180 + (arrowOffset || 0),
          });
          const position = {
            bottom: -(style?.height + 10) || -115, // Remove this Style From EveryWhere, it's not needed and Vice Versa Remove also
            left: componentPositionOnScreen?.width / 2 - 30 + (offset || 0),
          };
          setToolTipPosition(position);
        }
      } else if (tooltipPosition === 'bottom') {
        if (customTooltip) {
          //Setting The Position Of TollTip Arrow
          setToolTipArrowPosition({
            top: -5,
            left: style?.width / 2 - 10 || 0,
          });
          const position = {
            bottom: -(style?.height + 15) || -120,
            left: componentPositionOnScreen?.width / 2 - style.width / 2,
          };
          setToolTipPosition(position);
        } else {
          //Setting The Position Of TollTip Arrow
          setToolTipArrowPosition({
            top: -5,
            left: 100,
          });
          const position = {
            bottom: -(style?.height + 10) || -115, // Remove this Style From EveryWhere, it's not needed and Vice Versa Remove also
            left: componentPositionOnScreen?.width / 2 - 110 || 0,
          };
          setToolTipPosition(position);
        }
      } else {
        if (customTooltip) {
          setToolTipArrowPosition({
            top: style?.height - 15,
            left: style?.width / 2 - 10 || 0,
          });
          const position = {
            top: -(style?.height + 15) || -115,
            left: componentPositionOnScreen?.width / 2 - style.width / 2,
          };
          setToolTipPosition(position);
        } else {
          //Setting The Position Of TollTip Arrow
          setToolTipArrowPosition({
            top: 85,
            left: 97,
          });
          const position = {
            top: -(component && style?.height ? style.height + 12 : 115),
            left: componentPositionOnScreen?.width / 2 - 110 || 0,
          };
          setToolTipPosition(position);
        }
      }
    }
  }, [componentPositionOnScreen, style, tooltipPosition, arrowOffset, offset]);

  if (visible) {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          onRequestClose();
        }}>
        <StatusBar
          animated={true}
          backgroundColor={overlayColor || 'rgba(0, 0, 0, 0.5)'}
        />
        {componentPositionOnScreen ? (
          <View style={styles.container}>
            {/* top overlay */}
            <View
              style={{
                backgroundColor: overlayColor || 'rgba(0, 0, 0, 0.5)',
                height: componentPositionOnScreen?.y,
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
              }}></View>
            {/* bottom overlay */}
            <View
              style={{
                backgroundColor: overlayColor || 'rgba(0, 0, 0, 0.5)',
                height: '100%',
                width: '100%',
                position: 'absolute',
                top:
                  componentPositionOnScreen?.y +
                  componentPositionOnScreen?.height,
                left: 0,
              }}></View>
            {/* right Side */}
            <View
              style={{
                backgroundColor: overlayColor || 'rgba(0, 0, 0, 0.5)',
                height: componentPositionOnScreen?.height,
                width: '100%',
                position: 'absolute',
                top: componentPositionOnScreen?.y,
                left:
                  componentPositionOnScreen?.x +
                  componentPositionOnScreen?.width,
              }}></View>
            {/* left Side */}
            <View
              style={{
                backgroundColor: overlayColor || 'rgba(0, 0, 0, 0.5)',
                height: componentPositionOnScreen?.height,
                width: componentPositionOnScreen?.x,
                position: 'absolute',
                top: componentPositionOnScreen?.y,
                left: 0,
              }}></View>

            <View
              style={{
                position: 'absolute',
                top: componentPositionOnScreen?.y,
                left: componentPositionOnScreen?.x,
                height: componentPositionOnScreen?.height,
                width: componentPositionOnScreen?.width,
                backgroundColor: 'transparent',
                zIndex: 99,
              }}>
              {/* ToolTip */}
              {component ? (
                <View
                  style={[
                    style,
                    {
                      position: 'absolute',
                      zIndex: 99,
                      backgroundColor: style?.backgroundColor || 'white',
                      ...toolTipPosition,
                    },
                  ]}>
                  {component}
                  <View
                    style={{
                      ...toolTipArrowPosition,
                      width: 20,
                      height: 20,
                      zIndex: -1,
                      position: 'absolute',
                      backgroundColor: style?.backgroundColor || 'white',
                      transform: [{rotate: '45deg'}],
                    }}></View>
                </View>
              ) : (
                toolTipPosition && (
                  <Tooltip
                    tooltipStyle={{
                      position: 'absolute',
                      height: 100,
                      width: 220,
                      padding: 15,
                      zIndex: 99,
                      backgroundColor: 'black',
                      borderRadius: 10,
                      ...toolTipPosition,
                    }}
                    arrowStyle={{
                      ...toolTipArrowPosition,
                      width: 20,
                      height: 20,
                      zIndex: -1,
                      position: 'absolute',
                      backgroundColor: 'black',
                      transform: [{rotate: '45deg'}],
                    }}
                    message={tooltipText}
                  />
                )
              )}
              <TouchableOpacity
                onPress={() => {
                  if (onPressHighlight) {
                    onPressHighlight();
                  }
                }}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                }}></TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: overlayColor || 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            }}></View>
        )}
      </Modal>
    );
  }
};

index.propTypes = {
  tooltipPosition: PropTypes.oneOf([
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'top',
    'bottom',
  ]),
  visible: PropTypes.bool.isRequired,
  highlightRef: PropTypes.object.isRequired,
  tooltipText: PropTypes.string,
  offset: PropTypes.number,
  arrowOffset: PropTypes.number,
  overlayColor: PropTypes.string,
  onPressHighlight: PropTypes.func,
  customTooltip: PropTypes.shape({
    style: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: function (props, propName, componentName) {
        if (!props[propName]) {
          return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Width is required.`,
          );
        }
        if (props[propName] < 60) {
          return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Width should not be less than 60.`,
          );
        }
      },
      padding: PropTypes.number,
      borderRadius: PropTypes.number,
      backgroundColor: PropTypes.string,
    }).isRequired,
    component: PropTypes.element.isRequired,
  }),
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
