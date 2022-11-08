import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { db } from "../database/firebase";
import { onSnapshot, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
// import { ActivityIndicator } from 'react-native-web';

const UserDetailScreen = (props) => {
  // console.log(props.route.params.userId)

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    const user = docSnap.data();
    setUser({
      ...user,
      id: id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const updateUser = async () => {
    const docRef = doc(db, "users", props.route.params.userId);
    await updateDoc(docRef, {
        name:user.name,
        email:user.email,
        phone:user.phone
    });
    props.navigation.navigate("UsersList");
  };

  const deleteUser = async () => {
    const docRef = doc(db, "users", props.route.params.userId);
    await deleteDoc(docRef);
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Remove the User",
      "Are you sure that you want to delete the user?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("Canceled") },
      ]
    );
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          value={user.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          value={user.email}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          value={user.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button
          color="#19AC52"
          title="Update User"
          onPress={() => {
            updateUser();
          }}
        />
      </View>
      <View>
        <Button
          color="#E37399"
          title="Delete User"
          onPress={() => {
            openConfirmationAlert();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
});

export default UserDetailScreen;
