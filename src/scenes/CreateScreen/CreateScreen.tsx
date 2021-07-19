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
import * as Yup from 'yup';

const selectCategories = state => state.categories.items;

const validationSchema = Yup.object({
  title: Yup.string().required('Tytuł przepisu jest wymagany.'),
  images: Yup.array().min(1, 'Wymagane jest przynajmniej jedno zdjęcie').max(5),
  ingredients: Yup.array()
    .min(1, 'Wymagany jest co najmniej jeden składnik.')
    .of(
      Yup.lazy((item, options) => {
        const itemIndex = options.from[0].value.ingredients.findIndex(
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
      Yup.lazy((item, options) => {
        const itemIndex = options.from[0].value.steps.findIndex(
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
  validationMessage: {
    color: Colors.ALERT,
    paddingTop: 5,
    fontSize: Typography.FONT_SIZE_12,
    ...Typography.FONT_REGULAR,
  },
  validationMessageWrapper: {
    paddingHorizontal: 24,
  },
});
