import { StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  icon: {
    transform: [{ translateY: -2 }, { translateX: -2 }],
  },
  tabBar: {
    backgroundColor: "white",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    borderTopWidth: 0.5,
    borderTopColor: "#d3d3d3",
  },
  appBar: {
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d3d3d3",
    height: 64,
  },
  post: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    borderRadius: 5,
  },
  createPostButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButton: {
    backgroundColor: "#50C7E9",
    width: 100,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: { flex: 1, flexDirection: "row", alignItems: "center" },
  headerText: {
    fontSize: 18,
    padding: 10,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerLogoImage: {
    width: 40,
    height: 40,
  },
  searchBar: {
    height: 40,
    margin: 10,
    backgroundColor: "white",
  },
  searchButton: {},
  authWrapper: {
    flex: 1,
    maxWidth: 600,
  },
  authRoot: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 24,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 12,
  },
  imgDiv: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 96,
    maxWidth: 128,
    height: 96,
    maxHeight: 128,
    marginBottom: 24,
  },
  divider: {
    marginVertical: 24,
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: { height: 40 },
  error: {
    textAlign: "center",
    marginBottom: 12,
  },
  dropDownMenu: {
    alignItems: "stretch",
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "flex-start",
  },
  searchResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { styles };
