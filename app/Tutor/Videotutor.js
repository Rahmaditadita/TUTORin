import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal } from 'react-native';
import { WebView } from 'react-native-webview';  // Import WebView
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firestore } from '../service/firebaseconfig'; // Import Firestore instance
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Import Firestore functions

export default function TutorDashboard({ navigation }) {
  const [videos, setVideos] = useState([
    { thumbnail: require('../assets/sampul1.png'), title: 'Apa Itu Ilmu Biologi Sebenarnya?', lesson: 'Lesson 1', videoUrl: 'https://youtu.be/CrlVgxuaTWk' },
    { thumbnail: require('../assets/sampul2.png'), title: 'Understanding Cells', lesson: 'Lesson 2', videoUrl: 'https://youtu.be/UJltOSp7eZ8' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newVideo, setNewVideo] = useState({
    thumbnail: null, title: '', lesson: '', videoUrl: '',
  });
  const [showWebView, setShowWebView] = useState(false); // State to show WebView
  const [currentVideoUrl, setCurrentVideoUrl] = useState(''); // State to store current video URL

  const handleAddVideo = async () => {
    try {
      // Save video to Firestore in 'Videos' collection
      const videoRef = collection(firestore,'Users','Tutor','Videos'); // Reference to 'Videos' collection in Firestore
      await addDoc(videoRef, {
        thumbnail: newVideo.thumbnail,
        title: newVideo.title,
        lesson: newVideo.lesson,
        videoUrl: newVideo.videoUrl,
      });

      // Update local state after successful addition
      setVideos((prevVideos) => [...prevVideos, newVideo]);

      // Clear form and close modal
      setNewVideo({ thumbnail: null, title: '', lesson: '', videoUrl: '' });
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding video: ', error);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoRef = collection(firestore,'Users','Tutor','Videos' );
        const videoSnapshot = await getDocs(videoRef);
        const fetchedVideos = [];

        for (const videoDoc of videoSnapshot.docs) {
          const videoData = videoDoc.data();
          fetchedVideos.push(videoData);
        }

        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos: ', error);
      }
    };

    fetchVideos();
  }, []);

  const handleDeleteVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handlePlayVideo = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setShowWebView(true); // Show the WebView when a video is selected
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#234873" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tutor Dashboard</Text>
      </View>

      {/* Add Video Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Add Video</Text>
      </TouchableOpacity>

      {/* Video List */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {videos.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.thumbnail} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.lesson}>{item.lesson}</Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.quizButton}
                onPress={() => navigation.navigate('QuizScreen', { lesson: item.lesson })}
              >
                <Text style={styles.quizButtonText}>Manage Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteVideo(index)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash" size={20} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => handlePlayVideo(item.videoUrl)} // Handle play video
              >
                <Ionicons name="play-circle" size={30} color="#234873" />
                <Text style={styles.playButtonText}>Play Video</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* WebView for Video Playback */}
      {showWebView && (
        <WebView
          source={{ uri: currentVideoUrl }}
          style={{ height: 300, marginTop: 10 }}
        />
      )}

      {/* Modal for Adding Video */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Video</Text>
          <TextInput
            placeholder="Lesson Title"
            style={styles.input}
            value={newVideo.title}
            onChangeText={(text) => setNewVideo({ ...newVideo, title: text })}
          />
          <TextInput
            placeholder="Lesson Number"
            style={styles.input}
            value={newVideo.lesson}
            onChangeText={(text) => setNewVideo({ ...newVideo, lesson: text })}
          />
          <TextInput
            placeholder="Video URL"
            style={styles.input}
            value={newVideo.videoUrl}
            onChangeText={(text) => setNewVideo({ ...newVideo, videoUrl: text })}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddVideo}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#234873',
    padding: 10,
    margin: 16,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 8,
  },
  scrollView: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 330,
    height: 230,
  },
  thumbnail: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginTop: -192,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  quizButton: {
    backgroundColor: '#234873',
    padding: 10,
    borderRadius: 5,
    top: 72,
  },
  quizButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 5,
    top: 72,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#234873',
    padding: 10,
    borderRadius: 5,
    top: 72
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: -1,
    left: -12,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FBF3BC',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#234873',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  cancelButton: {
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#D9534F',
    fontSize: 16,
  },
});
