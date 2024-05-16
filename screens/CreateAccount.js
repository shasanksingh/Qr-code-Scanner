
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #f0f0f0;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  border-color: #ddd;
  border-width: 1px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  margin-vertical: 10px;
`;

export default function CreateAccount({ navigation }) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCreateAccount = () => {
    // Validate that both username and password are not empty
    if (newUsername.trim() === '' || newPassword.trim() === '') {
      alert('Username and password are required.');
      return;
    }

    // Simulate a create account process
    console.log(`New user created: Username - ${newUsername}, Password - ${newPassword}`);

    // After creating the account, navigate back to the login screen
    navigation.goBack();
  };

  return (
    <Container>
      <InputContainer>
        <StyledTextInput
          placeholder="New Username"
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
        />
        <StyledTextInput
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
      </InputContainer>

      <StyledButton title="Create Account" onPress={handleCreateAccount} />
    </Container>
  );
}
