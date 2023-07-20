import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {ItemUser} from './components/ItemUser';

export interface User {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
  employment: Employment;
  address: Address;
  credit_card: CreditCard;
  subscription: Subscription;
}

export interface Employment {
  title: string;
  key_skill: string;
}

export interface Address {
  city: string;
  street_name: string;
  street_address: string;
  zip_code: string;
  state: string;
  country: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CreditCard {
  cc_number: string;
}

export interface Subscription {
  plan: string;
  status: string;
  payment_method: string;
  term: string;
}

function UsersScreen() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://random-data-api.com/api/users/random_user?size=10',
      );
      const json = await response.json();
      console.log('json', json);
      setData(json);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData().then(null);
  }, [fetchData]);

  const renderItem = useCallback(({item}: {item: User}) => {
    return <ItemUser user={item} />;
  }, []);

  const renderListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="blue" />;
    }

    if (isError) {
      return <Text>Đã xảy ra lỗi</Text>;
    }

    return <Text>Danh sách trống</Text>;
  }, [isError, isLoading]);

  const onFetchUser = useCallback(() => {
    fetchData().then(null);
  }, [fetchData]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonFetch}>
        {isLoading && data?.length !== 0 ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Button title="Fetch User" onPress={onFetchUser} />
        )}
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        numColumns={2}
        ListEmptyComponent={renderListEmptyComponent}
      />
    </View>
  );
}

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E1F5DB',
  },
  buttonFetch: {
    marginVertical: 20,
  },
});
