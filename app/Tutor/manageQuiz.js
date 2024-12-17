import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ManageQuiz({ route, navigation }) {
    const { lesson } = route.params || {};

  // Objek untuk soal berdasarkan lesson
  const [quizQuestions, setQuizQuestions] = useState({
    'Lesson 1': [
      {
        question: 'What is the main function of the heart?',
        options: ['Pumping blood', 'Digesting food', 'Filtering waste', 'Producing energy'],
        correctAnswer: 0,
      },
    ],
    'Lesson 2': [],
    'Lesson 3': [],
    'Lesson 4': [],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const handleAddOrEditQuestion = () => {
    if (!newQuestion.question || newQuestion.options.some((opt) => !opt)) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const updatedQuestions = [...(quizQuestions[lesson] || [])];
    if (editMode) {
      updatedQuestions[currentQuestionIndex] = newQuestion;
    } else {
      updatedQuestions.push(newQuestion);
    }

    setQuizQuestions({ ...quizQuestions, [lesson]: updatedQuestions });
    resetForm();
  };

  const handleDeleteQuestion = (index) => {
    Alert.alert('Delete Question', 'Are you sure you want to delete this question?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedQuestions = [...(quizQuestions[lesson] || [])];
          updatedQuestions.splice(index, 1);
          setQuizQuestions({ ...quizQuestions, [lesson]: updatedQuestions });
        },
      },
    ]);
  };

  const resetForm = () => {
    setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
    setEditMode(false);
    setCurrentQuestionIndex(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Go Back',
              'Are you sure you want to go back? Unsaved changes will be lost.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Go Back', onPress: () => navigation.goBack() },
              ]
            )
          }
        >
          <Ionicons name="arrow-back" size={30} color="#234873" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Quiz: {lesson}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {(quizQuestions[lesson] || []).map((question, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.questionText}>{question.question}</Text>
            {question.options.map((option, i) => (
              <Text
                key={i}
                style={[styles.optionText, i === question.correctAnswer && styles.correctAnswerText]}
              >
                {'${i + 1}. ${option}'}
              </Text>
            ))}

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setEditMode(true);
                  setCurrentQuestionIndex(index);
                  setNewQuestion(question);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteQuestion(index)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditMode(false);
          setCurrentQuestionIndex(null);
          setModalVisible(true);
        }}
      >
        <Ionicons name="add-circle" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Add Question</Text>
      </TouchableOpacity>

      {/* Modal for Add/Edit Question */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{editMode ? 'Edit Question' : 'Add Question'}</Text>
          <TextInput
            placeholder="Question"
            style={styles.input}
            value={newQuestion.question}
            onChangeText={(text) => setNewQuestion({ ...newQuestion, question: text })}
          />
          {newQuestion.options.map((option, index) => (
            <TextInput
              key={index}
              placeholder={'Option ${index + 1}'}
              style={styles.input}
              value={option}
              onChangeText={(text) =>
                setNewQuestion((prev) => {
                  const updatedOptions = [...prev.options];
                  updatedOptions[index] = text;
                  return { ...prev, options: updatedOptions };
                })
              }
            />
          ))}
          <TextInput
            placeholder="Correct Answer (0-3)"
            style={styles.input}
            keyboardType="number-pad"
            value={String(newQuestion.correctAnswer)}
            onChangeText={(text) =>
              setNewQuestion({ ...newQuestion, correctAnswer: parseInt(text, 10) || 0 })
            }
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddOrEditQuestion}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#234873',
    marginLeft: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#234873',
  },
  optionText: {
    fontSize: 14,
    color: '#234873',
    marginTop: 4,
  },
  correctAnswerText: {
    fontWeight: 'bold',
    color: '#28A745',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
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
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
    backgroundColor: '#28A745',
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
    backgroundColor: '#D9534F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
