import React from "react";
import { View } from "react-native";
import { Center, Spinner, VStack, Box, ScrollView, Stack } from "native-base";
import SettingsButton from "../Components/SettingsButton";
import NameAndNickname from "../Components/NameAndNickname";
import ProfileAvatar from "../Components/ProfileAvatar";
import InfoCard from "../Components/InfoCard";

const ProfilePage = (props) => {
  const {
    navigation,
    loading,
    name,
    pictureUrl,
    infoText,
    children,
    editPage,
    isCurrentUser,
  } = props;
  return (
    <View style={style.container}>
      <Center flex={1} px="3">
        {loading ? (
          <Spinner color={"mustard.400"} size="lg" />
        ) : (
          <Stack safeAreaTop alignItems="center" justifyContent="center">
            {isCurrentUser ? (
              <SettingsButton onPress={() => navigation.navigate("Settings")} />
            ) : (
              <></>
            )}

            <VStack space={4}>
              <NameAndNickname name={`${name}`} nickname={"@Nickname"} />
              <ProfileAvatar
                image={pictureUrl}
                letter={`${name[0]}`}
                onPress={() => navigation.navigate(editPage)}
                icon="pencil"
                isCurrentUser={isCurrentUser}
              />
              <InfoCard infoText={infoText} />
            </VStack>
            <Box w={330} h="40%">
              <ScrollView w={330} h="80">
                {children}
              </ScrollView>
            </Box>
          </Stack>
        )}
      </Center>
    </View>
  );
};

const style = {
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default ProfilePage;
