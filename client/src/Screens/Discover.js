import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  ScrollView,
  Center,
  Text,
  Button,
  Image,
  Box,
  useSafeArea,
  Pressable,
  VStack,
  Input,
  Icon,
  useTheme,
  Divider,
} from "native-base";
import MasonryList from "@react-native-seoul/masonry-list";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetAllPosts,
  getAllPostsAction,
} from "../Redux/Slices/postSlice";
import SearchBarIcon from "../Components/Icons/SearchBarIcon";
import DiscoverMasonryListComponent from "../Components/DiscoverMasonryListComponent";

const DiscoverScreen = ({ navigation, route }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const allPosts = useSelector(selectGetAllPosts);

  useEffect(() => {
    dispatch(getAllPostsAction());

    return () => {
      //clean up function
    };
  }, [dispatch]);

  //search section starts

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(() => allPosts);

  // exclude column list from filter
  const excludeColumns = ["_id", "like"];

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    var searchedBool = allPosts.map((filteredDataParent) => {
      return filteredDataParent.petID.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    // var a = filterData(value);

    var lowercasedValue = value.toString().toLowerCase().trim();
    if (lowercasedValue === "") {
      setData(allPosts);
    } else {
      setData(filterData(searchedBool));
    }
  };

  const onSubmitEditingD = (value) => {
    var searchedBool = allPosts.map((filteredDataParent) => {
      return filteredDataParent.petID.name
        .toLowerCase()
        .includes("Perry".toLowerCase());
    });

    var lowercasedValue = value.toString().toLowerCase().trim();
    if (lowercasedValue === "") {
      setData(filterData(searchedBool));
    } else {
      setData(filterData(searchedBool));
    }
  };

  // filter records by search text
  const filterData = (searchedBool) => {
    var filteredData = allPosts
      .map((mamped) => {
        return mamped;
      })
      .filter((filt, filtIN) => {
        return filt && searchedBool[filtIN] === true;
      });

    return filteredData;
    // .filter((item) => {
    //   return Object.keys(item).some((key) =>
    //     excludeColumns.includes(key)
    //       ? false
    //       : item[key].toString().toLowerCase().includes(lowercasedValue)
    //   );
    // });

    // .map((d, i) => {
    //   return (
    //     //   <Text key={i} className="box" style={{ backgroundColor: d.color }}>
    //     //     <Text>Name: </Text>
    //     d.name
    //     //     <Divider />
    //     //   </Text>
    //   );
    // });
    // setData(filteredData);
    // console.log(filteredData);
  };

  // console.log(
  //   allPosts
  //     .map((filteredDataParent) => {
  //       return filteredDataParent.petID.name;
  //     })
  //     .sort()
  //     .filter(function (item, pos, ary) {
  //       return !pos || item != ary[pos - 1];
  //     })
  // );

  // return setSearchedPosts(() => setSearchedPosts(sorted));

  // .filter((el) => {
  //   return el.toLowerCase().includes("Perry".toLowerCase());
  // })
  // console.log(
  //   allPosts
  //     .map((mamped) => {
  //       return mamped;
  //     })
  //     .filter((filt, filtIN) => {
  //       return filt && searchedBool[filtIN] === true;
  //     })
  // );

  //search section ends

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });

  // const renderItem = (item, i) => {
  //   const randomBool = useMemo(() => Math.random() < 0.5, []);

  //   return (
  //     <Pressable
  //       onPress={() => {
  //         navigation.navigate("Post", {
  //           post: item,
  //         });
  //       }}
  //     >
  //       <View key={item._id} style={[{ marginTop: 12, flex: 1 }]}>
  //         <Image
  //           source={{ uri: item.picture }}
  //           style={{
  //             height: randomBool ? 150 : 280,
  //             alignSelf: "stretch",
  //             marginLeft: i % 2 === 0 ? 0 : 12,
  //           }}
  //           resizeMode="cover"
  //           alt="alt"
  //         />
  //       </View>
  //     </Pressable>
  //   );

  return allPosts ? (
    <ScrollView {...safeAreaProps}>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          borderColor={"#f3f3f3"}
          py="3"
          px="3"
          InputLeftElement={<Icon as={<SearchBarIcon />} />}
          bgColor="#f3f3f3"
          _focus={{
            bg: theme.colors.forestGreen[400],
            borderColor: theme.colors.forestGreen[400],
          }}
          onChangeText={handleChange}
          value={searchText}
          onSubmitEditing={onSubmitEditingD}
        />
      </VStack>

      {data && data.length && data.length > 1 ? (
        <DiscoverMasonryListComponent data={data} navigation={navigation} />
      ) : (
        <Text>No records found to display!</Text>
      )}
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

export default DiscoverScreen;
