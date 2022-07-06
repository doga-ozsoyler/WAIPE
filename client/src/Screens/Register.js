import React, { useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  signup,
  selectAuthLoading,
  selectAuthError,
} from "../Redux/Slices/authSlice";
import {
  Input,
  NativeBaseProvider,
  extendTheme,
  Center,
  Stack,
  Heading,
  VStack,
  Checkbox,
  Text,
  Button,
  Box,
  FormControl,
  AlertDialog,
} from "native-base";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const Alert = () => {
    return (
      <AlertDialog isOpen={isOpen && !authLoading} onClose={onClose}>
        <AlertDialog.Content flex={0.25} alignItems="center" bg="white">
          <Text
            textAlign="center"
            color="muted.600"
            fontSize="sm"
            mt="8"
            ml="8"
            mr="8"
          >
            An activation link has been sent to your email address. Please click
            on the link to activate your account.
          </Text>
          <Button
            colorScheme="danger"
            onPress={onClose}
            w="60"
            m="6"
            borderRadius="50"
            bg="forestGreen.400"
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog>
    );
  };

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termToggle: false,
        ageToggle: false,
      }}
      onSubmit={(values) => {
        dispatch(signup(values));
        setIsOpen(!isOpen);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <View style={style.container}>
          <NativeBaseProvider theme={theme}>
            <Center flex={1} px="3">
              <VStack space={5} w="300">
                <VStack space={6} alignItems="center">
                  <Heading size="md" color="extraOrage.400">
                    Sign up to Waipe
                  </Heading>
                  <Stack direction="column" space={5} alignItems="center">
                    <Stack direction="row" alignItems="center">
                      <Input
                        bg="white"
                        borderColor="extraOrage.400"
                        variant="rounded"
                        placeholder="Firstname"
                        w="47%"
                        _focus={style.input}
                        onChangeText={handleChange("firstname")}
                        onBlur={handleBlur("firstname")}
                        value={values.firstname}
                      />
                      <Stack w="6%"></Stack>
                      <Input
                        bg="white"
                        borderColor="extraOrage.400"
                        variant="rounded"
                        placeholder="Lastname"
                        w="47%"
                        _focus={style.input}
                        onChangeText={handleChange("lastname")}
                        onBlur={handleBlur("lastname")}
                        value={values.lastname}
                      />
                    </Stack>
                    <FormControl
                      isInvalid={
                        authError === "Email already exists." ? true : false
                      }
                    >
                      <Input
                        bg="white"
                        borderColor="extraOrage.400"
                        variant="rounded"
                        placeholder="Email"
                        w="100%"
                        _focus={style.input}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                      <FormControl.ErrorMessage ml="3.5">
                        Email address already in use.
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        authError === "Phone already exists." ? true : false
                      }
                    >
                      <Input
                        bg="white"
                        borderColor="extraOrage.400"
                        variant="rounded"
                        placeholder="Phone"
                        w="100%"
                        keyboardType="numeric"
                        _focus={style.input}
                        onChange={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        value={values.phone}
                      />
                      <FormControl.ErrorMessage ml="3.5">
                        Phone number already in use.
                      </FormControl.ErrorMessage>
                    </FormControl>

                    <Input
                      bg="white"
                      borderColor="extraOrage.400"
                      variant="rounded"
                      placeholder="Password"
                      w="100%"
                      type="password"
                      _focus={style.input}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    <FormControl
                      isInvalid={
                        values.password !== values.confirmPassword
                          ? true
                          : false
                      }
                    >
                      <Input
                        bg="white"
                        borderColor="extraOrage.400"
                        variant="rounded"
                        placeholder="Confirm Password"
                        w="100%"
                        type="password"
                        _focus={style.input}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                      />
                      <FormControl.ErrorMessage ml="3.5">
                        Passwords must match
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Stack>
                </VStack>
                <VStack space={2} ml="8">
                  <FormControl isInvalid={!values.termToggle}>
                    <Checkbox
                      size="sm"
                      colorScheme="green"
                      borderColor="extraOrage.400"
                      borderWidth="1"
                      borderRadius="7"
                      _checked={style.checkbox}
                      onChange={(nextValue) =>
                        setFieldValue("termToggle", nextValue)
                      }
                      value={values.termToggle}
                    >
                      <Text color="white" fontSize="xs">
                        Term of Use, Privacy Policy
                      </Text>
                    </Checkbox>
                  </FormControl>
                  <FormControl isInvalid={!values.ageToggle}>
                    <Checkbox
                      size="sm"
                      colorScheme="green"
                      borderColor="extraOrage.400"
                      borderWidth="1"
                      borderRadius="7"
                      _checked={style.checkbox}
                      onChange={(nextValue) =>
                        setFieldValue("ageToggle", nextValue)
                      }
                      value={values.ageToggle}
                    >
                      <Text color="white" fontSize="xs">
                        +18
                      </Text>
                    </Checkbox>
                  </FormControl>
                </VStack>
                <Box alignItems="center">
                  <Button
                    isLoading={authLoading}
                    isDisabled={
                      !(
                        values.firstname &&
                        values.lastname &&
                        values.email &&
                        values.password &&
                        values.confirmPassword &&
                        values.termToggle &&
                        values.ageToggle
                      )
                    }
                    w="50%"
                    size="md"
                    borderRadius="50"
                    bg="extraOrage.400"
                    mb="2"
                    colorScheme="warning"
                    _text={{ fontSize: "md" }}
                    onPress={handleSubmit}
                  >
                    Sign up
                  </Button>
                  <Button
                    size="sm"
                    variant="link"
                    _text={{ color: "forestGreen.400" }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Cancel
                  </Button>
                </Box>
              </VStack>
              <Alert></Alert>
            </Center>
          </NativeBaseProvider>
        </View>
      )}
    </Formik>
  );
};

const theme = extendTheme({
  colors: {
    mustard: {
      400: "#e3b448",
    },
    extraOrage: {
      400: "#E38E48",
    },
    sage: {
      300: "#F8FFE3",
      400: "#cbd18f",
    },
    forestGreen: {
      400: "#3a6b35",
    },
  },
});

const style = {
  input: { bg: "white", borderColor: "forestGreen.400" },
  checkbox: { borderColor: "forestGreen.400", bg: "forestGreen.400" },
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default RegisterScreen;
