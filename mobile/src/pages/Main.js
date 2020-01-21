import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import  MapView  from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync,} from 'expo-location';

// import { Container } from './styles';

function Main()  {
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

       console.log(Position);
        
       console.log(LocationData);
     }
   }
   loadInitialPosition();
 }, []);

  if(!currentRegion) {
    return null;
  }

  return <MapView initialRegion={currentRegion}  style={styles.map} />
}

const styles = StyleSheet.create({
  map: {
    flex:1
  }
})

export default Main;

