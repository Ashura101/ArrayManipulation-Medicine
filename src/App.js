import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonTextInput, CommonButton} from './components';
import COLORS from './constants/colors';

const App = () => {
  const [medList, setMedList] = useState([
    {name: '', freq: '', duration: '', isAdded: false},
  ]);
  const AddMed = (item, index) => {
    let temp = Object.assign([], medList, {[index]: {...item, isAdded: true}});
    temp.push({name: '', freq: '', duration: '', isAdded: false});
    setMedList(temp);
  };
  const RemoveMed = index => {
    medList.splice(index, 1);
    let temp = Object.assign([], medList);
    setMedList(temp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Add Medicine</Text>
      </View>
      <FlatList
        data={medList}
        renderItem={({item, index}) => {
          return (
            <View style={styles.enterMedsView}>
              <CommonTextInput
                label={'Name'}
                value={item.name}
                onChangeText={text =>
                  setMedList(
                    Object.assign([], medList, {
                      [index]: {...item, name: text},
                    }),
                  )
                }
              />
              <View style={styles.medDetailsView}>
                <CommonTextInput
                  label={'Frequency'}
                  value={item.freq}
                  keyboardType="numeric"
                  onChangeText={text =>
                    setMedList(
                      Object.assign([], medList, {
                        [index]: {...item, freq: text},
                      }),
                    )
                  }
                />
                <CommonTextInput
                  label={'Duration'}
                  value={item.duration}
                  keyboardType="numeric"
                  onChangeText={text =>
                    setMedList(
                      Object.assign([], medList, {
                        [index]: {...item, duration: text},
                      }),
                    )
                  }
                />
              </View>
              {item.isAdded ? (
                <CommonButton
                  title={'Remove'}
                  onPress={() => RemoveMed(index)}
                />
              ) : (
                <CommonButton
                  title={'Add medicine'}
                  onPress={() => AddMed(item, index)}
                />
              )}
            </View>
          );
        }}
        // keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY,
  },
  title: {
    height: 55,
    backgroundColor: COLORS.YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  enterMedsView: {
    margin: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
  },
  medDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
