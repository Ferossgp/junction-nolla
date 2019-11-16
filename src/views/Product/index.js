import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Layout, Tab, TabView} from 'react-native-ui-kitten';
import Card from '../../components/card';
import Header from '../../components/header';

function Main(props) {
  return (
    <Layout style={[styles.container]}>
      <Header />
      <View style={styles.content}>
        <TabView
          style={styles.tabView}
          tabBarStyle={styles.tabBar}
          indicatorStyle={styles.tabViewIndicator}>
          <Tab titleStyle={styles.tabTitleStyle} title="DASHBOARD">
            <Text>DASHBOARD</Text>
          </Tab>
          <Tab title="SETTINGS">
            <Text>SETTINGS</Text>
          </Tab>
          <Tab title="SETTINGS">
            <Text>SETTINGS</Text>
          </Tab>
        </TabView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8FB',
  },
  content: {
    padding: 12,
  },
  tabView: {
  },
  tabTitleStyle: {},
  tabBar: {backgroundColor: 'transparent'},
  tabViewIndicator: {backgroundColor: 'transparent'},
});

export default Main;
