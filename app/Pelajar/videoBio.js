import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BioVideo({ navigation }) {
  const videos = [
    {
      title: 'The Circulatory System',
      lesson: 'Lesson 1',
      videoUrl: '_vMIvibgEcg', // YouTube Video ID
    },
    {
      title: 'Characteristics of Living Things',
      lesson: 'Lesson 2',
      videoUrl: 'VzoPfyaJaZQ', // YouTube Video ID
    },
    {
      title: 'Classification of Living Things',
      lesson: 'Lesson 3',
      videoUrl: 'Lyiwj0_0gXE', // YouTube Video ID
    },
    {
      title: 'Global Warming',
      lesson: 'Lesson 4',
      videoUrl: 'jfCYvspgQ8I', // YouTube Video ID
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#234873" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Biology</Text>
      </View>

      {/* Scrollable Video List */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {videos.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* YouTube Video */}
            <YouTubeIframe
              height={200}
              videoId={item.videoUrl} // Pass only the YouTube Video ID
            />

            {/* Text Content */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.lesson}>{item.lesson}</Text>
            </View>

            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => navigation.navigate('QuizScreen', { lesson: item.lesson })}
            >
              <Text style={styles.quizButtonText}>Take Quiz</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FBF3BC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#234873',
    marginLeft: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#F6EFBD',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234873',
  },
  lesson: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  quizButton: {
    backgroundColor: '#234873',
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  quizButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});