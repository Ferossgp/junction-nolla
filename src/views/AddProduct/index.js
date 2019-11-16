import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';

import {Button, Text, Icon} from 'react-native-ui-kitten';

function addProduct(props) {
  const [isVisible, setVisibility] = useState(false);
  return (
    <>
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onSwipeComplete={() => setVisibility(false)}
        onBackdropPress={() => setVisibility(false)}
        onBackButtonPress={() => setVisibility(false)}
        swipeDirection={['down']}
        useNativeDriver={true}
        style={styles.modal}>
        <View style={styles.content}>
          <Text>Hello</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={1}
            thumbTintColor="#FF7759"
            minimumTrackTintColor="#FF7759"
            maximumTrackTintColor="rgba(0,0,0,0.08)"
          />
        </View>
      </Modal>
      <Button
        onPress={() => setVisibility(true)}
        style={{
          backgroundColor: '#77CCA4',
          borderColor: '#77CCA4',
          width: 50,
          height: 50,
          borderRadius: 50,
          elevation: 8,
        }}
        size="giant"
        icon={style => <Icon {...style} name="plus-outline" />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modal: {margin: 16},
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default addProduct;
