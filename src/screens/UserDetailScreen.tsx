import {ScrollView, StyleSheet, View} from 'react-native';
import * as React from 'react';
import {useRoute} from '@react-navigation/native';
import {User} from './UsersScreen';
import {InfoLine} from './components/InfoLine';
import {useMemo} from 'react';

function DetailsScreen() {
  const {params} = useRoute<any>();

  const user = params?.user as User;

  const renderInfo = useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      <View>
        {Object.keys(user).map((key: string, index) => {
          // @ts-ignore
          const valueOfKey = user[key];
          if (
            typeof valueOfKey === 'string' ||
            typeof valueOfKey === 'number'
          ) {
            return (
              <InfoLine
                key={index}
                label={key}
                value={valueOfKey?.toString()}
              />
            );
          } else {
            return (
              <View key={index}>
                {Object.keys(valueOfKey).map((k, i) => {
                  if (
                    typeof valueOfKey[k] === 'string' ||
                    typeof valueOfKey[k] === 'number'
                  ) {
                    return <InfoLine key={i} label={k} value={valueOfKey[k]} />;
                  }
                  return null;
                })}
              </View>
            );
          }
        })}
      </View>
    );
  }, [user]);

  return <ScrollView style={styles.scrollView}>{renderInfo}</ScrollView>;
}

export default DetailsScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
  },
});
