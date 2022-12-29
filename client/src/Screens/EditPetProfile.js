import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import {
  ScrollView,
  useSafeArea,
  Box,
  AspectRatio,
  Image,
  Text,
  HStack,
  Stack,
  Input,
  Button,
  VStack,
  Center,
  Spinner,
  NativeBaseProvider,
  TextArea,
} from "native-base";
import {
  selectGetPet,
  selectPetLoading,
  getPetAction,
} from "../Redux/Slices/petSlice";
import { useSelector, useDispatch } from "react-redux";
import ProfileAvatar from "../Components/ProfileAvatar";
import * as ImagePicker from "expo-image-picker";

const EditPetProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const pet = useSelector(selectGetPet);
  const petLoading = useSelector(selectPetLoading);

  return (
    <View style={style.container}>
      <Center flex={1} px="3">
        {petLoading ? (
          <Spinner color={"mustard.400"} size="lg" />
        ) : (
          <Formik
            initialValues={{
              name: `${pet?.name}`,
              species: `${pet?.species}`,
              breed: `${pet?.breed}`,
              age: `${pet?.age}`,
              biography: `${pet?.biography}`,
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <VStack space={7}>
                <VStack>
                  <ProfileAvatar
                    image={pet.picture}
                    letter={`${pet?.name[0]}`}
                    onPress={() => console.log("delete picture")}
                    icon="trash"
                  />
                  <Button
                    size="md"
                    variant="ghost"
                    onPress={() => console.log("change picture")}
                  >
                    Change Profile Picture
                  </Button>
                </VStack>
                <VStack space={3} w="80%">
                  <Input
                    bg="white"
                    _focus={style.input}
                    borderColor="extraOrage.400"
                    variant="rounded"
                    placeholder="Pet Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  <HStack
                    space={3}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Input
                      bg="white"
                      _focus={style.input}
                      w="48%"
                      borderColor="extraOrage.400"
                      variant="rounded"
                      placeholder="Species"
                      onChangeText={handleChange("species")}
                      onBlur={handleBlur("species")}
                      value={values.species}
                    />
                    <Input
                      bg="white"
                      _focus={style.input}
                      w="48%"
                      borderColor="extraOrage.400"
                      variant="rounded"
                      placeholder="Breed"
                      onChangeText={handleChange("breed")}
                      onBlur={handleBlur("breed")}
                      value={values.breed}
                    />
                  </HStack>
                  <Input
                    bg="white"
                    _focus={style.input}
                    borderColor="extraOrage.400"
                    variant="rounded"
                    placeholder="Age"
                    onChangeText={handleChange("age")}
                    onBlur={handleBlur("age")}
                    value={values.age}
                  />
                  <TextArea
                    bg="white"
                    _focus={style.input}
                    borderRadius="20%"
                    borderColor="extraOrage.400"
                    h={20}
                    placeholder="Biography"
                    onChangeText={handleChange("biography")}
                    onBlur={handleBlur("biography")}
                    value={values.biography}
                  />
                </VStack>
                <VStack>
                  <Button
                    isLoading={petLoading}
                    w="50%"
                    size="md"
                    borderRadius="50"
                    bg="extraOrage.400"
                    colorScheme="warning"
                    _text={{ fontSize: "md" }}
                    alignSelf="center"
                    onPress={handleSubmit}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="link"
                    _text={{ color: "forestGreen.400" }}
                    onPress={() => navigation.navigate("PetProfile")}
                  >
                    Cancel
                  </Button>
                </VStack>
              </VStack>
            )}
          </Formik>
        )}
      </Center>
    </View>
  );
};

const style = {
  input: { bg: "white", borderColor: "forestGreen.400" },
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default EditPetProfile;
