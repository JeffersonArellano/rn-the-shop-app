import React, { useReducer, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return { ...state, value: action.value, isValid: action.isValid };

    case INPUT_BLUR:
      return { ...state, touched: true };

    default:
      return state;
  }
};

const CustomInput = (props) => {
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    touched: false,
    isValid: props.initiallyValid,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [id, inputState, onInputChange]);

  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatchInputState({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatchInputState({ type: INPUT_BLUR });
  };

  return (
    <View style={{ ...props.style, ...styles.formControl }}>
      <Text style={styles.label}>
        {props.label}

        {props.required ? <Text style={styles.asterisk}> *</Text> : ""}
      </Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      ></TextInput>
      {!inputState.isValid && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {props.errorMessage}
            {props.minLength ? (
              <Text>{`, min length ${props.minLength}`}</Text>
            ) : null}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontFamily: "open-sans",
    fontSize: 15,
    width: "100%",
    margin: 4,
  },
  input: {
    borderRadius: 2,
    borderWidth: 1,
    fontSize: 16,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 3,
    borderColor: "#888",
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: { color: Colors.primary, fontFamily: "open-sans", fontSize: 13 },
  asterisk: { color: Colors.primary, fontSize: 16 },
});

export default CustomInput;
