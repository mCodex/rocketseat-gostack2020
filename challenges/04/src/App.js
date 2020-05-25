import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  techsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
    backgroundColor: '#04d361',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff',
    backgroundColor: '#7159c1',
    padding: 15,
  },
});

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const loadDataFromAPI = async () => {
      const { data } = await api.get('/repositories');
      setRepositories(data);
    };
    loadDataFromAPI();
  }, []);

  async function handleLikeRepository(repository) {
    try {
      await api.post(`/repositories/${repository.id}/like`);

      const updatedRepositories = repositories.map((r) => {
        if (r.id === repository.id) {
          r.likes += 1;
        }
        return r;
      });

      setRepositories(updatedRepositories);
    } catch (ex) {
      console.log(ex); // eslint-disable-line
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repositories.map(({
          id, techs, likes, title,
        }) => (
          <View style={styles.repositoryContainer} key={`${title}-${id}`}>
            <Text style={styles.repository}>{title}</Text>
            <View style={styles.techsContainer}>
              {techs.map((tech) => (
                <>
                  <Text style={styles.tech} key={tech}>
                    {tech}
                  </Text>
                </>
              ))}
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-${id}`}
              >
                {`${likes} curtidas`}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository({
                id, techs, likes, title,
              })}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
              testID={`like-button-${id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </SafeAreaView>
    </>
  );
}
