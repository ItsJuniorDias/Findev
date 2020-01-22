import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync,} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; 
 
import api from '../services/api';

function Main({ navigation })  {
 const [currentRegion, setCurrentRegion ] = useState(null); 
 const [devs, setDevs] = useState([]);
 const [techs, setTechs] = useState('');

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

  async function loadDevs() {
    const {latitude, longitude} = currentRegion;
    
    const response = await api.get('/search', {
      params: {
        techs,
        latitude, 
        longitude
      }
    }); 
    
    console.log(response.data);
    setDevs(response.data.devs);
  }

  function handleRegionChanged(region) {
     setCurrentRegion(region);
  }

  if(!currentRegion) {
    return null;
  }

  return (
  <>
  
   <MapView 
    onRegionChangeComplete={handleRegionChanged} 
    initialRegion={currentRegion}  
    style={styles.map}
   >
    {devs.map(dev =>( 
           <Marker 
           key={dev._id}
           coordinate={{ 
             latitude: dev.location.coordinates[0] , 
             longitude:dev.location.coordinates[1] 
             }}
             >  

           <Image style={styles.avatatar} source={{ uri: dev.avatar_url }}/>
           <Callout onPress={() => { 
             navigation.navigate('Profile', {github_username: dev.github_username});
           }}> 
             <View style={styles.callout}>
               <Text style={styles.devName}>{dev.name}</Text>
               <Text style={styles.devBio}>{dev.bio}</Text>
               <Text style={styles.devTech}>{dev.techs.join(', ')}</Text>
             </View>
            </Callout>
          </Marker>
    ))}
    </MapView>
    
    <View style={styles.searchForm}> 
      <TextInput 
      style={styles.searchInput} 
       placeholder="Buscar devs por techs..."
       placeholderTextColor="#999"
       autoCapitalize="words"
       autoCorrect={false}
       value={techs}
       onChangeText={setTechs}
      />
      
      <TouchableOpacity  onPress={loadDevs} style={styles.loadButton}>
        <MaterialIcons name="my-location" size={30} color="#fff"/>
        </TouchableOpacity>
     </View>
   
  </>
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
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },

    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4e1ce9',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,

  }
})

export default Main;

