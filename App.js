import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import MapView from "@teovilla/react-native-web-maps";
import { ClusterProps, Marker, MarkerClusterer } from '@teovilla/react-native-web-maps';
import type { Region } from 'react-native-maps';

import * as Location from "expo-location";

function MyClusterComponent(props: ClusterProps<{ onPress(): void }>) {
  return (
    <Marker
      onPress={props.onPress}
      coordinate={props.coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View style={styles.cluster}>
        <Text style={styles.clusterText}>{props.pointCountAbbreviated}</Text>
      </View>
    </Marker>
  );
}

export default function App() {
  const loadingFallback = useMemo(() => {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }, []);

  if(true){
    Location.requestForegroundPermissionsAsync().then((reply)=>{
      console.log(reply.status);
      if (reply.status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      else{
        Location.getCurrentPositionAsync({}).then((location)=>{
          console.log(location);
        });
      }
    })
  }

  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={{ flex: 1 }}
        loadingFallback={loadingFallback}
        googleMapsApiKey={"GOOGLE_MAPS_API_KEY"}
        mapType={"satellite"}
        initialRegion ={{
          latitude: 37.019163,
          longitude: -90.684119,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
        showsUserLocation={true}
      >

        <Marker
          coordinate={{
            latitude: 37.019163,
            longitude: -90.684119,
          }}
        />

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cluster: {
    backgroundColor: 'salmon',
    width: 20,
    height: 20,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clusterText: {
    fontWeight: '700',
  },
});