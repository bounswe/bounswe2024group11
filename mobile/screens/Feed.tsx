import React, { useContext } from "react";

import { View, Text, Image } from "react-native";

import { Appbar, Button, Icon } from "react-native-paper"
import { styles } from "../components/Styles";
import { useUser } from "../context/UserContext";


const handleCreatePost = () => {
    console.log("Create post");
};

const goToLogin = () => {
    console.log("Go to login");
};


function Feed() {
    const { user, setUser } = useUser();

    return (
        // create a top bar and a feed of posts
        // the top bar shows the logo and a create post button
        // the feed shows a list of posts
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FeedHeader />
            <View style={{ flex: 1 }}>
                <Text>Feed</Text>
            </View>
            { user && user.isLogged && (
                <CreatePostButton />
            )}
        </View>
    )
};

const FeedHeader = ( ) => {
    const { user, setUser } = useUser();
    return (
        <Appbar.Header style={ styles.appBar }>
            <Appbar.Content title={
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image 
                        source={require("../assets/zenith-logo.png")} 
                        style={{ width: 40, height: 40 }} />
                    <Text style={{ fontSize: 18, padding: 10 }} >Zenith</Text>
                </View>
            } />
            
            <Appbar.Content 
                title= {
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                        { !user.isLogged && (
                        <Button
                            mode="contained" 
                            onPress={() => setUser({ isLogged: true })}
                            style={{
                                backgroundColor: "#66DDFF",
                                width: 100,
                            }}>
                            Log In
                        </ Button>
                        )}
                    </ View>
                }/>
        </Appbar.Header>
)};

const CreatePostButton = () => {
    return (
        <View>
            <Button
                mode="elevated"
                onPress={handleCreatePost}
                style={styles.createPostButton}
                buttonColor="#1F232E"
                rippleColor="#1F232E"
                textColor="white"
            >
                <Icon source="plus" size={20} color="white" />
            </Button>
        </View>
    )
}

export default Feed;