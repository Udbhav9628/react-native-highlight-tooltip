#  React Native Highlight Tooltip ![npm](https://img.shields.io/npm/v/react-native-highlight-tooltip.svg)

React Native Highlight Tooltip let's you highlights specific UI components by simply taking a reference (ref) of the component.

### Table of Contents

  - [Installation](#installation)
  - [Screenshot](#screenshot)
  - [Example Usage](#example-usage)
  - [Props](#props)
  - [How it works](#how-it-works)

### Installation

```bash
npm i react-native-highlight-tooltip
```

### Screenshot


<img height ="400" src="example.gif" />


### Example Usage

```js
import {
  View,
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {articles} from '../5-instagram-feed/data';
import HighlightTooltip from 'react-native-highlight-tooltip';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../5-instagram-feed/components/Header';
import Article from '../5-instagram-feed/components/Article';
import Stories from '../5-instagram-feed/components/Stories';

export default function App() {
  const [tooltipText, setTooltipText] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [highlightRef, setHighlightRef] = useState(null);
  const [highlightVisible, setHighlightVisible] = useState(false);

 
  const [demoStep, setDemoStep] = useState('stories');

  // reference of components which you wanna highlight
  const stories = useRef(null);
  const posts = useRef(null);
  const camera = useRef(null);
  const message = useRef(null);

  const handleAppWalkthrough = (reference, tipText, tipPosition) => {
    setHighlightRef(reference);
    setTooltipText(tipText);
    setTooltipPosition(tipPosition);
  };

  useEffect(() => {
    if (highlightVisible === false) {
      Alert.alert('Demo', 'Start App Walkthrough', [
        {
          text: 'OK',
          onPress: () => {
            setHighlightVisible(true);
            handleAppWalkthrough(stories, 'This are Stories', 'bottom');
          },
        },
      ]);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Header cameraRef={camera} messageRef={message} />
      </View>

      <View ref={stories} style={styles.stories}>
        <Stories />
      </View>

      <View ref={posts}>
        <FlatList
          data={articles}
          renderItem={({item}) => <Article item={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <HighlightTooltip
        tooltipText={tooltipText}
        visible={highlightVisible}
        highlightRef={highlightRef}
        tooltipPosition={tooltipPosition}
        onPressHighlight={() => {
          if (demoStep === 'stories') {
            handleAppWalkthrough(posts, 'This are Posts', 'top');
            setDemoStep('posts');
          } else if (demoStep === 'posts') {
            handleAppWalkthrough(
              {
                reference: camera,
                style: {
                  margin: 10,
                },
              },
              'uploads Photos from here',
              'bottomRight',
            );
            setDemoStep('camera');
          } else if (demoStep === 'camera') {
            handleAppWalkthrough(
              {
                reference: message,
                style: {
                  margin: 10,
                },
              },
              'Open Your Messages From Here',
              'bottomLeft',
            );
            setDemoStep('message');
          } else if (demoStep === 'message') {
            Alert.alert('Demo', 'End Demo', [
              {
                text: 'OK',
                onPress: () => {
                  setHighlightVisible(false);
                },
              },
            ]);
          }
        }}
        arrowOffset={8}
        offset={8}
        customTooltip={{
          style: {
            height: 100,
            width: 200,
            paddingHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            borderRadius: 10,
          },
          textStyle: {
            color: 'white',
            fontSize: 16,
          },
          message: tooltipText,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 44,
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomColor: '#dbdbdb',
    justifyContent: 'space-between',
  },
  stories: {
    height: 104,
    paddingLeft: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: '#fafafa',
    borderBottomColor: '#dbdbdb',
  },
});

```

###  Props
| Prop name        | Type             | Default value                          | Description                                                                                                                                                                                                    |
| ---------------- | ---------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `visible` | `bool`  | `false` |Determines if the HighlightTooltip is visible. This prop is required. |
| |
| `highlightRef` | `ref of comp`  | `null` |A reference to the component that will be highlighted. |
| |
| `tooltipText` | `string`  | `none` |The text to be displayed in the tooltip. This will only be used if customTooltip is not provided. |
| |
| `tooltipPosition` | `string`  | `top` |Defines the position of the tooltip relative to the highlighted component. Acceptable values include: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'top', and 'bottom'. |
| |
| `offset` | `number`  | `0` |The offset of the tooltip from its default position, useful for fine-tuning the tooltip’s location. works only with: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'. |
| |
| `arrowOffset` | `number`  | `0` |The offset of the arrow on the tooltip from its default position. works only with: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'. |
| |
| `arrowOffset` | `string`  | `rgba(0, 0, 0, 0.5)` |The color of the overlay surrounding the highlighted component. |
| |
| `onPressHighlight` | `function`  | `null` |Callback function triggered when the highlighted component is pressed. |
| |
| `onRequestClose` | `function`  | `null` |Callback function triggered on hardware back press when the HighlightTooltip is visible. |
| |
| `customTooltip` | `object`  | `null` |Custom tooltip content and style. Must include style with height and width properties. The message property is required to display text. textStyle for message style. see [Example Usage](#example-usage) |
| |


### How It Works

Internally, `react-native-highlight-tooltip` leverages React's ref system to identify and measure the position and dimensions of the component you want to highlight. When a ref is passed to the `HighlightTooltip` component, it dynamically calculates the position of the tooltip relative to the highlighted component. The component overlays a semi-transparent backdrop across the screen, darkening everything except the highlighted area, which remains fully visible. The tooltip is then positioned near the highlighted component, with an arrow pointing towards it. This creates a clear visual focus on the component. The package also manages the touch and interaction behavior of the highlighted component, allowing you to control whether users can interact with it while the tooltip is displayed.

### Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue. Feel free to fork the repository and submit a pull request.