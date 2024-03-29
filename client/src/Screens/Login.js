import React, { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { SSRProvider } from "@react-aria/ssr";
import {
  selectAuthLoading,
  selectAuthError,
  selectToken,
  signinAction,
} from "../Redux/Slices/authSlice";
import { Formik } from "formik";
import {
  Input,
  Center,
  Stack,
  Heading,
  VStack,
  Button,
  Box,
  Icon,
  Flex,
  Divider,
  Text,
  FormControl,
  useTheme,
  Image,
  ScrollView,
} from "native-base";

const Login = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const [show, setShow] = useState(false);

  const VisibilityIcon = () => {
    return (
      <Icon
        as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
        size={5}
        mr="3"
        color={theme.colors.muted[600]}
        onPress={() => setShow(!show)}
      />
    );
  };

  if (token) {
    return navigation.navigate("Discover");
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => dispatch(signinAction(values))}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView bg={theme.colors.sage[400]}>
          <SSRProvider>
            <Center safeAreaTop justifyContent="flex-start" flex={1} px="3">
              <Image
                source={require("../../assets/Colorfull-waipe-logo-(green).png")}
                alt="Waipe"
                resizeMode="contain"
                h="100"
                w="300"
                marginTop="20px"
                marginBottom="70px"
              />
              <VStack space={5} w="300">
                <VStack space={6} alignItems="center">
                  <Stack direction="column" w="300">
                    <Stack direction="column" space={5} alignItems="center">
                      <FormControl
                        isInvalid={
                          authError === "User Not found." ? true : false
                        }
                      >
                        <Input
                          bg="white"
                          borderColor={theme.colors.extraOrage[400]}
                          variant="rounded"
                          placeholder="Email"
                          w="100%"
                          _focus={theme.input}
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                        />
                        <FormControl.ErrorMessage ml="3.5">
                          Sorry, we can't find an account with this email.
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          authError === "Invalid Password!" ? true : false
                        }
                      >
                        <Input
                          bg="white"
                          borderColor={theme.colors.extraOrage[400]}
                          variant="rounded"
                          placeholder="Password"
                          w="100%"
                          type={show ? "text" : "password"}
                          InputRightElement={<VisibilityIcon />}
                          _focus={theme.input}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                        />
                        <FormControl.ErrorMessage ml="3.5">
                          Incorrect password. Please try again.
                        </FormControl.ErrorMessage>
                      </FormControl>
                    </Stack>
                    <Flex direction="row-reverse">
                      <Button
                        size="sm"
                        variant="link"
                        _text={{ color: theme.colors.forestGreen[400] }}
                      >
                        Forgot password?
                      </Button>
                    </Flex>
                  </Stack>
                </VStack>
                <Box alignItems="center">
                  <Button
                    isLoading={authLoading}
                    isDisabled={!(values.email && values.password)}
                    w="50%"
                    size="md"
                    borderRadius="50"
                    bg={theme.colors.extraOrage[400]}
                    mb="2"
                    colorScheme="warning"
                    _text={{ fontSize: "md" }}
                    onPress={handleSubmit}
                    title="Submit"
                  >
                    Sign in
                  </Button>
                  <Flex direction="row" mb="5" mt="3" alignItems="center">
                    <Divider bg={theme.colors.sage[300]} w="55" />
                    <Text
                      fontSize="md"
                      color={theme.colors.singletons["white"]}
                      mr="2"
                      ml="2"
                    >
                      OR
                    </Text>
                    <Divider bg={theme.colors.sage[300]} w="55" />
                  </Flex>
                  <Button
                    isLoading={false}
                    isLoadingText="Sign in"
                    spinnerPlacement="end"
                    w="100%"
                    size="md"
                    borderRadius="50"
                    bg={theme.colors.forestGreen[400]}
                    mb="2"
                    colorScheme="green"
                    justifyContent="flex-start"
                    _text={{ fontSize: "md" }}
                    onPress={() => console.log("SO")}
                  >
                    Login with Google
                  </Button>
                  <Divider mb="2" mt="5" bg={theme.colors.sage[300]} w="100%" />
                  <Heading
                    my="3"
                    size="md"
                    color={theme.colors.forestGreen[400]}
                  >
                    New to Waipe?
                  </Heading>
                  <Button
                    isLoading={false}
                    isLoadingText="Sign in"
                    spinnerPlacement="end"
                    w="100%"
                    size="md"
                    borderRadius="50"
                    bg={theme.colors.extraOrage[400]}
                    mb="2"
                    colorScheme="warning"
                    justifyContent="flex-start"
                    _text={{ fontSize: "md" }}
                    onPress={() => navigation.navigate("Register")}
                  >
                    Sign up for Waipe
                  </Button>
                </Box>
              </VStack>
            </Center>
          </SSRProvider>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Login;
