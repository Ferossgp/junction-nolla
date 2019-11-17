import React, {useState} from 'react';
import {View, Image} from 'react-native';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {ListItem, Text} from 'react-native-ui-kitten';
import Slider from '@react-native-community/slider';

const ItemAccessory = prop => {
  const shelf_time = shelf_time > 0 ? shelf_time : 1;
  const exp_time = exp_time > 0 ? exp_time : 1;
  const progress = 100 / (shelf_time / exp_time) / 100 || 0;
  console.log(
    prop.shelf_time,
    prop.exp_time,
    100 / (prop.shelf_time / prop.exp_time) / 100,
  );
  return (
    <Progress.Circle
      size={28}
      allowFontScaling={true}
      textStyle={{fontSize: 14, color: '#cbcbcb'}}
      progress={progress}
      borderWidth={0}
      showsText={true}
      formatText={() => `${prop.exp_time > 99 ? 99 : prop.exp_time}`}
      color={prop.exp_time > 0 ? '#77CCA4' : '#F63501'}
      unfilledColor="#f7f7f7"
    />
  );
};

const ItemImage = props => (
  <View
    style={{
      borderRadius: 3,
      borderColor: 'rgba(255, 119, 89, 0.08)',
      borderWidth: 1,
      backgroundColor: 'white',
    }}>
    <Image
      style={{width: 34, height: 34}}
      source={{
        uri: props.url + '?h=80',
      }}
    />
  </View>
);

const TextValue = props => (
  <Text style={{color: '#77CCA4', fontSize: 13, fontWeight: 'bold'}}>
    {props.children}
  </Text>
);
const TextBadValue = props => (
  <Text style={{color: '#FF7759', fontSize: 16, fontWeight: 'bold'}}>
    {props.children}
  </Text>
);
const TextGoodValue = props => (
  <Text style={{color: '#77CCA4', fontSize: 16, fontWeight: 'bold'}}>
    {props.children}
  </Text>
);

export function RenderItem(props) {
  const {product, daily_goal, amount_left} = props;
  const maxSize = amount_left;

  const [isVisible, setVisibility] = useState(false);
  const [size, setSize] = useState(Math.round(maxSize / 2));

  const caloriesToday = daily_goal && daily_goal.calories.progress;
  const carbsToday = daily_goal && daily_goal.carbs.progress;
  const fatsToday = daily_goal && daily_goal.fats.progress;
  const proteinToday = daily_goal && daily_goal.proteins.progress;

  const caloriesPerHundred = product && product.energy_kcal;
  const carbsPerHundred = product && product.carbs;
  const fatsPerHundred = product && product.fats;
  const proteinPerHundred = product && product.protein;

  const carbsTotal = daily_goal && daily_goal.carbs.total;
  const carbsCurrent = Math.round(carbsToday + (carbsPerHundred / 100) * size);

  const fatsTotal = daily_goal && daily_goal.fats.total;
  const fatsCurrent = Math.round(fatsToday + (fatsPerHundred / 100) * size);

  const proteinTotal = daily_goal && daily_goal.proteins.total;
  const proteinCurrent = Math.round(
    proteinToday + (proteinPerHundred / 100) * size,
  );

  const caloriesTotal = daily_goal && daily_goal.calories.total;
  const caloriesCurrent = Math.round(
    caloriesToday + (caloriesPerHundred / 100) * size,
  );
  return (
    <View>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.8}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={300}
        animationOutTiming={400}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={400}
        onSwipeComplete={() => setVisibility(false)}
        onBackdropPress={() => setVisibility(false)}
        onBackButtonPress={() => setVisibility(false)}
        swipeDirection={['down']}
        useNativeDriver={true}
        style={{margin: 16}}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 22,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 22,
              width: '100%',
            }}>
            <View style={{width: '60%'}}>
              <Text numberOfLines={1}>{product.name}</Text>
            </View>
            <View>
              <Text>
                {caloriesCurrent < caloriesTotal ? (
                  <TextGoodValue>{caloriesCurrent}</TextGoodValue>
                ) : (
                  <TextBadValue>{caloriesCurrent}</TextBadValue>
                )}{' '}
                /<TextValue>{caloriesTotal}</TextValue>
                kcal
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 22,
              width: '100%',
            }}>
            <View>
              <Text>
                {carbsCurrent < carbsTotal ? (
                  <TextGoodValue>{carbsCurrent}</TextGoodValue>
                ) : (
                  <TextBadValue>{carbsCurrent}</TextBadValue>
                )}
                /<TextValue>{carbsTotal}</TextValue> carbs
              </Text>
            </View>
            <View>
              <Text>
                {fatsCurrent < fatsTotal ? (
                  <TextGoodValue>{fatsCurrent}</TextGoodValue>
                ) : (
                  <TextBadValue>{fatsCurrent}</TextBadValue>
                )}
                /<TextValue>{fatsTotal}</TextValue> fats
              </Text>
            </View>
            <View>
              <Text>
                {proteinCurrent < proteinTotal ? (
                  <TextGoodValue>{proteinCurrent}</TextGoodValue>
                ) : (
                  <TextBadValue>{proteinCurrent}</TextBadValue>
                )}
                /<TextValue>{proteinTotal}</TextValue> protein
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 22,
            }}>
            <Text>
              <Text category="h4">{size}</Text>/<Text>{maxSize}</Text> gr
            </Text>
          </View>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={maxSize}
            value={size}
            step={5}
            onValueChange={setSize}
            onSlidingComplete={() => {
              setVisibility(false);
              props.sendEat(product, props.purchase_id, size);
            }}
            thumbTintColor="#FF7759"
            minimumTrackTintColor="#FF7759"
            maximumTrackTintColor="rgba(0,0,0,0.08)"
          />
        </View>
      </Modal>
      {product && (
        <Swipeable
          leftThreshold={80}
          rightThreshold={80}
          friction={2}
          renderLeftActions={() => (
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: '#FC5F3C',
                padding: 8,
                flex: 1,
              }}>
              <Text style={{color: "white"}}>Waste</Text>
            </View>
          )}
          renderRightActions={() => (
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                backgroundColor: '#77CCA4',
                padding: 8,
                flex: 1,
              }}>
              <Text style={{color: "white"}}>Eat up</Text>
            </View>
          )}
          onSwipeableLeftOpen={() =>
            props.sendWaste(product, props.purchase_id, maxSize)
          }
          onSwipeableRightOpen={() =>
            props.sendEat(product, props.purchase_id, maxSize)
          }>
          <ListItem
            onLongPress={() => setVisibility(true)}
            title={`${product.name}`}
            icon={() => <ItemImage url={product.picture_url} />}
            accessory={() => (
              <ItemAccessory
                shelf_time={product.shelf_time}
                exp_time={props.exp_time > 0 ? props.exp_time : 0}
              />
            )}
            description={`${Math.round(maxSize)} left`}
          />
        </Swipeable>
      )}
    </View>
  );
}
