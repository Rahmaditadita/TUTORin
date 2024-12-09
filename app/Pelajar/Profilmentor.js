import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebaseconfig'; // Adjust the import based on your project structure
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profilmentor = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [averageRating, setAverageRating] = useState(4.9);
  const [totalReviews, setTotalReviews] = useState(100);
  const [commentsList, setCommentsList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = 'user_id'; // Replace with actual user ID
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const courses = [
    { title: 'Biology', price: '20.000/meet', rating: '4.9 (100 Reviews)', image: require('../assets/bio.png') },
    { title: 'Mathematics', price: '75.000/week', rating: '4.9 (100 Reviews)', image: require('../assets/math.png') },
    { title: 'English', price: '350.000/month', rating: '4.9 (100 Reviews)', image: require('../assets/inggris.png') },
    { title: 'Kimia', price: '100.000/week', rating: '4.9 (100 Reviews)', image: require('../assets/kimia.png') },
  ];

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = () => {
    if (rating > 0) {
      if (editingIndex !== null) {
        // Update existing comment
        const updatedComments = commentsList.map((item, index) => 
          index === editingIndex ? { rating, comment } : item
        );
        setCommentsList(updatedComments);
        setEditingIndex(null); // Reset editing index
      } else {
        // Add new comment
        const newTotalReviews = totalReviews + 1;
        const newAverageRating = ((averageRating * totalReviews) + rating) / newTotalReviews;

        setAverageRating(newAverageRating);
        setTotalReviews(newTotalReviews);
        setCommentsList([...commentsList, { rating, comment }]);
      }
      
      Alert.alert('Review submitted!');
      setRating(0);
      setComment('');
    } else {
      Alert.alert('Please select a rating before submitting.');
    }
  };

  const StarRating = ({ rating, onRatingPress, starColor = '#FFD700', starSize = 20 }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onRatingPress(i)}>
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={starSize}
            color={starColor}
          />
        </TouchableOpacity>
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };
  

  const handleEditComment = (index) => {
    const commentToEdit = commentsList[index];
    setComment(commentToEdit.comment);
    setRating(commentToEdit.rating);
    setEditingIndex(index);
  };

  const handleDeleteComment = (index) => {
    const updatedComments = commentsList.filter(( _, i) => i !== index);
    setCommentsList(updatedComments);
  };

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleBuy = (courseTitle) => {
    navigation.navigate('pay'); // Navigate to the payment screen
  };

  const reviews = commentsList.map((item, index) => ({
    id: index.toString(), // Use index as a unique key
    author: 'User  ' + (index + 1), // Placeholder for author name
    rating: item.rating,
    text: item.comment,
  }));

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
        <Text style={styles.mentorName}>Putri Eka</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{averageRating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Ratings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalReviews}</Text>
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

        {/* Tab Content */}
        {activeTab === 'About' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>About Me</Text>
            <Text style={styles.tabDescription}>
              I am a passionate mentor with over 5 years of experience in the field. I love sharing knowledge and helping others achieve their goals.
            </Text>
          </View>
        )}

        {activeTab === 'Course' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Courses Offered</Text>
            <FlatList
              data={courses}
              renderItem={({ item }) => (
                <View style={styles.courseItem}>
                  <Text style={styles.courseTitle}>{item.title}</Text>
                  <Text style={styles.courseDescription}>{item.price}</Text>
                  <View style={styles.ratingContainer}>

                    <Text style={styles.courseRating}>{item.rating}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => handleBuy(item.title)}>
                      <Text style={styles.buyButton}>Buy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}

        {activeTab === 'Review' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Reviews</Text>
            <FlatList
              data={reviews}
              renderItem={({ item }) => (
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewAuthor}>{item.author}</Text>
                  <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
                  <Text style={styles.reviewText}>{item.text}</Text>
                  <StarRating rating={item.rating} starColor="#FFD700" />
                  <TouchableOpacity onPress={() => handleEditComment(item.id)}>
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
            {/* Review Input */}
            <View style={styles.reviewInputContainer}>
              <TextInput
                style={styles.reviewInput}
                placeholder="Write a comment..."
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity onPress={handleSubmitReview}>
                <Text style={styles.submitButton}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    padding: 16,
    backgroundColor: '#F6EFBD',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
    left: 280,
    top: -45,
},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabItem: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#234873',
  },
  tabText: {
    fontSize: 16,
    color: '#234873',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 10,
    Weight: 30,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  courseItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDescription: {
    fontSize: 16,
    color: '#666',
  },
  buyButton: {
    color: '#007BFF',
    marginTop: 5,
  },
  reviewItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  reviewAuthor: {
    fontWeight: 'bold',
  },
  reviewRating: {
    color: '#FFA500',
  },
  reviewText: {
    marginVertical: 5,
  },
  editButton: {
    color: '#007BFF',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
  reviewInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  reviewInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  submitButton: {
    color: '#007BFF',
  },
});

export default Profilmentor;