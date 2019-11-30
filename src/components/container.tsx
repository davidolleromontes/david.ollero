import React, { FC, Fragment } from 'react';
import { Alert, ImageBackground, ImageSourcePropType, KeyboardAvoidingView, RegisteredStyle, ScrollView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, SafeAreaViewForceInsetValue } from 'react-navigation';

import { ChildrenType, ChildType } from '../types/components';
import { isAndroid, isIOS } from '../utils/device';

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  children: {
    flex: 1,
    // paddingVertical: dimensions.vertical,
    // paddingHorizontal: dimensions.horizontal,
  },
});
/**
 * component with scroll and safe area
 * manages keyboard aware
 * tob bar, safe area background color (top and/or bottom)
 */
interface IProps {
  children: ChildType | ChildrenType | ChildrenType[];
  header?: ChildrenType;
  forceInset?: SafeAreaViewForceInsetValue;
  topColor?: string;
  bottomColor?: string;
  backgroundColor?: string;
  style?: ViewStyle | ViewStyle[] | RegisteredStyle<any>;
  darkTop?: boolean; // set true to reverse top bar icons color
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled' | undefined; // TODO get from react
  removeScroll?: boolean; // set true to enable scroll
  withKeyboard?: boolean; // set true to enable aware keyboard
  backgroundImage?: ImageSourcePropType; // set image as background, removeSafe = true in this case, calculate
  removeSafeArea?: boolean; // remove safe area, if necesary
}
const Container: FC<IProps> = props => {
  const {
    children,
    header,
    forceInset = {},
    topColor,
    bottomColor,
    backgroundColor = 'white',
    keyboardShouldPersistTaps = 'handled',
    style,
    darkTop,
    removeScroll,
    withKeyboard,
    backgroundImage,
    removeSafeArea,
  } = props;
  const behavior = isIOS ? 'position' : undefined;
  const childrenCover = withKeyboard ? (
    <KeyboardAvoidingView behavior={behavior} style={[styles.children, { backgroundColor }, style]}>
      {children}
    </KeyboardAvoidingView>
  ) : (
      <View style={[styles.children, { backgroundColor }, style]}>{children}</View>
    );

  const content = (
    <>
      <StatusBar
        // hidden={true}
        barStyle={darkTop ? 'light-content' : 'dark-content'}
        backgroundColor={isAndroid ? topColor || backgroundColor || 'white' : undefined}
      />
      {!!header && header}
      {
        removeScroll ? (
          <View style={styles.content}>{childrenCover}</View>
        ) : (
            <ScrollView
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.content} // TODO check on ios
              alwaysBounceVertical={false}
            >
              {childrenCover}
            </ScrollView>
          )
      }
    </>
  );

  // if has image background or dont have safe area
  if (removeSafeArea || backgroundImage) {
    return backgroundImage ? (
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
        {content}
      </ImageBackground>
    ) : (
        <View>{content}</View>
      );
  }

  return (
    <Fragment>
      <SafeAreaView
        forceInset={forceInset}
        style={[styles.safeArea, { backgroundColor: topColor || backgroundColor || 'white' }]}
      />
      <SafeAreaView
        forceInset={forceInset}
        style={[styles.container, { backgroundColor: bottomColor || backgroundColor || 'white' }]}
      >
        {content}
      </SafeAreaView>
    </Fragment>
  );
};

export default Container;