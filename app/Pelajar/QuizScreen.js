import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';

// QuizScreen
export function QuizScreen({ route, navigation }) {
  const { lesson } = route.params;

  // Objek untuk soal berdasarkan lesson
  const quizQuestions = {
    'Lesson 1': [
      {
        question: 'What is the main function of the heart in the circulatory system?',
        options: ['Producing blood', ' Pumping blood throughout the body', 'Filtering blood', 'Regulating body temperature'],
        correctAnswer: 1,
        explanation: 'The heart pumps blood throughout the body. This blood carries oxygen, nutrients, and hormones to the tissues and organs, while also removing waste products like carbon dioxide.',
      },
      {
        question: 'What is the name of the blood vessel that carries blood from the heart to the body?',
        options: ['Arteries', 'Veins', 'Capillaries', 'Aorta'],
        correctAnswer: 0,
        explanation: 'Arteries are the blood vessels that carry oxygenated blood away from the heart to various parts of the body. The largest artery in the body is the aorta, which is why it is sometimes included as an option.',
      },
    ],
    'Lesson 2': [
      {
        question: 'One of the characteristics of living organisms is..',
        options: ['Breathing', 'Not moving', 'Having wings', 'Not needing food'],
        correctAnswer: 0,
        explanation: 'Breathing is a characteristic of living organisms because they need to take in oxygen and expel carbon dioxide. Not all living organisms breathe in the same way, but they all have some method of respiration.',
      },
      {
        question: 'How do plants move?',
        options: ['Running', 'Through photosynthesis', 'Following the direction of sunlight', 'Not moving at all'],
        correctAnswer: 2,
        explanation: 'Plants do not move like animals, but they can exhibit movement in response to environmental factors, such as light (phototropism). This movement allows them to maximize their exposure to sunlight for photosynthesis.',
      },
    ],
    'Lesson 3': [
      {
        question: 'The scientist who developed the classification system for living organisms is..',
        options: ['Isaac Newton', ' Charles Darwin', 'Carolus Linnaeus', 'Gregor Mendel'],
        correctAnswer: 2,
        explanation: 'Carolus Linnaeus is the scientist who developed the binomial nomenclature system for classifying living organisms. He is known as the "father of taxonomy." His system classified organisms based on shared physical characteristics.',
      },
      {
        question: 'The kingdom that consists of unicellular organisms is..',
        options: ['Plantae', 'Animalia', 'Protista', 'Fungi'],
        correctAnswer: 2,
        explanation: 'The kingdom Protista consists of mostly unicellular organisms like algae and protozoa. Unlike the Plantae kingdom, which consists of multicellular plants, Protista organisms can live in a wide range of environments, including water and soil.',
      },
    ],
    'Lesson 4': [
      {
        question: 'The main cause of global warming is..',
        options: ['Acid rain', 'Air pollution due to greenhouse gases', 'Sun activity', ' Lack of trees in forests'],
        correctAnswer: 1,
        explanation: 'Global warming is primarily caused by an increase in greenhouse gases like carbon dioxide, methane, and nitrous oxide. These gases trap heat in the Earth’s atmosphere, leading to a rise in global temperatures.',
      },
      {
        question: 'One way to reduce global warming is..',
        options: ['Using personal vehicles', 'Planting trees', 'Burning plastic waste', 'Using more electricity'],
        correctAnswer: 1,
        explanation: 'Planting trees helps absorb carbon dioxide from the atmosphere, which is a major greenhouse gas. Trees also release oxygen, contributing to a healthier environment. Reducing deforestation and increasing green spaces can significantly mitigate global warming.',
      },
    ],
  };

  // Mendapatkan soal sesuai dengan lesson
  const questions = quizQuestions[lesson] || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

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
      setQuizCompleted(true);

    }
  };
  const handleTryAgain = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setQuizCompleted(false);  // Reset quiz completion status
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
    marginTop: 100,
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
    backgroundColor: '#FFF7C0',
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