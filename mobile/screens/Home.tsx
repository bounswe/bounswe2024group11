import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTab from "../components/BottomTab";
import Auth from "./Auth";
import Post from "./Post";
import CreatePost from "./CreatePost";
import { useUser } from "../context/UserContext";
import { BadRequestError, compareToken } from "../components/StorageHandler";

const Stack = createStackNavigator();

function Home() {
  const { user, setUser } = useUser();

  useEffect(() => {
    compareToken()
      .then((token) => {
        // console.log(token);
        return token;
        throw new Error("Not implemented home validation");
        // return getUser({ token: token, endpoint: "user/validate" });
      })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        if (error instanceof BadRequestError) {
        } else {
          console.log(error);
        }
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            title: "Authentication",
          }}
        />
        <Stack.Screen
          name="Post"
          component={Post as any} //as any
          initialParams={{
            props: {
              authorNS: "Default Name",
              authorImg: "https://defaultimage.com/default.jpg",
              authorUsername: "@defaultuser",
              title: "Default Title",
              content: "Default content here...",
              imgsource: "https://defaultimage.com/post.jpg",
              likes: 0,
              bookmarked: false,
              isLiked: false,
            },
          }}
          options={{
            title: "Post",
          }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            title: "Create Post",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Home;
