import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';

// QuizScreen
export function QuizScreen({ route, navigation }) {
  const { lesson } = route.params;

  // Objek untuk soal berdasarkan lesson
  const quizQuestions = {
    'Lesson 1': [
      {
        question: 'What is the main function of the heart?',
        options: ['Pumping blood', 'Digesting food', 'Filtering waste', 'Producing energy'],
        correctAnswer: 0,
      },
      {
        question: 'What organ is responsible for pumping blood?',
        options: ['Lungs', 'Heart', 'Kidney', 'Brain'],
        correctAnswer: 1,
      },
    ],
    'Lesson 2': [
      {
        question: 'What is the basic unit of life?',
        options: ['Tissue', 'Organ', 'Cell', 'Organ system'],
        correctAnswer: 2,
      },
      {
        question: 'Which of the following is not a type of cell?',
        options: ['Animal cell', 'Plant cell', 'Bacterial cell', 'Water cell'],
        correctAnswer: 3,
      },
    ],
    'Lesson 3': [
      {
        question: 'Which part of the plant is responsible for photosynthesis?',
        options: ['Root', 'Stem', 'Leaf', 'Flower'],
        correctAnswer: 2,
      },
      {
        question: 'What is the process by which plants make their own food?',
        options: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'],
        correctAnswer: 1,
      },
    ],
    'Lesson 4': [
      {
        question: 'Which of these animals is classified as a mammal?',
        options: ['Lion', 'Snake', 'Frog', 'Eagle'],
        correctAnswer: 0,
      },
      {
        question: 'What is the main characteristic of birds?',
        options: ['Feathers', 'Scales', 'Fur', 'Tentacles'],
        correctAnswer: 0,
      },
    ],
  };

  // Mendapatkan soal sesuai dengan lesson
  const questions = quizQuestions[lesson] || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (index) => {
    setSelectedOption(index);
  };

  const handleNextPress = () => {
    if (selectedOption === null) {
      Alert.alert('Please select an option');
      return;
    }

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Show final score
      Alert.alert(
        'Quiz Completed',
        `You scored ${score + (selectedOption === questions[currentQuestion].correctAnswer ? 1 : 0)} out of ${questions.length}`,
        [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.lessonText}>Quiz: {lesson}</Text>
      <Text style={styles.questionText}>{questions[currentQuestion]?.question}</Text>

      <ScrollView style={styles.optionsContainer}>
        {questions[currentQuestion]?.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, selectedOption === index && styles.selectedOptionButton]}
            onPress={() => handleOptionPress(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>
          {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3BC',
    padding: 20,
    justifyContent: 'center',
  },
  lessonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#234873',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234873',
    marginBottom: 20,
    marginLeft: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    width: '70%',
    borderColor: '#234873',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#234873',
  },
  optionText: {
    fontSize: 16,
    color: '#234873',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#234873',
    paddingVertical: 15,
    borderRadius: 15,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});