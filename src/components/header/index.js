import React from 'react';
import {StyleSheet, View, SafeAreaView, TouchableOpacity, ImageBackground} from 'react-native';
import * as Progress from 'react-native-progress';
import {Icon, Text} from 'react-native-ui-kitten';

const imageBg = require('../../../assets/header.png');

function BackButton(props) {
  return (
    <TouchableOpacity onPress={props.onBackPress}>
      <View style={styles.backButton}>
        <Icon
          name="arrow-ios-back-outline"
          width={20}
          height={20}
          fill="white"
        />
        <Text style={{color: 'white'}}>Back</Text>
      </View>
    </TouchableOpacity>
  );
}

function Header(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={imageBg} style={{height: '100%', width: '100%'}}>
        <View style={styles.row}>
          <View>{props.onBackPress && <BackButton onBackPress={props.onBackPress}/>}</View>
          <View style={styles.centered}>
            <View>
              <Progress.Circle
                size={90}
                progress={props.progress}
                borderWidth={0}
                showsText={true}
                formatText={props.formatText}
                textStyle={styles.textStyle}
                style={styles.progress}
                color="rgba(255,255,255,1)"
                unfilledColor="#ffa08b"
              />
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>ME</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    backgroundColor: '#F7F8FB',
  },
  progress: {
    elevation: 2,
  },
  backButton: {
    flexDirection: 'row',
  },
  textStyle: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  centered: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 40,
  },
  row: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default Header;
