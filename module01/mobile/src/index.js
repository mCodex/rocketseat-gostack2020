import React, {useState, useEffect} from 'react';
import {
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#7159c1',
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  projectTitle: {
    color: '#fff',
  },
});

export default () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadDataFromAPI = async () => {
      const {data} = await api.get('/projects');
      return setProjects(data);
    };
    loadDataFromAPI();
  }, [projects]);

  const handleAddProject = async () => {
    const response = await api.post('/projects', {
      title: 'Hello',
      owner: 'world',
    });

    const project = response.data;
    setProjects([...projects, project]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <FlatList
        data={projects}
        extraData={projects}
        keyExtractor={({id}) => id}
        renderItem={({item: {title}}) => (
          <Text style={styles.projectTitle}>{title}</Text>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProject}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
