import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Box,
  AspectRatio,
  Image,
  Text,
  VStack,
  HStack,
  Stack,
  Circle,
  Icon,
  Pressable,
  TextArea,
  Button,
  Select,
  FormControl,
  CheckIcon,
} from "native-base";

import uuid from "react-native-uuid";
import AddCommentIcon from "../Icons/AddCommentIcon";

import { useDispatch } from "react-redux";

import { postPostAction } from "../../Redux/Slices/postSlice";

import * as ImagePicker from "expo-image-picker";

const palet = require("../../../assets/paletWhite.png");

export default function NewPostUnifiedSection(props) {
  const { navigation, theme, currentUser } = props;

  const dispatch = useDispatch();

  const [imageSource, setImageSource] = useState(() => null);
  const [imageSourceChanged, setImageSourceChanged] = useState(() => false);
  const [newPostTextState, setNewPostTextState] = useState(() => "");
  const [selectedPetState, setSelectedPetState] = useState(() => "");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      var tempImgVar = await result.uri;

      if (
        tempImgVar &&
        [".jpg", ".jpeg", ".jpe", ".tiff", ".tif", ".png", ".mp4", ".mov"].some(
          (substring) => tempImgVar.includes(substring)
        )
      ) {
        setImageSource(() => tempImgVar);

        setImageSourceChanged(() => true);
      }
    }
  };

  useEffect(() => {
    setImageSourceChanged(() => false);
  }, [imageSource, imageSourceChanged]);

  //check if screen is changed and reset booleans
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setImageSource(() => null);
      setImageSourceChanged(() => false);
      setNewPostTextState(() => "");
      setSelectedPetState(() => "");
    });

    // return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      //clean up function
      unsubscribe;
    };
  }, []);

  return !imageSourceChanged ? (
    <>
      {/* new post image section starts*/}
      <Box safeAreaTop ml={7} mr={7} mt={7}>
        <Box style={theme.postShadow}>
          <Box
            maxW="100%"
            rounded="3xl"
            overflow="hidden"
            borderColor={theme.colors.forestGreen[400]}
            borderWidth="3.5"
          >
            <AspectRatio w="100%" ratio={1 / 1}>
              <Image
                size="100%"
                source={imageSource ? { uri: imageSource } : palet}
                alt="image"
                key={uuid.v4()}
              />
            </AspectRatio>

            <Pressable onPress={pickImage}>
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Circle
                    size="30px"
                    bg={theme.colors.forestGreen[400]}
                    style={{
                      margin: "auto",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      transform: [{ scale: isPressed ? 0.96 : 1 }],
                    }}
                  >
                    <Icon
                      as={<AddCommentIcon color={theme.colors.sage[400]} />}
                    />
                  </Circle>
                );
              }}
            </Pressable>
          </Box>
        </Box>
      </Box>
      {/* new post image section ends*/}

      {/* new post pet selection starts */}
      <Box ml={7} mr={7} mt={2}>
        <FormControl isRequired>
          <Select
            alignItems="center"
            selectedValue={selectedPetState}
            bg={theme.colors.sage[300]}
            borderRadius="2xl"
            minWidth="200"
            accessibilityLabel="Choose Pet"
            placeholder="Choose Pet"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            onValueChange={(itemValue) => setSelectedPetState(() => itemValue)}
          >
            {currentUser && currentUser.pets ? (
              currentUser.pets.map(
                (selectedPetStateMap, selectedPetStateMapIndex) => (
                  <Select.Item
                    label={selectedPetStateMap.name}
                    key={uuid.v4()}
                    value={selectedPetStateMap._id}
                  />
                )
              )
            ) : (
              <Select.Item label="Please First Add Pet" value="none" disabled />
            )}
          </Select>
        </FormControl>
      </Box>
      {/* new post pet selection ends */}

      {/* new post text section starts*/}
      <Stack
        alignItems="center"
        ml={7}
        mr={7}
        mb={2}
        mt={2}
        bg={theme.colors.sage[300]}
        borderRadius="2xl"
      >
        <VStack
          overflow="hidden"
          bg={theme.colors.sage[300]}
          borderRadius="2xl"
          borderColor={theme.colors.sage[300]}
          style={theme.commentOpenStyle}
          // m="2"
        >
          <TextArea
            h={20}
            _focus={{
              bg: theme.colors.singletons["white"],
              borderColor: theme.colors.sage[300],
            }}
            placeholder="Description"
            value={newPostTextState}
            onChangeText={(newPostTextState) =>
              setNewPostTextState(() => newPostTextState)
            }
          />
        </VStack>
      </Stack>
      <HStack
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        p="2"
        bg={theme.colors.sage[400]}
      >
        <Button
          colorScheme="danger"
          disabled={!imageSource || !selectedPetState}
          onPress={() => {
            dispatch(
              postPostAction({
                selectedPetState,
                newPostTextState,
                imageSource,
              })
            );
            navigation.navigate("MainProfile");
          }}
          borderRadius="50"
          bg={theme.colors.forestGreen[400]}
        >
          Publish
        </Button>
      </HStack>
      {/* new post text section ends*/}
    </>
  ) : (
    <ScrollView bg={theme.colors.sage[400]}>
      <Stack safeArea>
        <Text>Loading...</Text>
      </Stack>
    </ScrollView>
  );
}
