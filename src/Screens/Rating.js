import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Center,
  Image,
  View,
  Button,
  useToast,
} from "native-base";
import { AirbnbRating } from "@rneui/themed";
import firebase from "../../database/firebase";
const Rating = ({ navigation, route }) => {
  const [rate, setRate] = useState("");
  const toast = useToast();
  const ratingCompleted = (rating) => {
    setRate(rating);
  };
  const handleReview = async () => {
    let abortController = new AbortController();
    try {
      await firebase.db.collection("rates").add({
        userMail: route.params.data.email,
        rate: rate,
      });
      toast.show({
        description: "Thanks for rated us!",
      });
      abortController.abort();
      navigation.goBack();
    } catch (error) {
      alert("Something went wrong, please try again later.");
      console.log(error);
    }
  };
  return (
    <View flex={1}>
      <Center w="100%">
        <Box
          safeArea
          p="2"
          py="8"
          w="90%"
          maxW="290"
          textAlign="center"
          alignItems="center"
        >
          <Image
            source={require("../images/Logo.png")}
            style={{ width: 150, height: 150 }}
            alt={"Alternate Text"}
          />
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Rate us!
          </Heading>
          <AirbnbRating
            onFinishRating={(rt) => {
              ratingCompleted(rt);
            }}
          />
        </Box>
        <Button onPress={handleReview}>Rate us</Button>
      </Center>
    </View>
  );
};

export default Rating;
