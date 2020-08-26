import { View } from "react-native";
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm,
} from "react-native-formik";
import { TextInput } from "react-native-paper";

export const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextInput);

export const MyForm = withNextInputAutoFocusForm(View);
