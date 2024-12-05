import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const HomeScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');

  const handleCategorySelection = (category) => setSelectedCategory(category);
  const handleCourseSelection = (course) => setSelectedCourse(course);
  const handleSearchChange = (text) => setSearchQuery(text);

  const handleSeeAll = () => {
    navigation.navigate('Fiturkursus'); // Navigate to Fiturkursus
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle} />

      {/* Kolom Pencarian */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Courses..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      </View>

      {/* Greeting Section */}
      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>Hello, {username}!</Text>
        <Text style={styles.subGreeting}>Let's start Learning</Text>
      </View>

      {/* Explore Category */}
      <Text style={[styles.sectionTitle, { zIndex: 1 }]}>Explore Category</Text>
      <View style={[styles.categoryContainer, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem, selectedCourse === 'science' && styles.selectedItem]}
          onPress={() => { console.log('science');
          navigation.navigate('science');
          }}>
          <Image source={require('./assets/ipa.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Science</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.categoryContainer, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem, selectedCourse === 'Language' && styles.selectedItem]}
          onPress={() => { console.log('Language');
          navigation.navigate('bahasa');
          }}>

          <Image source={require('./assets/language.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Language</Text>
        </TouchableOpacity>
      </View>

      {/* Container terpisah untuk Arts */}
      <View style={[styles.categoryContainer2, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem2, selectedCourse === 'Arts' && styles.selectedItem]}
          onPress={() => { console.log('arts');
          navigation.navigate('Arts');
          }}>
          <Image source={require('./assets/arts.png')} style={styles.categoryImage1} />
          <Text style={styles.categoryText1}>Arts</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Courses */}
      <Text style={[styles.sectionTitle1, { zIndex: 1 }]}>Featured Courses</Text>

      <TouchableOpacity onPress={handleSeeAll}>
        <Text style={[styles.sectionTitle2, { zIndex: 1 }]}>see all</Text>
      </TouchableOpacity>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.courseContainer}>
          <TouchableOpacity
            style={[styles.courseItem, selectedCourse === 'science' && styles.selectedItem]}
            onPress={() => { console.log('science');
              navigation.navigate('Fiturkursus');
            }}>
            <Image source={require('./assets/bio.png')} style={styles.courseImage} />
            <Text style={styles.courseTitle}>Science</Text>
            <Text style={[styles.courseTitle_, { fontStyle: 'italic' }]}>Biology</Text>
            <Text style={styles.coursePrice}>30.000 - 85.000</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.courseContainer}>
          <TouchableOpacity
            style={[styles.courseItem1, selectedCourse === 'math' && styles.selectedItem]}
            onPress={() => {console.log('math');
              navigation.navigate('Fiturkursus');
            }}>
            <Image source={require('./assets/math.png')} style={styles.courseImage1} />
            <Text style={styles.courseTitle1}>Science</Text>
            <Text style={[styles.courseTitle1_1, { fontStyle: 'italic' }]}>Mathematic</Text>
            <Text style={styles.coursePrice1}>40.000 - 90.000</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navigationItem}>
          <Icon name="home" size={20} color="#888" style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationItem}>
          <Icon name="list" size={20} color="#888" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

