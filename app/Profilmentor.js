import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the back arrow
import { FontAwesome } from '@expo/vector-icons'; // Untuk ikon bintang

const Profilmentor = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('About');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const courses = [
    { title: 'Biology', price: '20.000/meet', rating: '4.9 (100 Reviews)', image: require('../assets/bio.png') },
    { title: 'Mathematics', price: '75.000/week', rating: '4.9 (100 Reviews)', image: require('../assets/mtk.png') },
    { title: 'English', price: '350.000/month', rating: '4.9 (100 Reviews)', image: require('../assets/inggris.png') },
    { title: 'Kimia', price: '100.000/week', rating: '4.9 (100 Reviews)', image: require('../assets/kimia.png') },
  ];

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = () => {
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    alert('Review submitted!');
    setRating(0);
    setComment('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#234873" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mentor Profile</Text>
      </View>

      {/* Profile Image */}
      <Image
        source={require('../assets/Intersect.png')} // Your profile image path
        style={styles.profileImage}
      />

      {/* Mentor Name */}
      <Text style={styles.mentorName}>Putri Eka</Text>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3k</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'About' && styles.activeTab]}
          onPress={() => setActiveTab('About')}
        >
          <Text style={[styles.tabText, activeTab === 'About' && styles.activeTabText]}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Course' && styles.activeTab]}
          onPress={() => setActiveTab('Course')}
        >
          <Text style={[styles.tabText, activeTab === 'Course' && styles.activeTabText]}>Course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Review' && styles.activeTab]}
          onPress={() => setActiveTab('Review')}
        >
          <Text style={[styles.tabText, activeTab === 'Review' && styles.activeTabText]}>Review</Text>
        </TouchableOpacity>
      </View>

      {/* Content Based on Active Tab */}
      <View style={styles.contentContainer}>
        {activeTab === 'About' && (
          <Text style={styles.descriptionText}>
            Hello my name is Putri Eka, I am a mentor with 5 years of experience in teaching English.
          </Text>
        )}
        {activeTab === 'Course' && (
          <ScrollView>
            {courses.map((course, index) => (
              <View key={index} style={styles.courseCard}>
                <Image source={course.image} style={styles.courseImage} />
                <View style={styles.courseDetails}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.coursePrice}>{course.price}</Text>
                  <Text style={styles.courseRating}>{course.rating}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
        {activeTab === 'Review' && (
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Please give your rating with us</Text>
            {/* Rating Stars */}
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                  <FontAwesome
                    name={star <= rating ? 'star' : 'star-o'}
                    size={30}
                    color="#FFD700" // Gold color for stars
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Comment Input */}
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment"
              value={comment}
              onChangeText={setComment}
              multiline
            />

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setComment('')}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3BC',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#234873',
    marginLeft: 10,
    // alignSelf: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  mentorName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#234873',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#234873',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    width: '80%',
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: '#234873',
    borderRadius: 10,
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tabText: {
    fontSize: 16,
    color: '#234873',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'justify',
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  courseImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  courseDetails: {
    marginLeft: 15,
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#234873',
  },
  coursePrice: {
    fontSize: 14,
    color: '#666',
  },
  courseRating: {
    fontSize: 12,
    color: '#FFD700',
  },
  reviewContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 10,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#234873',
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  commentInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#234873',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#234873',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Profilmentor;
