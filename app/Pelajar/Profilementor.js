import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, getDoc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { db, firestore } from '../service/firebaseconfig'; // Ensure this path is correct
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfilementorScreen = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [averageRating, setAverageRating] = useState(4.9);
  const [totalReviews, setTotalReviews] = useState(100);
  const [commentsList, setCommentsList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [aboutDescription, setAboutDescription] = useState('');
  const [commentsTotal, setCommentsTotal] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const tutorId = auth.currentUser  ? auth.currentUser .uid : null;

      if (tutorId) {
        try {
          // Ambil data pengguna
          const userDoc = await getDoc(doc(firestore, 'Users', tutorId));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('No such document!');
          }

          // Ambil deskripsi
          const tutorDocRef = doc(firestore, 'Users', 'Tutor', 'Courses', 'deskripsi');
          const tutorDoc = await getDoc(tutorDocRef);
          if (tutorDoc.exists()) {
            setAboutDescription(tutorDoc.data().description || 'No description available.');
          } else {
            console.log('No tutor document found!');
          }

          // Ambil ulasan
          const reviewsRef = collection(firestore, 'Reviews');
          const reviewsSnapshot = await getDocs(reviewsRef);
          const fetchedReviews = reviewsSnapshot.docs.map(doc => doc.data());
          setCommentsList(fetchedReviews);
          setTotalReviews(fetchedReviews.length); // Update totalReviews
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.log('No user is currently logged in.');
      }
    };

    fetchData();
  }, []);

    const fetchAboutDescriptionAndReviews = async () => {
      try {
        const tutorDocRef = doc(firestore, 'Users', 'Tutor', 'Courses', 'deskripsi');
        const tutorDoc = await getDoc(tutorDocRef);

        if (tutorDoc.exists()) {
          setAboutDescription(tutorDoc.data().description || 'No description available.');
        } else {
          console.log('No tutor document found!');
        }

        const reviewsRef = collection(firestore, 'Reviews');
        const reviewsSnapshot = await getDocs(reviewsRef);
        const fetchedReviews = reviewsSnapshot.docs.map(doc => doc.data());
        setCommentsList(fetchedReviews);
      } catch (e) {
        console.error('Error fetching description and reviews:', e);
      }
    };
    fetchAboutDescriptionAndReviews();
    const addComment = async (newComment) => {
      const commentsCollection = collection(db, 'comments');
      await addDoc(commentsCollection, newComment);
      
      // Fetch comments again to update the state
      fetchComments();
    };

    const saveReviewToFirebase = async () => {
      try {
        const reviewsRef = collection(firestore, 'Reviews');
        const docRef = await addDoc(reviewsRef, {
          tutorId: 'TutorId', // Ganti dengan ID tutor yang sebenarnya
          rating: rating,
          comment: comment,
          timestamp: new Date(),
        });
  
        const newReview = {
          id: docRef.id,
          rating: rating,
          comment: comment,
        };
        setCommentsList((prevComments) => [...prevComments, newReview]);
        setTotalReviews((prevTotal) => prevTotal + 1); // Update totalReviews
  
        Alert.alert('Review submitted!');
      } catch (error) {
        console.error('Error saving review:', error);
      }
    };

    const handleSubmitReview = () => {
      if (!comment.trim()) {
        Alert.alert('Comment cannot be empty.');
        return;
      }
  
      if (rating > 0) {
        saveReviewToFirebase();
        setComment(''); // Reset the comment input after submission
        setRating(0); // Reset the rating after submission
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

  const handleBack = () => {
    navigation.goBack();
  };
  const courses = [
    { title: 'Biology Starter Pack', price: '20000', rating: '4.9 (100 Reviews)',
      description: 'Bebas atur jadwal, bebas pilih sesi',
      description: 'Mulai perjalanan belajarmu dengan paket coba-coba yang seru di TUTORin!',
      details: [
        '1 sesi privat',
        '120 menit per sesi',
        'Bebas atur jadwal',
        'Bebas atur sesi'
      ]},
    { title: 'Biology Mastery Pack',  price: '75000', rating: '4.9 (100 Reviews)',
      description: 'Coba paket ini dan temukan cara mudah belajar biologi!',
      details: [
        '3 sesi privat',
        '120 menit per sesi',
        'Bebas atur jadwal',
        'Bebas atur sesi'
      ]},
  ];

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };
  

  const handleBuy = (courseTitle) => {
    Alert.alert(
      'Buy Course',
      `Do you want to buy the course ${courseTitle}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => navigation.navigate('pay') },
      ]
    );
  };

  const reviews = commentsList.map((item, index) => ({
    id: index.toString(),
    author: 'User  ' + (index + 1),
    rating: item.rating,
    text: item.comment,
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6EFBD' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={{ flex: 1 }}>
        {/* Header with Back Arrow */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={30} color="#234873" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mentor Profile</Text>
        </View>
        <Image source={require('../assets/aini.png')} style={styles.profileImage} />
        <Text style={styles.mentorName}>Miss Sekar</Text>
  
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
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
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
  
        {activeTab === 'About' && (
          <View style={styles.tabContent}>
            <Text style={[styles.tabTitle, { textAlign: 'center' }]}>About Me</Text>
            <Text style={[styles.tabDescription, { textAlign: 'center' }]}>
              {aboutDescription || 'No information available.'}
            </Text>
          </View>
        )}

  
        {/* Course Tab Content */}
        {activeTab === 'Course' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Courses Offered</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              {courses.map((item, index) => (
                <View key={index} style={styles.courseItem}>
                  <Text style={styles.courseTitle}>{item.title}</Text>
                  <Text style={styles.courseDescription}>{item.description}</Text>
                  <Text style={styles.coursePrice}>{item.price}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.courseRating}>{item.rating}</Text>
                  </View>
                  <View style={styles.courseDetailsContainer}>
                    {item.details.map((detail, index) => (
                      <View key={index} style={styles.detailItem}>
                        <Icon name="check" size={20} color="green" />
                        <Text style={styles.courseDetail}>{detail}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => handleBuy(item.title)}>
                      <Text style={styles.buyButton}>Buy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
  
        {/* Review Tab Content */}
        {activeTab === 'Review' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Reviews</Text>
            <View style={styles.reviewInputContainer}>
              <Text style={styles.inputLabel}>Rate this mentor:</Text>
              <View style={styles.startWrapper}>
                <StarRating
                  rating={rating}
                  onRatingPress={handleRating}
                  starColor="#FFD700"
                  starSize={25}
                />
              </View>
              <TextInput
                style={styles.reviewInput}
                placeholder="Write a comment..."
                value={comment}
                onChangeText={setComment}
                editable={true}
              />
              <TouchableOpacity onPress={handleSubmitReview}>
                <Text style={styles.submitButton}>Submit</Text>
              </TouchableOpacity>
            </View>
  
            {/* Reviews List */}
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
  {commentsList.map((item, index) => (
    <View key={index} style={styles.reviewItem}>
      <Text style={styles.reviewAuthor}>User {index + 1}</Text>
      <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
      <Text style={styles.reviewText}>{item.comment}</Text>
      <StarRating rating={item.rating} starColor="#FFD700" />
    </View>
  ))}
</ScrollView>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
  

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
    marginLeft: 65,
    marginTop: 50,
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
    top: -20
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
    top: -10
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
  },inputLabel: {

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
    top: -16,
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
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 120,
    left: 260,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDescription: {
    fontSize: 16,
    color: '#666',
  },
  courseRating: {
    color: '#000',
    top: -5,
    fontSize: 16,
  },
  buyButton: {
    color: '#007BFF',
    marginTop: 12,
    top: 33,
    fontSize: 18,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  courseDetail: {
    marginLeft: 10, // Memberikan jarak antara ikon dan teks
    fontSize: 14,
    color: '#333',
  },
  reviewItem: {
    marginBottom: 15,
    padding: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    top: 31,
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
  inputLabel: {
    color: '#000',
    marginRight: 10,
    top: -30,
  },
  reviewInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    Top: -30,
  },
  reviewInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 50,
    marginRight: -220,
    top:18,
    left: -241
  },
  startWrapper: {
    position: 'relative',
    top: -32, // Mengatur posisi lebih tinggi
  },  
  submitButton: {
    color: '#007BFF',
    top:18,
    left: -5,
  },
});

export default ProfilementorScreen;