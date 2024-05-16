import React, { useState } from "react";
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #ecf0f1;
  align-items: center;
  justify-content: center;
  padding-horizontal: 30px;
`;

const Logo = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 15px;
  resize-mode: contain;
  margin-bottom: 30px;
`;

const AppName = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #3498db;
  text-align: center;
`;

const AppDescription = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
  color: #555;
`;

const CustomButton = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 15px;
  margin-vertical: 10px;
  align-items: center;
  border-radius: 8px;
  width: ${Dimensions.get('window').width - 60}px; /* Set width to device width minus padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledTextInput = styled.TextInput`
  height: 50px;
  border-color: #3498db;
  border-width: 2px;
  padding: 10px;
  margin-bottom: 20px;
  width: ${Dimensions.get('window').width - 60}px; /* Set width to device width minus padding */
  border-radius: 8px;
  background-color: #f5f5f5; /* Light gray background */
  font-size: 16px;
  color: #333;
`;

export default function Home() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Username and password are required.");
      return;
    }

    const user = findUser(username);

    if (user && user.password === password) {
      setIsLoggedIn(true);
    } else {
      alert(
        "User not found or incorrect password. Redirecting to Create Account."
      );
      navigation.navigate("CreateAccount");
    }
  };

  const handleScan = () => {
    if (!isLoggedIn) {
      alert("Please log in first.");
      return;
    }

    navigation.navigate("Scanner");
  };

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
  ];

  const findUser = (username) =>
    users.find((user) => user.username === username);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <Container>
        <Logo source={require("../assets/download.jpeg")} />
        <AppName>QR Scanner</AppName>
        <AppDescription>
          Welcome to our App! Scan QR codes effortlessly and explore exciting
          features.
        </AppDescription>

        {!isLoggedIn && (
          <View>
            <InputContainer>
              <StyledTextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              <StyledTextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </InputContainer>
            <CustomButton onPress={handleLogin}>
              <ButtonText>Login</ButtonText>
            </CustomButton>
            <View style={{ alignItems: 'center' }}>
  <Text style={{ color: "#555", marginTop: 10 }}>
    Don't have an account?
  </Text>
</View>
            <CustomButton onPress={handleCreateAccount}>
              <ButtonText>Create Account</ButtonText>
            </CustomButton>
          </View>
        )}

        {isLoggedIn && (
          <CustomButton onPress={handleScan}>
            <ButtonText>Scan</ButtonText>
          </CustomButton>
        )}
      </Container>
    </ScrollView>
  );
}
