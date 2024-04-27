import { StyleSheet } from 'react-native';
import { create } from 'react-test-renderer';

const styles = StyleSheet.create({
    icon: {
        transform: [{ translateY: -2 }, { translateX: -2 }]
    },
    tabBar: {
        backgroundColor: 'white',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
        borderTopWidth: 0.5,
        borderTopColor: '#d3d3d3'
    },
    appBar: {
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#d3d3d3',
        height: 64
    },
    post: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d3d3d3',
        borderRadius: 5,
    },
    createPostButton: {
            position: "absolute",
            bottom: 20,
            right: 20,
            borderRadius: 50,
            width: 50,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
    }
});

export { styles };