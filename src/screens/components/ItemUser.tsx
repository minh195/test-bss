import {FC, memo, useCallback} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import {User} from '../UsersScreen';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../../ultils/enums';

interface ItemUserProps {
  user: User;
}

export const ItemUser: FC<ItemUserProps> = memo(({user}) => {
  const navigation = useNavigation<any>();

  const onNavigateToDetail = useCallback(() => {
    navigation.navigate(SCREEN.USER_DETAIL_SCREEN, {
      user,
    });
  }, [navigation, user]);

  return (
    <TouchableOpacity style={styles.container} onPress={onNavigateToDetail}>
      <Image source={{uri: user?.avatar}} style={styles.avatar} />
      {user?.first_name ? (
        <Text style={styles.textName}>
          {user?.first_name}
          <Text> {user?.last_name || ''}</Text>
        </Text>
      ) : (
        <Text>No name</Text>
      )}
      <Text>{user?.employment?.title || 'No job'}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 20,
    padding: 20,
    width: (Dimensions.get('window').width - 60) / 2,
    marginRight: 10,
  },
  avatar: {
    width: (Dimensions.get('window').width - 80) / 2,
    height: 120,
    resizeMode: 'contain',
  },
  textName: {
    fontWeight: 'bold',
    color: 'black',
  },
});
