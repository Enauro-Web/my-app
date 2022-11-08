import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { db } from "../database/firebase";
import { onSnapshot, getDocs, collection } from "firebase/firestore";
// import { ScrollView } from "react-native-web";
// import { ListItem, Avatar } from "react-native-elements";
import { ListItem, Avatar } from "@rneui/themed";


const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const users = [];
      snapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setUsers(users);
    });
  }, []);
  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />
      {users.map((user) => {
        return (
        <ListItem
        key={user.id}
        bottomDivider
        onPress={() => {
            props.navigation.navigate('UserDetailsScreen', {userId:user.id})
        }}
        >
            <ListItem.Chevron />
            <Avatar rounded source={{uri:"https://randomuser.me/api/portraits/men/36.jpg"}} />
            <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>                
            </ListItem.Content>
        </ListItem>
       
        );
      })}
    </ScrollView>
  );
};

export default UsersList;
