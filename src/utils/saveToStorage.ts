import RNAsyncStorageFlipper from 'rn-async-storage-flipper';
import AsyncStorage from '@react-native-async-storage/async-storage';

RNAsyncStorageFlipper(AsyncStorage);

const saveToStorage = async (key, data) => {
  try {
    if (typeof data != 'string') {
      data = JSON.stringify(data);
    }
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.log(e);
  }
};

export default saveToStorage;
