import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Picker } from '@react-native-picker/picker';
import { getAllPosts, deletePost, filterPosts, updatePost, patchPost } from '../api/posts';
import CreatePostForm from './CreatePostForm';

const BlogPosts = () => {
  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);
  const [editPost, setEditPost] = useState({ title: '', body: '', userId: '', id: '' });
  const [userPick, setUserPick] = useState("pick");

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, post) => {
      queryClient.setQueryData(['posts'], (oldData = []) => oldData.filter(obj => obj.id !== post.id));
    }
  });

  const filterMutation = useMutation({
    mutationFn: filterPosts,
    onSuccess: (filterResults) => {
      queryClient.setQueryData(['posts'], filterResults);
    }
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (fetchUpdate) => {
      queryClient.setQueryData(['posts'], (oldData = []) => {
        return oldData.map((post) => (post.id === fetchUpdate.id ? fetchUpdate : post));
      });
      setEditId(null);
    }
  });

  const patchMutation = useMutation({
    mutationFn: patchPost,
    onSuccess: (fetchUpdate) => {
      queryClient.setQueryData(['posts'], (oldData = []) => {
        return oldData.map((post) => (post.id === fetchUpdate.id ? fetchUpdate : post));
      });
      setEditId(null);
    }
  });

  const handleInputChange = (prop, value) => {
    setEditPost(prev => ({ ...prev, [prop]: value }));
  };

  const startEdit = (post) => {
    setEditId(post.id);
    setEditPost(post);
  };

  const patchOrPut = () => {
    const getCachedPost = data.find((p) => p.id === editPost.id);
    if (editPost.title !== getCachedPost.title && editPost.body === getCachedPost.body) {
      // If only the title is changed, use PATCH method
      patchMutation.mutate({ id: editPost.id, title: editPost.title });
    } else {
      // If both title and body are changed or only body is changed, use PUT method
      updateMutation.mutate(editPost);
    }
  };
  

  if (isError) {
    return <Text>Error...</Text>;
  }

  if (isLoading) {
    return <Text>Fetching posts...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <CreatePostForm />
        <Picker
          selectedValue={userPick}
          onValueChange={(itemValue) => {
            setUserPick(itemValue);
            filterMutation.mutate(itemValue);
          }}
          style={styles.picker}
        >
          {pickerOptions().map((userId) => (
            <Picker.Item key={userId} label={`User ${userId}`} value={userId} />
          ))}
        </Picker>
        {data.map((post) => (
          <View style={styles.postContainer} key={post.id}>
            {editId === post.id ? (
              <View>
                <TextInput
                  style={styles.input}
                  value={editPost.userId.toString()}
                  onChangeText={(input) => handleInputChange('userId', input)}
                />
                <TextInput
                  style={styles.input}
                  value={editPost.title}
                  onChangeText={(input) => handleInputChange('title', input)}
                />
                <TextInput
                  style={styles.input}
                  value={editPost.body}
                  onChangeText={(input) => handleInputChange('body', input)}
                />
                <Pressable style={styles.button} onPress={patchOrPut}>
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
              </View>
            ) : (
              <View>
                <Text>UserID: {post.userId}</Text>
                <Text>Title: {post.title}</Text>
                <Text>Body: {post.body}</Text>
                <Pressable style={styles.button} onPress={() => startEdit(post)}>
                  <Text>Edit</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => deleteMutation.mutate(post)}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const pickerOptions = () => {
  let arr = ['(Filter By User)'];
  for (let i = 1; i <= 10; i++) {
    arr.push(i.toString());
  }
  return arr;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  postContainer: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
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
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    width: 270,
    height: 180,
  },
});

export default BlogPosts;
