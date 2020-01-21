import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync,} from 'expo-location';

// import { Container } from './styles';

function Main({ navigation })  {
 const [currentRegion, setCurrentRegion ] = useState(null); 
 

 useEffect(() => {
   async function loadInitialPosition() {
     const {granted} = await requestPermissionsAsync();

     if(granted) {
       const LocationData = getCurrentPositionAsync({
         enableHighAccuracy: true,
       });

       const Position = (await LocationData).coords;

       const {latitude, longitude } = Position;

       setCurrentRegion({
         latitude,
         longitude,
         latitudeDelta: 0.04,
         longitudeDelta: 0.04,
       })

       
     }
   }
   loadInitialPosition();
 }, []);

  if(!currentRegion) {
    return null;
  }

  return (
  <MapView initialRegion={currentRegion}  style={styles.map} >
    <Marker coordinate={{ latitude: 37.4218295, longitude: -122.0847763}}>
      <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/50254416?s=460&v=4' }} />

      <Callout onPress={() => {
        navigation.navigate('Profile', { github_username: 'ItsJuniorDias'});
      }}>
        <View style={styles.callout}>
           <Text style={styles.devName}>Junior Dias</Text>
           <Text style={styles.devBio}>Developer Full-Stack systems Analysis and Development student (Fatec Rio Preto). I love to create and learn new things. </Text>
           <Text style={styles.devTech}>ReactJs, React Native, NodeJs </Text>
        </View>
     </Callout>
    </Marker>
  </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex:1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderColor: '#ddd',
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTech: {
    marginTop: 5,
  }
})

export default Main;

