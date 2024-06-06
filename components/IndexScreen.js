// components/IndexScreen.js
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

const IndexScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blog Post Manager</Text>
      <Button title="View Posts" onPress={() => navigation.navigate('Posts')} />
      <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
      <Button title="Update Post" onPress={() => navigation.navigate('UpdatePost')} />
      <Button title="Patch Post" onPress={() => navigation.navigate('PatchPost')} />
      <Button title="Delete Post" onPress={() => navigation.navigate('DeletePost')} />
      <Button title="Filter Posts" onPress={() => navigation.navigate('FilterPosts')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default IndexScreen;
