import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
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
          <View>
            {props.onBackPress && (
              <BackButton onBackPress={props.onBackPress} />
            )}
          </View>
          <View style={styles.centered}>{props.children}</View>
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
    height: 175,
    backgroundColor: '#F7F8FB',
  },
  backButton: {
    flexDirection: 'row',
  },
  centered: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    marginTop: 0,
    marginHorizontal: 40,
    height: "100%",
  },
  row: {
    position: 'relative',
    marginTop: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    height: "100%",
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default Header;
