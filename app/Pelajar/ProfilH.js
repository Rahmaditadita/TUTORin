import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the back arrow
import { FontAwesome } from '@expo/vector-icons'; // For star icons
import { useNavigation } from '@react-navigation/native';

const ProfilH = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const courses = [
    { title: 'Biology', price: '20.000/meet', rating: '4.9 (100 Reviews)', image: require('../assets/bio.png') },
    { title: 'Pyysics', price: '75.000/week', rating: '4.9 (100 Reviews)', image: require('../assets/fisika.png') },
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

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleBuy = (courseTitle) => {
    navigation.navigate('pay'); // Navigate to the payment screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={30} color="#234873" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mentor Profile</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Profile Image */}
        <Image
          source={require('../assets/Intersect.png')} // Your profile image path
          style={styles.profileImage}
        />

        {/* Mentor Name */}
        <Text style={styles.mentorName}>Miss Aini</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.5</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>98</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {['About', 'Course', 'Review'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Based on Active Tab*/}
                {/* Content Based on Active Tab */}
                <View style={styles.contentContainer}>
          {activeTab === 'About' && (
            <Text style={styles.descriptionText}>
              Hello, I am Nona Aini, an experienced mentor with five years of teaching English.
              I support students in English, biology, mathematics, and chemistry,
              using interactive and bilingual approaches to simplify concepts.
              With tailored methods to meet students' needs, I am committed to helping them overcome challenges
              and reach their full potential.
            </Text>
          )}
          {activeTab === 'Course' && (
            <View>
              {courses.map((course, index) => (
                <View key={index} style={styles.courseCard}>
                  <Image source={course.image} style={styles.courseImage} />
                  <View style={styles.courseDetails}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.coursePrice}>{course.price}</Text>
                    <Text style={styles.courseRating}>{course.rating}</Text>
                    <Ionicons name="star" size={16} color="#FFD700" style={styles.starIcon1} />
                  </View>
                  <TouchableOpacity style={styles.buyButton} onPress={() => handleBuy(course.title)}>
                    <Text style={styles.buyButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFBD',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F6EFBD',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 74,
    color: '#234873',
    textAlign: 'center'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  mentorName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  starIcon1: {
    left: -1,
    top: -9,
  },
  starIcon: {
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabItem: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#234873',
  },
  tabText: {
    fontSize: 16,
    color: '#234873',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 15,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCFAE8',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  courseImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  courseDetails: {
    flex: 1,
    marginLeft: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    top: 6,
  },
  coursePrice: {
    fontSize: 14,
    color: '#888',
    top: 6,
  },
  courseRating: {
    fontSize: 14,
    color: '#888',
    left: 24,
    top: 9,
  },
  buyButton: {
    backgroundColor: '#234873',
    borderRadius: 5,
    padding: 5,
    width: 50,
  },
  buyButtonText: {
    color: '#F6EFBD',
    textAlign: 'center',
  },
  reviewContainer: {
    marginTop: 20,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 60,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: '#234873',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProfilH;