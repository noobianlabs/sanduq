import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createSanduq } from '../mockData';

const CreateSanduqScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const navigation = useNavigation();

  const handleCreate = () => {
    if (name && description && goal) {
      const newSanduq = createSanduq(name, description, Number(goal));
      alert(`Sanduq "${newSanduq.name}" created successfully!`);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Sanduq Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        label="Savings Goal"
        value={goal}
        onChangeText={setGoal}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleCreate} style={styles.button}>
        Create Sanduq
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});

export default CreateSanduqScreen;