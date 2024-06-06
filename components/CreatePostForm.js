import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';

const CreatePostForm = ({ navigation }) => {
  const [inputPost, setInputPost] = useState({ title: '', body: '', userId: '' });
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      // Update the posts list in the query cache by adding the new post to the beginning
      queryClient.setQueryData(['posts'], (oldData = []) => [data, ...oldData]);
      // Navigate to the posts screen after successful creation
      navigation.navigate('Posts');
    }
  });

  const handleInputChange = (prop, value) => {
    setInputPost(prev => ({ ...prev, [prop]: value }));
  };

  return (
    <View style={styles.container}>
      {/* TextInputs for user ID, title, and body */}
      <TextInput style={styles.input} placeholder={"User ID"} onChangeText={(input) => handleInputChange('userId', input)} />
      <TextInput style={styles.input} placeholder={"Title"} onChangeText={(input) => handleInputChange('title', input)} />
      <TextInput style={styles.input} placeholder={"Body"} onChangeText={(input) => handleInputChange('body', input)} />
      {/* Button to trigger the mutation to create a new post */}
      <Pressable style={styles.button} onPress={() => createMutation.mutate(inputPost)}>
        <Text style={styles.buttonText}>Create Post</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'skyblue',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreatePostForm;





