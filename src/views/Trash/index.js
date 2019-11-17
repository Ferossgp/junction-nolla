import React, {useState} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import useFetch from 'react-fetch-hook';
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
    title={`${item.name}`}
    icon={() => <ItemImage url={item.picture_url} />}
    accessory={() => <Text category="h4">-{item.price}€</Text>}
  />
);

function Main(props) {
  const [granularity, setGranularity] = useState(0);
  const {isLoading: isLoadingDay, data: day} = useFetch(
    'http://40.118.124.20:5000/user/1/waste/day',
  );
  const {isLoading: isLoadingWeek, data: week} = useFetch(
    'http://40.118.124.20:5000/user/1/waste/week',
  );
  const {isLoading: isLoadingMonth, data: month} = useFetch(
    'http://40.118.124.20:5000/user/1/waste/month',
  );
  const {isLoading: isLoadingYear, data: year} = useFetch(
    'http://40.118.124.20:5000/user/1/waste/year',
  );
  const sums = [
    day && day.sum,
    week && week.sum,
    month && month.sum,
    year && year.sum,
  ];
  const ratios = [
    day && day.ratio,
    week && week.ratio,
    month && month.ratio,
    year && year.ratio,
  ];

  const sum = sums[granularity];
  const ratio = ratios[granularity];
  return (
    <Layout style={[styles.container]}>
      <Header onBackPress={() => props.navigation.goBack()}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            height: '100%',
            flex: 1,
          }}>
          {sum && (
            <Text category="h1" style={{color: 'white', fontWeight: 'bold'}}>
              {Math.round(sum * 100) / 100}€
            </Text>
          )}
          {ratio && (
            <Text style={{color: 'white', fontSize: 9}}>
              You lost{' '}
              <Text style={{fontSize: 10, color: 'white', fontWeight: 'bold'}}>
                {Math.round(ratio * 100) / 100}%
              </Text>{' '}
              of bought products.
            </Text>
          )}
        </View>
      </Header>
      <View style={styles.content}>
        <TabView
          style={styles.tabView}
          onSelect={setGranularity}
          selectedIndex={granularity}
          tabBarStyle={styles.tabBar}
          indicatorStyle={styles.indicatorStyle}>
          <Tab
            style={[styles.tabStyle, granularity == 0 && styles.tabStyleActive]}
            titleStyle={styles.tabTitleStyle}
            title="day">
            <View style={{flex: 1}}>
              <Card>
                {isLoadingDay && (
                  <ActivityIndicator color="#F63501" size="large" />
                )}
                {day && day.result && (
                  <List data={day.result} renderItem={renderItem} />
                )}
              </Card>
            </View>
          </Tab>
          <Tab
            style={[styles.tabStyle, granularity == 1 && styles.tabStyleActive]}
            titleStyle={styles.tabTitleStyle}
            title="week">
            <View style={{flex: 1}}>
              <Card>
                {isLoadingWeek && (
                  <ActivityIndicator color="#F63501" size="large" />
                )}
                {week && week.result && (
                  <List data={week.result} renderItem={renderItem} />
                )}
              </Card>
            </View>
          </Tab>
          <Tab
            style={[styles.tabStyle, granularity == 2 && styles.tabStyleActive]}
            titleStyle={styles.tabTitleStyle}
            title="month">
            <View style={{flex: 1}}>
              <Card>
                {isLoadingMonth && (
                  <ActivityIndicator color="#F63501" size="large" />
                )}
                {month && month.result && (
                  <List data={month.result} renderItem={renderItem} />
                )}
              </Card>
            </View>
          </Tab>
          <Tab
            style={[styles.tabStyle, granularity == 3 && styles.tabStyleActive]}
            titleStyle={styles.tabTitleStyle}
            title="year">
            <View style={{flex: 1}}>
              <Card>
                {isLoadingYear && (
                  <ActivityIndicator color="#F63501" size="large" />
                )}
                {year && year.result && (
                  <List data={year.result} renderItem={renderItem} />
                )}
              </Card>
            </View>
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
  tabContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  tabView: {flex: 1},
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
    paddingHorizontal: 2,
    marginVertical: 12,
    marginHorizontal: '10%',
  },
});

export default Main;
