import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '_styles';
import { ActionIconWrapper, ImagePicker, Input } from '_atoms';

import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';

interface Props {}

const CreateScreen = (props: Props) => {
  const [image, setImage] = useState('');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={s.wrapper}>
        <View>
          <ActionIconWrapper
            onPress={() => props.navigation.goBack()}
            borderColor={Colors.WHITE}
            style={s.closeButton}>
            <Icon name="window-close" size={18} color={Colors.BLACK} />
          </ActionIconWrapper>
          <Text style={s.headerText}>Dodaj przepis</Text>
        </View>
        <ImagePicker image={image} parseImage={setImage} />

        <Formik
          initialValues={{
            title: '',
            ingredients: [{ name: '', quantity: '' }],
            steps: [''],
            public: true,
            protips: '',
            categories: [],
          }}
          onSubmit={values => console.log(values)}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View style={s.form}>
                <Input
                  label="Tytuł"
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                />
              </View>

              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <View style={s.ingredients}>
                    <Text style={s.areaTitle}>Składniki</Text>
                    {values.ingredients.map((ingredient, index) => (
                      <View style={s.ingredient}>
                        <Input
                          label="Nazwa"
                          onChangeText={handleChange(`ingredients[${index}].name`)}
                          onBlur={handleBlur(`ingredients[${index}].name`)}
                          value={ingredient.name}
                        />
                        <Input
                          label="Ilosc"
                          onChangeText={handleChange(`ingredients[${index}].quantity`)}
                          onBlur={handleBlur(`ingredients[${index}].quantity`)}
                          value={ingredient.quantity}
                        />
                      </View>
                    ))}
                  </View>
                )}
              </FieldArray>
              {/*<ActionIconWrapper onPress={handleSubmit}>
                <Icon name="file-send-outline" size={18} color={Colors.BLACK} />
              </ActionIconWrapper> */}
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateScreen;

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 28,
    right: 24,
    zIndex: 10,
  },
  headerText: {
    fontSize: Typography.FONT_SIZE_HEADER,
    color: Colors.BLACK,
    ...Typography.FONT_MEDIUM,
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  form: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  ingredients: {
    marginHorizontal: 8,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    paddingVertical: 22,
    paddingHorizontal: 14,
    minHeight: 300,
  },
  areaTitle: {
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_SEMIHEADER,
  },
  ingredient: {
  }
});
