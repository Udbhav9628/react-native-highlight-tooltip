import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Tooltip = ({tooltipStyle, message, arrowStyle}) => {
  return (
    <View style={tooltipStyle}>
      <Text numberOfLines={3} style={styles.message}>
        {message}
      </Text>
      <View style={{...arrowStyle}}></View>
    </View>
  );
};

export default Tooltip;

const styles = StyleSheet.create({
  message: {
    color: 'white',
    textAlign: 'justify',
    fontWeight: '600',
    lineHeight: 20,
  },
});