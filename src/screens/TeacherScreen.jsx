import {
  NativeAppEventEmitter,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Button, Card} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyText from '../components/MyText';
import {useNavigation} from '@react-navigation/native';
import Logout from '../components/Logout';
import BleManager from 'react-native-ble-manager';
import {NativeModules, NativeEventEmitter} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const TeacherScreen = () => {
  const {navigate} = useNavigation();

  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleDevicesList = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        BleManager.getDiscoveredPeripherals(null).then(peripheralsArray => {
          console.log('Discovered peripherals: ' + peripheralsArray);
        });
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsRunning(false);
    }
  };

  const checkBluetoothEnabled = () => {
    BleManager.enableBluetooth()
      .then(() => {
        console.log('User granted Bluetooth access');

        startScan();
      })
      .catch(error => {
        console.log('User denied Bluetooth access', error);
      });
  };

  const startScan = () => {
    // Start scanning for devices
    BleManager.scan([], 3, true).then(ee => {
      console.log('Scanning...');
    });
    setIsScanning(true);
    handleDevicesList();
  };

  const stopScan = () => {
    // Stop scanning for devices
    BleManager.stopScan().then(() => {
      console.log('Scan stopped');
    });
    setIsScanning(false);
    handleDevicesList();
  };

  const requestBluetoothPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: 'Bluetooth Permission',
          message: 'Bluetooth access needed.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the bluetooth');
        BleManager.start({showAlert: false});
      } else {
        console.log('bluetooth permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    // NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', data => {
    //   let device = 'device found: ' + data.name + '(' + data.id + ')';
    //   if (this.devices.indexOf(device) == -1) {
    //     this.devices.push(device);
    //   }
    //   let newState = this.state;
    //   newState.dataSource = newState.dataSource.cloneWithRows(this.devices);
    //   this.setState(newState);
    // });
    // BleManager.start({showAlert: false}).then(() => {
    //   // Success code
    //   console.log('Module initialized');
    //   BleManager.scan([], 120);
    // });
  }, []);

  return (
    <View style={styles.container}>
      <Logout />
      <Card onPress={() => navigate('AttendanceDatesList', {user: 'teacher'})}>
        <Card.Content style={styles.card}>
          <MyText>View Past Attendance</MyText>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </Card.Content>
      </Card>
      <Button
        mode={isScanning ? 'outlined' : 'contained'}
        onPress={() => {
          if (isScanning) {
            stopScan();
          } else {
            checkBluetoothEnabled();
          }
        }}
        style={[
          styles.button,
          isScanning ? {borderColor: '#3399ff', backgroundColor: 'white'} : {},
        ]}>
        {isScanning ? 'Stop Attendance' : 'Start Attendace'}
      </Button>
      {isScanning && (
        <View style={{flexDirection: 'row'}}>
          <MyText style={{fontSize: 18, marginRight: 10}}>
            Listing All Available Devices
          </MyText>
          <ActivityIndicator color="#3399ff" size="small" />
        </View>
      )}
    </View>
  );
};

export default TeacherScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: '5%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  button: {
    marginVertical: 30,
    borderRadius: 5,
  },
});
