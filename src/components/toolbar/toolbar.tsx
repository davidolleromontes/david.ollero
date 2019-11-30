import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';

import colors from '../../assets/colors';
import dimensions from '../../assets/dimensions';

interface IProps {
  isFocused: boolean;
  onChangeFocus?: (isFocus: boolean) => void;
  onSubmit: (text: string) => void;
  onPressCamera: () => void;
}

let input: any = undefined;

const Toolbar: FC<IProps> = (props) => {
  const [text, setText] = useState<string>();
  const { isFocused, onChangeFocus, onSubmit, onPressCamera } = props;

  const [t] = useTranslation();


  useEffect(() => {
    if (isFocused)
      input.focus();
    else
      input.blur();

  }, [isFocused])

  const handleChangeText = (text: string) => {
    setText(text);
  }
  const handleSubmitEditing = () => {
    if (!text) return;
    onSubmit(text);
    setText('');
  }

  const setInputRef = (ref: any) => {
    input = ref;
  }

  const handleFocus = () => { if (onChangeFocus) onChangeFocus(true) };
  const handleBlur = () => { if (onChangeFocus) onChangeFocus(false) };

  return (
    <View style={styles.toolbar}>
      {/* <ToolbarButton name={'photo-camera'} onPress={onPressCamera} /> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder={t('messages.typeSomething')}
          blurOnSubmit={false} // to allow multiple line in case we press the enter keyboard
          value={text}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          ref={setInputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimensions.horizontal / 2,
    paddingHorizontal: dimensions.horizontal / 2,
    backgroundColor: colors.white,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: dimensions.radius,
    paddingVertical: dimensions.miniSpace,
    paddingHorizontal: dimensions.space / 2,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  input: {
    flex: 1,
    fontSize: dimensions.horizontalSmall,
  },
});

export default Toolbar;