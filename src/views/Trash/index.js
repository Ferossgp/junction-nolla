import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Text,
  Layout,
  Tab,
  TabView,
  List,
  ListItem,
} from 'react-native-ui-kitten';
import Card from '../../components/card';
import Header from '../../components/header';

const SAMPLE_DATA = {
  image: 'https://via.placeholder.com/150',
  title: 'Bananas',
  count: '1',
};

const ItemImage = ({url}) => (
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
        uri: url,
      }}
    />
  </View>
);

const renderItem = ({item}) => (
  <ListItem
    title={`${item.title}`}
    icon={() => <ItemImage url={item.image} />}
    description={`${item.count} left`}
  />
);

function Main(props) {
  const data = new Array(8).fill(SAMPLE_DATA);

  return (
    <Layout style={[styles.container]}>
      <Header onBackPress={() => props.navigation.goBack()} />
      <TabView
        style={styles.tabView}
        tabBarStyle={styles.tabBar}
        indicatorStyle={styles.indicatorStyle}>
        <Tab
          style={[styles.tabStyle, styles.tabStyleActive]}
          titleStyle={styles.tabTitleStyle}
          title="Stayed">
          <View style={styles.tabContainer}>
            <List data={data} renderItem={renderItem} />
          </View>
        </Tab>
        <Tab
          style={styles.tabStyle}
          titleStyle={styles.tabTitleStyle}
          title="Eaten">
          <View style={styles.tabContainer}>
            <List data={data} renderItem={renderItem} />
          </View>
        </Tab>
        <Tab
          style={styles.tabStyle}
          titleStyle={styles.tabTitleStyle}
          title="All">
          <View style={styles.tabContainer}>
            <List data={data} renderItem={renderItem} />
          </View>
        </Tab>
      </TabView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8FB',
  },
  tabContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  tabView: {},
  tabStyle: {
    backgroundColor: 'transparent',
    paddingVertical: 4,
    borderRadius: 12,
  },
  tabStyleActive: {
    backgroundColor: 'white',
  },
  tabTitleStyle: {},
  indicatorStyle: {backgroundColor: 'transparent'},
  tabBar: {
    backgroundColor: '#ECEEF5',
    borderRadius: 14,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginVertical: 12,
    marginHorizontal: '10%',
  },
});

export default Main;
