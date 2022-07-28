import React, { useEffect } from "react";
import { View } from "react-native";
import {
  NativeBaseProvider,
  Center,
  Text,
  Spinner,
  extendTheme,
} from "native-base";
import {
  getUser,
  selectCurrentUser,
  selectUserLoading,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const MainProfileScreen = ({ token }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch]);

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);

  return (
    <View style={style.container}>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          {userLoading ? (
            <Spinner color={"mustard.400"} />
          ) : (
            <Text>Main Profile</Text>
          )}
        </Center>
      </NativeBaseProvider>
    </View>
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
    google: {
      400: "#de5246",
    },
  },
});

const style = {
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default MainProfileScreen;
