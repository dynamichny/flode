import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as cookbookActions from '../../store/actions/cookbook';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Colors, Typography } from '_styles';
import { Input, Button, ActionIconWrapper, StepCreateTextarea } from '_atoms';
import { ModalHeader, IngredientFormField, CategoryCheckbox } from '_molecules';
import { ImagePicker } from '_organisms';

import { Formik, FieldArray } from 'formik';

const selectCategories = state => state.categories.items;

const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}>
      <View style={s.wrapper}>
        <ModalHeader
          title={'Dodaj przepis'}
          goBack={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={s.scrollView}>
          <Formik
            initialValues={{
              images: [],
              title: '',
              ingredients: [
                {
                  name: '',
                  quantity: '',
                  unit: '',
                  key: `ing_${String(Math.random())}`,
                },
              ],
              steps: [{ value: '', key: `step_${String(Math.random())}` }],
              public: true,
              categories: [],
            }}
            onSubmit={values => {
              // TODO: validate fields, min 1 step, min 1 ingredient, title, min 1 image
              dispatch(cookbookActions.addItem(values)).then(() => {
                navigation.goBack();
              });
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
              <>
                <ImagePicker
                  images={values.images}
                  parseImages={nextValue => setFieldValue('images', nextValue)}
                />
                <TouchableWithoutFeedback
                  onPress={Keyboard.dismiss}
                  accessible={false}>
                  <View style={{ flex: 1 }}>
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
                        <View style={s.section}>
                          <Text style={s.sectionTitle}>Składniki</Text>
                          {values.ingredients.map((ingredient, index) => (
                            <IngredientFormField
                              ingredient={ingredient}
                              index={index}
                              key={ingredient.key}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                              handleRemove={() => {
                                remove(index);
                              }}
                            />
                          ))}
                          <ActionIconWrapper
                            onPress={() =>
                              push({
                                name: '',
                                quantity: '',
                                unit: '',
                                key: `ing_${String(Math.random())}`,
                              })
                            }
                            style={s.appendButton}>
                            <Icon name="plus" size={18} color={Colors.BLACK} />
                          </ActionIconWrapper>
                        </View>
                      )}
                    </FieldArray>
                    <FieldArray name="steps">
                      {({ push, remove }) => (
                        <View style={s.section}>
                          <Text style={s.sectionTitle}>Kroki wykonania</Text>
                          {values.steps.map((step, index) => (
                            <StepCreateTextarea
                              value={step.value}
                              index={index}
                              key={step.key}
                              handleChange={handleChange(
                                `steps[${index}].value`,
                              )}
                              handleRemove={() => remove(index)}
                            />
                          ))}
                          <ActionIconWrapper
                            onPress={() =>
                              push({
                                value: '',
                                key: `step_${String(Math.random())}`,
                              })
                            }
                            style={s.appendButton}>
                            <Icon name="plus" size={18} color={Colors.BLACK} />
                          </ActionIconWrapper>
                        </View>
                      )}
                    </FieldArray>
                    <FieldArray name="categories">
                      {({ push, remove }) => (
                        <View style={s.section}>
                          <Text style={s.sectionTitle}>Kategorie</Text>
                          <View style={s.categories}>
                            {categories.map((category, index) => (
                              <CategoryCheckbox
                                checked={values.categories.find(
                                  id => id === category.id,
                                )}
                                onPress={() => {
                                  if (
                                    values.categories.find(
                                      id => id === category.id,
                                    )
                                  ) {
                                    remove(
                                      values.categories.findIndex(
                                        id => id == category.id,
                                      ),
                                    );
                                  } else {
                                    push(category.id);
                                  }
                                }}
                                category={category}
                                key={category.id}
                              />
                            ))}
                          </View>
                        </View>
                      )}
                    </FieldArray>

                    <Button
                      label={'Dodaj'}
                      onPress={handleSubmit}
                      style={{ marginHorizontal: 20 }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  section: {
    paddingVertical: 14,
    paddingBottom: 70,
  },
  sectionTitle: {
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_20,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.PRIMARY,
    textDecorationStyle: 'dotted',
    marginHorizontal: 24,
    marginBottom: 10,
  },
  scrollView: {
    paddingBottom: 50,
  },
  appendButton: {
    position: 'absolute',
    right: 24,
    bottom: 14,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
