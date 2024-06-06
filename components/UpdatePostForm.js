import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost, patchPost } from '../api/posts';

const UpdatePostForm = ({ route, navigation }) => {
  const { editPost, data } = route.params;
  const [post, setPost] = useState(editPost);
  const queryClient = useQueryClient();

  const putMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (fetchUpdate) => {
      queryClient.setQueryData(['posts'], (oldData = []) => {
        return oldData.map((post) => (post.id === fetchUpdate.id ? fetchUpdate : post));
      });
      navigation.navigate('Posts');
    }
  });

  const patchMutation = useMutation({
    mutationFn: patchPost,
    onSuccess: (fetchUpdate) => {
      queryClient.setQueryData(['posts'], (oldData = []) => {
        return oldData.map((post) => (post.id === fetchUpdate.id ? fetchUpdate : post));
      });
      navigation.navigate('Posts');
    }
  });

  const handleInputChange = (prop, value) => {
    setPost(prev => ({ ...prev, [prop]: value }));
  };

  const patchOrPut = () => {
    const getCachedPost = data.find((p) => p.id === editPost.id);
    if (editPost.title !== getCachedPost.title && editPost.body === getCachedPost.body) {
      // If only the title is changed, use PATCH method
      patchMutation.mutate({ id: editPost.id, title: editPost.title });
    } else {
      // If both title and body are changed or only body is changed, use PUT method
      putMutation.mutate(editPost);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={post.userId.toString()}
        onChangeText={(input) => handleInputChange('userId', input)}
      />
      <TextInput
        style={styles.input}
        value={post.title}
        onChangeText={(input) => handleInputChange('title', input)}
      />
      <TextInput
        style={styles.input}
        value={post.body}
        onChangeText={(input) => handleInputChange('body', input)}
      />
      <Pressable style={styles.button} onPress={patchOrPut}>
        <Text style={styles.buttonText}>Save</Text>
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

export default UpdatePostForm;



