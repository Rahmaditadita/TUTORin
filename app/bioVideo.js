// ///////TANPA TOMBOL BUYY
// Di dalam bioVideo.js
import React from 'react';
import { View, Text } from 'react-native';

const BioVideo = () => {
  return (
    <View>
      <Text>Ini adalah halaman Bio Video</Text>
    </View>
  );
};

export default BioVideo; // Pastikan ada ekspor default
// // import React, { useState } from 'react';
// // import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// // import { Video } from 'expo-av';
// // import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the back arrow

// // export default function App({ navigation }) {
// //   const [playVideo, setPlayVideo] = useState([false, false, false, false]);

// //   const videos = [
// //     {
// //       thumbnail: require('../assets/sampul1.png'), // Thumbnail lokal
// //       videoUrl: 'https://youtu.be/CrlVgxuaTWk?si=KpUGmM36SKHrrFz8',
// //     },
// //     {
// //       thumbnail: require('../assets/sampul2.png'), // Thumbnail lokal
// //       videoUrl: 'https://youtu.be/UJltOSp7eZ8?si=Kg6r_eDAEkmdoiY2',
// //     },
// //     {
// //       thumbnail: require('../assets/sampul3.png'), // Thumbnail lokal
// //       videoUrl: 'https://youtu.be/Xxm6xtjsFx0?si=NFLB1G8aNNKWqE4_',
// //     },
// //     {
// //       thumbnail: require('../assets/sampul4.png'), // Thumbnail lokal
// //       videoUrl: 'https://youtu.be/pRLzqHAWTcs?si=ORaIlxHbIUdgzdEv',
// //     },
// //     {
// //       thumbnail: require('../assets/sampul5.png'), // Thumbnail lokal
// //       videoUrl: 'https://youtu.be/mtx7xk-7KqQ?si=95BYQsiWISPnYZo2',
// //     },
// //     {
// //       thumbnail: require('../assets/sampul6.png'), // Thumbnail lokal
// //       videoUrl: 'https://youtu.be/8glI_X1XoBE?si=l8b2P1WHamzMB6mZ',
// //     },
// //     {
// //       thumbnail: require('../assets/sampul7.png'), // Thumbnail lokal
// //       videoUrl: 'https://youtu.be/jKvaXpip5SM?si=h7_TJ4bQjzdlOJAV',
// //     },
// //   ];

// //   const handlePlay = (index) => {
// //     const updatedPlayStatus = [...playVideo];
// //     updatedPlayStatus[index] = true;
// //     setPlayVideo(updatedPlayStatus);
// //   };

// //   return (
// //     <SafeAreaView style={styles.safeContainer}>
// //       {/* Header with Back Arrow */}
// //       <View style={styles.headerContainer}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Ionicons name="arrow-back" size={30} color="#234873" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerText}>Biology</Text>
// //       </View>
// //       <ScrollView contentContainerStyle={styles.scrollView}>
// //         {videos.map((item, index) => (
// //           <View key={index} style={styles.videoContainer}>
// //             {playVideo[index] ? (
// //               <Video
// //                 source={{ uri: item.videoUrl }}
// //                 style={styles.video}
// //                 useNativeControls
// //                 resizeMode="cover"
// //                 shouldPlay
// //               />
// //             ) : (
// //               <TouchableOpacity onPress={() => handlePlay(index)}>
// //                 <Image source={item.thumbnail} style={styles.thumbnail} />
// //                 <Text style={styles.playButton}>▶️</Text>
// //               </TouchableOpacity>
// //             )}
// //           </View>
// //         ))}
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safeContainer: {
// //     flex: 1,
// //     backgroundColor: '#FBF3BC',
// //   },
// //   headerContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginLeft: 10,
// //     marginBottom: 20,
// //   },
// //   headerText: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#234873',
// //     marginLeft: 10,
// //   },
// //   scrollView: {
// //     padding: 10,
// //   },
// //   videoContainer: {
// //     marginBottom: 20,
// //     position: 'relative',
// //   },
// //   video: {
// //     height: 200,
// //     width: '100%',
// //   },
// //   thumbnail: {
// //     height: 200,
// //     width: '90%',
// //     borderRadius: 20,
// //     marginLeft: 17,
// //   },
// //   playButton: {
// //     position: 'absolute',
// //     top: '50%',
// //     left: '50%',
// //     transform: [{ translateX: -15 }, { translateY: -15 }],
// //     fontSize: 30,
// //     color: '#FFF',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //     borderRadius: 50,
// //     padding: 10,
// //   },
// // });


// /////ADA TOMBOL BUY
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput, Button } from 'react-native';
// import { Video } from 'expo-av';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the back arrow
// import { MaterialCommunityIcons } from '@expo/vector-icons'; // For checkmark icon

// export default function App({ navigation }) {
//   const [playVideo, setPlayVideo] = useState([false, false, false, false]);
//   const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     class: '',
//   });
//   const [paymentSuccess, setPaymentSuccess] = useState(false); // Track if payment is successful

//   const videos = [
//     {
//       thumbnail: require('../assets/sampul1.png'), // Thumbnail lokal
//       videoUrl: 'https://youtu.be/CrlVgxuaTWk?si=KpUGmM36SKHrrFz8',
//     },
//     {
//       thumbnail: require('../assets/sampul2.png'), // Thumbnail lokal
//       videoUrl: 'https://youtu.be/UJltOSp7eZ8?si=Kg6r_eDAEkmdoiY2',
//     },
//      {
//       thumbnail: require('../assets/sampul3.png'), // Thumbnail lokal
//       videoUrl: 'https://youtu.be/Xxm6xtjsFx0?si=NFLB1G8aNNKWqE4_',
//     },
//     {
//       thumbnail: require('../assets/sampul4.png'), // Thumbnail lokal
//       videoUrl: 'https://youtu.be/pRLzqHAWTcs?si=ORaIlxHbIUdgzdEv',
//     },
//     {
//       thumbnail: require('../assets/sampul5.png'), // Thumbnail lokal
//       videoUrl: 'https://youtu.be/mtx7xk-7KqQ?si=95BYQsiWISPnYZo2',
//     },
//     {
//       thumbnail: require('../assets/sampul6.png'), // Thumbnail lokal
//       videoUrl: 'https://youtu.be/8glI_X1XoBE?si=l8b2P1WHamzMB6mZ',
//     },
//     {
//       thumbnail: require('../assets/sampul7.png'), // Thumbnail lokal
//       videoUrl: 'https://youtu.be/jKvaXpip5SM?si=h7_TJ4bQjzdlOJAV',
//     },
//   ];

//   const handlePlay = (index) => {
//     const updatedPlayStatus = [...playVideo];
//     updatedPlayStatus[index] = true;
//     setPlayVideo(updatedPlayStatus);
//   };

//   const handleBuy = () => {
//     setModalVisible(true); // Show modal when "Buy Now" is pressed
//   };

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePayment = () => {
//     // You can handle payment logic here
//     console.log('Payment initiated:', formData);
//     setPaymentSuccess(true); // Set payment success
//     setTimeout(() => {
//       setModalVisible(false); // Close modal after showing success
//     }, 1000); // Delay closing to show the success message
//   };

//   return (
//     <SafeAreaView style={styles.safeContainer}>
//       {/* Header with Back Arrow */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={30} color="#234873" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Biology</Text>
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         {videos.map((item, index) => (
//           <View key={index} style={styles.videoContainer}>
//             {playVideo[index] ? (
//               <Video
//                 source={{ uri: item.videoUrl }}
//                 style={styles.video}
//                 useNativeControls
//                 resizeMode="cover"
//                 shouldPlay
//               />
//             ) : (
//               <TouchableOpacity onPress={() => handlePlay(index)}>
//                 <Image source={item.thumbnail} style={styles.thumbnail} />
//                 <Text style={styles.playButton}>▶️</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         ))}
//         {/* Buy Button below the last video */}
//         <View style={styles.buyButtonContainer}>
//           <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
//             <Text style={styles.buyButtonText}>Buy Now</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Modal for Form */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             {!paymentSuccess ? (
//               <>
//                 <Text style={styles.modalTitle}>Enter your details</Text>

//                 <TextInput
//                   style={styles.inputField}
//                   placeholder="Name"
//                   value={formData.name}
//                   onChangeText={(text) => handleInputChange('name', text)}
//                 />
//                 <TextInput
//                   style={styles.inputField}
//                   placeholder="Phone Number"
//                   keyboardType="phone-pad"
//                   value={formData.phone}
//                   onChangeText={(text) => handleInputChange('phone', text)}
//                 />
//                 <TextInput
//                   style={styles.inputField}
//                   placeholder="Class"
//                   value={formData.class}
//                   onChangeText={(text) => handleInputChange('class', text)}
//                 />

//                 <View style={styles.modalButtonsContainer}>
//                   <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
//                     <Text style={styles.paymentButtonText}>Payment</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.cancelButton}
//                     onPress={() => setModalVisible(false)}
//                   >
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             ) : (
//               <View style={styles.successContainer}>
//                 <MaterialCommunityIcons name="check-circle" size={100} color="#FBF3BC" />
//                 <Text style={styles.successText}>Success</Text>
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//     backgroundColor: '#FBF3BC',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 10,
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#234873',
//     marginLeft: 10,
//   },
//   scrollView: {
//     padding: 10,
//   },
//   videoContainer: {
//     marginBottom: 20,
//     position: 'relative',
//   },
//   video: {
//     height: 200,
//     width: '100%',
//   },
//   thumbnail: {
//     width: '95%',
//     height: 200,
//     borderRadius: 15,
//     marginLeft: 10,
//   },
//   playButton: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{ translateX: -15 }, { translateY: -15 }],
//     fontSize: 30,
//     color: 'white',
//   },
//   buyButtonContainer: {
//     marginTop: 20,
//     paddingBottom: 20,
//     alignItems: 'center',
//   },
//   buyButton: {
//     backgroundColor: '#234873',
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     width: '95%',
//   },
//   buyButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//   },

//   // Modal styles
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'flex-end', // Modal will appear from the bottom
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//   },
//   modalContainer: {
//     backgroundColor: '#234873',
//     width: '100%',
//     height: '50%', // Half screen height
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#FFF',
//   },
//   inputField: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: '#FBF3BC',
//     backgroundColor: '#FBF3BC',
//   },
//   modalButtonsContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   paymentButton: {
//     backgroundColor: '#FBF3BC',
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   paymentButtonText: {
//     color: '#234873',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   cancelButton: {
//     backgroundColor: 'gray',
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     borderRadius: 10,
//   },
//   cancelButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

//   // Success styles
//   successContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successText: {
//     fontSize: 24,
//     color: '#FBF3BC',
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
// });
