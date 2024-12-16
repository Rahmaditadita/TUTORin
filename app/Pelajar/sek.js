import React, { useEffect, useState } from 'react';
import { SafeAreaView, View,  Text, Image, ScrollView, TouchableOpacity, FlatList, TextInput, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../service/firebaseconfig'; // Adjust the import based on your project structure
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Screen = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [averageRating, setAverageRating] = useState(4.9);
  const [totalReviews, setTotalReviews] = useState(100);
  const [commentsList, setCommentsList] = useState([]);
  const [userData, setUserData] = useState(null);
  const mentorId = 'mentor_id';

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = 'user_id'; // Ganti dengan ID user yang sedang login
      try {
        const userDoc = await getDoc(doc(firestore, 'users', userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'reviews'));
        const reviews = [];
        querySnapshot.forEach((doc) => {
          reviews.push({ ...doc.data(), id: doc.id });
        });
        setCommentsList(reviews);
      } catch (e) {
        console.error('Error fetching reviews:', e);
      }
    };

    const fetchReviewsFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'reviews'));
        const reviews = [];
        querySnapshot.forEach((doc) => {
          reviews.push({ ...doc.data(), id: doc.id });
        });
        setCommentsList(reviews);
      } catch (e) {
        console.error('Error fetching reviews: ', e);
      }
    };

    const fetchMentorData = async () => {
      try {
        const mentorDocRef = doc(firestore, 'mentors', mentorId);
        const mentorDoc = await getDoc(mentorDocRef);
        if (mentorDoc.exists()) {
          const mentorData = mentorDoc.data();
          setAverageRating(mentorData.ratings);
          setTotalReviews(mentorData.totalReviews);
        }
      } catch (e) {
        console.error('Error fetching mentor data: ', e);
      }
    };
  
    fetchReviews();
    fetchUserData();
    fetchReviewsFromFirebase();
    fetchMentorData();
  }, []);

  const saveReviewToFirebase = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'reviews'), {
        userId: 'user_id',  // Ganti dengan user yang sedang login
        rating: rating,
        comment: comment,
        timestamp: new Date(),
        mentorId: mentorId, // Menyimpan ID mentor yang di-review
      });
      console.log('Review saved with ID: ', docRef.id);
      
      const mentorDocRef = doc(firestore, 'mentors', mentorId);
      const mentorDoc = await getDoc(mentorDocRef);
      if (mentorDoc.exists()) {
        const mentorData = mentorDoc.data();
        const newTotalReviews = mentorData.totalReviews + 1;
        const newAverageRating = (mentorData.ratings * mentorData.totalReviews + rating) / newTotalReviews;
  
        // Update rating dan jumlah review pada mentor
        await setDoc(mentorDocRef, {
          ratings: newAverageRating,
          totalReviews: newTotalReviews,
        });
  
        // Update state
        setTotalReviews(newTotalReviews);
        setAverageRating(newAverageRating);
        Alert.alert('Review submitted!');
        setRating(0);
        setComment('');
      } else {
        console.log('Mentor not found!');
      }
    } catch (e) {
      console.error('Error adding review: ', e);
    }
  };

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
    if (!comment.trim()) {
      Alert.alert('Comment cannot be empty.');
      return;
    }

    if (rating > 0) {
      saveReviewToFirebase();  // Simpan review ke Firebase
    } else {
      Alert.alert('Please select a rating before submitting.');
    }
  };

  const timeAgo = (timestamp) => {
    return moment(timestamp).fromNow();  // Menggunakan moment.js untuk menampilkan waktu relatif
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

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
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
    id: index.toString(), // Use index as a unique key
    author: 'User  ' + (index + 1), // Placeholder for author name
    rating: item.rating,
    text: item.comment,
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6EFBD' }}>
      <ScrollView 
      contentContainerStyle={{ paddingBottom: 20 }} // Tambahkan padding bawah
      style={{ flex: 1 }} // Pastikan ScrollView memiliki flex: 1
      >

      {/* Header with Back Arrow */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={30} color="#234873" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mentor Profile</Text>
      </View>
        <Image
          source={require('../assets/aini.png')} style={styles.profileImage}/>
          <Text style={styles.mentorName}>Miss Aini</Text>
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
            <Text style={[styles.tabTitle, { textAlign: 'center' }]}>About Me</Text>
            <Text style={[styles.tabDescription, { textAlign: 'center' }]}>
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
              nestedScrollEnabled={true}
            />
          </View>
        )}

        {activeTab === 'Review' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Reviews</Text>
            <View style={styles.reviewInputContainer}>
              <Text style={styles.inputLabel}>Rate this mentor:</Text>
              <View style = {styles.startWrapper}>
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
            <FlatList
              data={reviews}
              renderItem={({ item }) => (
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewAuthor}>{item.author}</Text>
                  <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
                  <Text style={styles.reviewText}>{item.text}</Text>
                  <StarRating rating={item.rating} starColor="#FFD700" />
                </View>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 20 }} // Tambahkan padding bawah
              scrollEnabled={true}
            />
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

export default sekScreen;