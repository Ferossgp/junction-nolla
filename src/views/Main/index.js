import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import useFetch from 'react-fetch-hook';
import Toast from 'react-native-root-toast';
import * as Progress from 'react-native-progress';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Text, Layout, Tab, TabView, Button, Icon} from 'react-native-ui-kitten';
import AddProduct from '../AddProduct';
import Card from '../../components/card';
import Header from '../../components/header';
import {RenderItem} from './components';

import createTrigger from '../../core/trigger';
import useTrigger from 'react-use-trigger/useTrigger';

const requestTrigger = createTrigger();

const sendEat = action => (product, purchase_id, size) => {
  const current_datetime = new Date();

  const data = {
    purchase_id: purchase_id,
    product_id: product.id,
    action_type: action,
    amount: size,
    customer_id: 1,
    action_date:
      current_datetime.getFullYear() +
      '-' +
      (current_datetime.getMonth() + 1) +
      '-' +
      current_datetime.getDate() +
      ' ' +
      current_datetime.getHours() +
      ':' +
      current_datetime.getMinutes() +
      ':' +
      current_datetime.getSeconds() +
      '.0',
  };
  return fetch('http://40.118.124.20:5000/action/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      if (data.has_message) {
        Toast.show(data.message + '\n' + data.karma, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          opacity: 1,
          backgroundColor: 'white',
          textColor: '#FF9933',
        });
      }
      requestTrigger();
    })
    .catch(error => {
      console.error(error);
    });
};

function Main(props) {
  const requestTriggerValue = useTrigger(requestTrigger);

  const {isLoading, data} = useFetch('http://40.118.124.20:5000/inbox/1', {
    depends: [requestTriggerValue],
  });
  const current = data && data.daily_goal && data.daily_goal.calories.progress;
  const total = data && data.daily_goal && data.daily_goal.calories.total;
  const progress = total > 0 && current > 0 ? 100 / (total / current) / 100 : 0;
  return (
    <Layout style={[styles.container]}>
      <Header>
        <Progress.Circle
          size={90}
          borderWidth={0}
          showsText={true}
          progress={progress}
          formatText={() => `${Math.round(current || 0)}\nkcal`}
          textStyle={styles.textStyle}
          style={styles.progress}
          color="rgba(255,255,255,1)"
          unfilledColor="#ffa08b"
        />
      </Header>
      <View style={styles.content}>
        <TabView
          style={styles.tabView}
          tabBarStyle={styles.tabBar}
          indicatorStyle={styles.tabViewIndicator}>
          <Tab titleStyle={styles.tabTitleStyle} title="Products">
            <>
              <View style={{flex: 1}}>
                <Card>
                  {isLoading && (
                    <ActivityIndicator color="#F63501" size="large" />
                  )}
                  {data &&
                    data.products &&
                    data.products
                      .slice(0, 4)
                      .map(props => (
                        <RenderItem
                          key={props.purchase_id}
                          {...props}
                          sendEat={sendEat('ACTION_EAT')}
                          sendWaste={sendEat('ACTION_WASTE')}
                          daily_goal={data.daily_goal}
                        />
                      ))}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 8,
                    }}>
                    <Button
                      style={{
                        backgroundColor: 'rgba(255, 153, 51, 0.1)',
                        borderColor: 'rgba(255, 153, 51, 0.1)',
                        borderRadius: 50,
                        paddingHorizontal: 24,
                        border: 0,
                        flexDirection: 'row-reverse',
                      }}
                      textStyle={{color: '#F63501'}}
                      size="small"
                      onPress={() =>
                        props.navigation.navigate({routeName: 'Products'})
                      }>
                      More >
                    </Button>
                  </View>
                </Card>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginVertical: 16,
                }}>
                <Button
                  size="giant"
                  appearance="ghost"
                  icon={style => <Icon fill="#77CCA4" name="sun" />}
                />
                <View>
                  <AddProduct />
                </View>
                <Button
                  onPress={() =>
                    props.navigation.navigate({routeName: 'Trash'})
                  }
                  size="giant"
                  appearance="ghost"
                  icon={style => <Icon fill="#77CCA4" name="trash-2-outline" />}
                />
              </View>
            </>
          </Tab>
        </TabView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8FB',
    flex: 1,
  },
  content: {
    flex: 1,
    margin: 12,
  },
  progress: {
    elevation: 2,
  },
  textStyle: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabView: {flex: 1},
  tabTitleStyle: {},
  tabBar: {backgroundColor: 'transparent'},
  tabViewIndicator: {backgroundColor: 'transparent'},
});

export default gestureHandlerRootHOC(Main);
