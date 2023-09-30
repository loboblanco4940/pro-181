import {StatusBar} from"expo-status-bar"
import React, {Component} from "react";
import {StyleSheet, Text, View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class Main extends React.Component{
    render(){
        return(
            <View style = {styles.middleContainer}>
                <Camera
                    style={{ flex:1}}
                    type={Camera.Constant.Type.front}
                    faceDetectorSettings={{
                        mode:FaceDetector.Constants.Mode.fast,
                        detectLandmarks: FaceDetector.Constants.Landmarks.all,
                        runClassifications: FaceDetector.Constants.runClassifications.all
                    }}
                    onFacesDetected={this.onFacesDetected}
                    onFacesDetectionError={this.onFacesDetectionError}
                />
            </View>
        )
    }    
    constructor(props){
        super(props);
        this.states = {
            hasCameraPermission: null,
            faces: []
        };
        this.onFacesDetected = this.onFacesDetected.bind(this);
    }

async componentDidMount(){
    const {status} = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted"});
}    

    onFacesDetected({faces}){
    this.setState({faces:faces});
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    droidSafeArea:{
        marginTop:Platform.OS==="android" ? StatusBar.currentHeight : 0,
    }
})