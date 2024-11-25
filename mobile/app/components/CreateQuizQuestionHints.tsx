import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { CreateQuizQuestionHintType, SuggestedHintsType } from "../types/quiz";

interface Props {
  selected_hint: CreateQuizQuestionHintType;
  hints: SuggestedHintsType;
  onSelectHintType: (type: string) => void;
  onSelectHintText: (text: string) => void;
}

const CreateQuizQuestionHints: React.FC<Props> = ({
  selected_hint,
  hints,
  onSelectHintType,
  onSelectHintText,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Do you mind adding a hint?</Text>
        </View>
        <View>
          <Picker
            selectedValue={selected_hint.type}
            style={{ width: 168 }}
            onValueChange={(itemValue, itemIndex) =>
              onSelectHintType(itemValue)
            }
          >
            <Picker.Item key={"no"} label={"No"} value={"no"} />
            {Object.keys(hints).map((key) => (
              <Picker.Item
                key={key}
                label={key.replace(/\b\w/g, (char) => char.toUpperCase())}
                value={key}
              />
            ))}
            <Picker.Item key={"custom"} label={"Custom"} value={"custom"} />
          </Picker>
        </View>
        <View>
          {selected_hint.type === "synonyms" ? (
            <Picker
              selectedValue={selected_hint.text}
              style={{ width: 256 }}
              onValueChange={(itemValue, itemIndex) =>
                onSelectHintText(itemValue)
              }
            >
              {Object.values(hints.synonyms).map((hint) => (
                <Picker.Item
                  key={hint}
                  label={hint.replace(/\b\w/g, (char) => char.toUpperCase())}
                  value={hint}
                />
              ))}
            </Picker>
          ) : selected_hint.type === "definitions" ? (
            <Picker
              selectedValue={selected_hint.text}
              onValueChange={(itemValue, itemIndex) =>
                onSelectHintText(itemValue)
              }
            >
              {Object.values(hints.definitions).map((hint) => (
                <Picker.Item
                  key={hint}
                  label={hint.replace(/\b\w/g, (char) => char.toUpperCase())}
                  value={hint}
                />
              ))}
            </Picker>
          ) : selected_hint.type === "examples" ? (
            <Picker
              selectedValue={selected_hint.text}
              onValueChange={(itemValue, itemIndex) =>
                onSelectHintText(itemValue)
              }
            >
              {Object.values(hints.examples).map((hint) => (
                <Picker.Item
                  key={hint}
                  label={hint.replace(/\b\w/g, (char) => char.toUpperCase())}
                  value={hint}
                />
              ))}
            </Picker>
          ) : selected_hint.type === "images" ? (
            <Picker
              selectedValue={selected_hint.text}
              onValueChange={(itemValue, itemIndex) =>
                onSelectHintText(itemValue)
              }
            >
              {Object.values(hints.images).map((hint) => (
                <Picker.Item
                  key={hint}
                  label={hint.replace(/\b\w/g, (char) => char.toUpperCase())}
                  value={hint}
                />
              ))}
            </Picker>
          ) : selected_hint.type === "custom" ? (
            <TextInput
              value={selected_hint.text}
              style={styles.hintText}
              placeholder="Write your custom hint..."
              onChangeText={(text) => onSelectHintText(text)}
            />
          ) : selected_hint.type === "no" ? (
            <Text style={styles.noHint}>Don't be this bad 😢</Text>
          ) : (
            <></>
          )}
          <Text>Selected hint type: {selected_hint.type}</Text>
          <Text>Selected hint text: {selected_hint.text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    gap: 10,
  },
  hintType: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginLeft: 16,
    paddingLeft: 16,
  },
  hintText: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  noHint: {
    fontSize: 16,
    // fontWeight: "bold",
    marginLeft: 16,
  },
});

export default CreateQuizQuestionHints;
