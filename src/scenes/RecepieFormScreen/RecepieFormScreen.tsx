import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';

import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ActionIconWrapper, Button, Input, StepCreateTextarea } from '_atoms';
import { useAppDispatch, useAppSelector } from '_hooks';
import { CategoryCheckbox, IngredientFormField, ModalHeader } from '_molecules';
import { RecepieFormScreenProps } from '_navigations';
import { ImagePicker } from '_organisms';
import { RootState } from '_store';
import { Colors } from '_styles';

import * as cookbookActions from '../../store/ducks/Cookbook/cookbookActions';
import s from './RecepieFormScreen.styles';

const selectCategories = (state: RootState) => state.categories.items;

const validationSchema = Yup.object({
  title: Yup.string().required('Tytuł przepisu jest wymagany.'),
  images: Yup.array().min(1, 'Wymagane jest przynajmniej jedno zdjęcie').max(5),
  ingredients: Yup.array()
    .min(1, 'Wymagany jest co najmniej jeden składnik.')
    .of(
      //@ts-ignore
      Yup.lazy((item, options) => {
        //@ts-ignore
        const itemIndex = options.from[0].value.ingredients.findIndex(
          //@ts-ignore
          x => x.key == item.key,
        );
        return itemIndex === 0
          ? Yup.object().shape({
              name: Yup.string().required(
                'Wymagany jest przynajmniej jeden składnik.',
              ),
              quantity: Yup.string(),
              unit: Yup.string(),
            })
          : Yup.object().shape({
              name: Yup.string(),
              quantity: Yup.string(),
              unit: Yup.string(),
            });
      }),
    ),
  steps: Yup.array()
    .min(1, 'Wymagany jest co najmniej jeden składnik.')
    .of(
      //@ts-ignore
      Yup.lazy((item, options) => {
        //@ts-ignore
        const itemIndex = options.from[0].value.steps.findIndex(
          //@ts-ignore
          x => x.key == item.key,
        );
        return itemIndex === 0
          ? Yup.object().shape({
              value: Yup.string().required(
                'Wymagany jest przynajmniej jeden krok wykonania.',
              ),
            })
          : Yup.object().shape({
              value: Yup.string(),
            });
      }),
    ),
});

const RecepieFormScreen = ({ navigation }: RecepieFormScreenProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
              dispatch(cookbookActions.addItem(values)).then(() => {
                navigation.goBack();
              });
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <ImagePicker
                  images={values.images}
                  parseImages={nextValue => setFieldValue('images', nextValue)}
                />
                {errors.images && touched.images ? (
                  <View style={s.validationMessageWrapper}>
                    <Text style={s.validationMessage}>{errors.images}</Text>
                  </View>
                ) : null}
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
                      {errors.title && touched.title ? (
                        <Text style={s.validationMessage}>{errors.title}</Text>
                      ) : null}
                    </View>

                    <FieldArray name="ingredients">
                      {({ push, remove }) => (
                        <View style={s.section}>
                          <Text style={s.sectionTitle}>Składniki</Text>
                          {values.ingredients.map((ingredient, index) => (
                            <>
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
                              {errors.ingredients &&
                              errors.ingredients[index] &&
                              touched.ingredients ? (
                                <View style={s.validationMessageWrapper}>
                                  <Text style={s.validationMessage}>
                                    {errors.ingredients[index].name}
                                  </Text>
                                </View>
                              ) : null}
                            </>
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
                          {errors.ingredients &&
                          typeof errors.ingredients == 'string' &&
                          touched.ingredients ? (
                            <View style={s.validationMessageWrapper}>
                              <Text style={s.validationMessage}>
                                {errors.ingredients}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      )}
                    </FieldArray>

                    <FieldArray name="steps">
                      {({ push, remove }) => (
                        <View style={s.section}>
                          <Text style={s.sectionTitle}>Kroki wykonania</Text>
                          {values.steps.map((step, index) => (
                            <>
                              <StepCreateTextarea
                                value={step.value}
                                index={index}
                                key={step.key}
                                handleChange={handleChange(
                                  `steps[${index}].value`,
                                )}
                                handleRemove={() => remove(index)}
                              />
                              {errors.steps &&
                              errors.steps[index] &&
                              touched.steps ? (
                                <View style={s.validationMessageWrapper}>
                                  <Text style={s.validationMessage}>
                                    {errors.steps[index].value}
                                  </Text>
                                </View>
                              ) : null}
                            </>
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
                          {errors.steps &&
                          typeof errors.steps == 'string' &&
                          touched.steps ? (
                            <View style={s.validationMessageWrapper}>
                              <Text style={s.validationMessage}>
                                {errors.steps}
                              </Text>
                            </View>
                          ) : null}
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

export default RecepieFormScreen;
