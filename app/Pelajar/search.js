import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firestore } from '../service/firebaseconfig';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  

  useEffect(() => {
    const loadSubjects = async () => {
      const data = await fetchSubjects();
      setSubjects(data);
    };

    loadSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      // Ambil koleksi utama 'coursess'
      const querySnapshot = await getDocs(collection(firestore, 'Courses'));
      const coursesData = [];
      
      // Iterasi setiap course
      for (const courseDoc of querySnapshot.docs) {
        const courseId = courseDoc.id;
        
        // Ambil data dari sub-koleksi 'meetId'
        const meetSnapshot = await getDocs(collection(firestore, `coursess/${courseId}/meetId`));
        meetSnapshot.forEach((meetDoc) => {
          const meetData = meetDoc.data();
          coursesData.push({
            id: meetDoc.id,
            title: meetData.title || '', // Default jika tidak ada 'title'
            category: 'meet', // Tambahkan kategori untuk identifikasi
          });
        });
  
        // Ambil data dari sub-koleksi 'reviews'
        const reviewsSnapshot = await getDocs(collection(firestore, `coursess/${courseId}/reviews`));
        reviewsSnapshot.forEach((reviewDoc) => {
          const reviewData = reviewDoc.data();
          coursesData.push({
            id: reviewDoc.id,
            title: reviewData.title || '', // Default jika tidak ada 'title'
            category: 'reviews', // Tambahkan kategori untuk identifikasi
          });
        });
      }
  
      console.log('Fetched subjects:', coursesData); // Periksa hasil data yang diambil
      return coursesData;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  };
  

    const saveSearchToFirebase = async (query) => {
      try {
        const docRef = await addDoc(collection(firestore, 'searchHistory'), {
          query: query,
          timestamp: new Date().toISOString(),
        });
        console.log('Search saved with ID:', docRef.id);
      } catch (error) {
        console.error('Error saving search:', error.message); // Tambahkan error message untuk lebih jelas
      }
    };

    const handleSearch = (query) => {
      setSearchQuery(query);
      if (query.trim() && !searchHistory.includes(query)) {
        saveSearchToFirebase(query);
        setSearchHistory((prev) => [...prev, query]);
      }
      const categories = ['Biologi', 'History', 'English', 'Mathematics', 'Korean', 'Arabic', 'Physics'];
        const filteredCategories = categories.filter((category) =>
        category.toLowerCase().includes(query.toLowerCase())
      );
      setRecommendations(filteredCategories); // Menampilkan kategori yang relevan
    };

    const handleRecommendationPress = (category) => {
      setSearchQuery(category); // Mengisi search query dengan kategori yang dipilih
      setRecommendations([]);    // Mengosongkan daftar rekomendasi
    
      // Logika navigasi berdasarkan kategori yang dipilih
      switch (category.toLowerCase()) {
        case 'biologi':
          navigation.navigate('bio');  // Navigasi ke screen 'bio'
          break;
        case 'history':
          navigation.navigate('course1');  // Navigasi ke screen 'History'
          break;
        case 'english':
          navigation.navigate('course');  // Navigasi ke screen 'English'
          break;
        case 'mathematics':
          navigation.navigate('Mathematics');  // Navigasi ke screen 'Mathematics'
          break;
        case 'korean':
          navigation.navigate('Korean');  // Navigasi ke screen 'Korean'
          break;
        case 'arabic':
          navigation.navigate('Arabic');  // Navigasi ke screen 'Arabic'
          break;
        case 'physics':
          navigation.navigate('course');  // Navigasi ke screen 'Physics'
          break;
        default:
          navigation.navigate('DefaultScreen');  // Optional: navigasi ke screen default jika tidak ada yang cocok
      }
    };
    

  // Filter data berdasarkan pencarian
  const filteredSubjects = subjects.filter((subject) =>
    subject.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#F6EFBD" />
        </TouchableOpacity>
        <Text style={styles.header}>Search</Text>
      </View>


      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search Courses"
          value={searchQuery}
          onChangeText={handleSearch} // Update query saat mengetik
        />
      </View>
      {/* Recomendasi Pencarian */}
      {recommendations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <FlatList
            data={recommendations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recommendationItem}
                onPress={() => handleRecommendationPress(item)}
              >
                <Text style={styles.recommendationText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {/* Riwayat Pencarian */}
      {searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Searches:</Text>
          <FlatList
            data={searchHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.historyItem}
                onPress={() => setSearchQuery(item)} // Isi ulang query saat diklik
              >
                <Text style={styles.historyText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <FlatList
        data={recommendations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recommendationItem}
            onPress={() => handleRecommendationPress(item)} // Panggil fungsi saat item dipilih
          >
      <View style={styles.courseItem}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text>{item.category}</Text>
      </View>
    </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#234873',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    top: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#F6EFBD',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7C0',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 16,
    elevation: 2,
    top: 14,
  },
  icon: {
    marginRight: 8,
    left: 285,
  },
  input: {
    flex: 1,
    fontSize: 16,
    left: -10
  },
  item: {
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  recommendationsContainer: {
    padding: 20,
  },
  recommendationItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 5,
  },
  recommendationText: {
    fontSize: 16,
  },
  historyContainer: {
    marginHorizontal: 16,
    marginBottom:20,
    top: 23,
  },
  historyTitle: {
    fontSize: 18,
    color: '#F6EFBD',
    marginBottom: 10,
  },
  historyItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F6EFBD',
  },
  historyText: {
    fontSize: 16,
    color: '#F6EFBD',
  },
});

export default Search;