import {
  Image,
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
import {BleManager as BleManagerPlx} from 'react-native-ble-plx';

const TeacherScreen = () => {
  const {navigate} = useNavigation();
  // const _BleManager = new BleManagerPlx();

  let localDevices = [
    {
      id: '1',
      name: 'Minato Namikaze',
      bluetoothId: 'DA:4C:10:DE:17:00',
    },
    {
      id: '2',
      name: 'Jiraya',
      bluetoothId: 'NE:8A:30:DE:05:55',
    },
    {
      id: '3',
      name: 'Shikamaru Nara',
      bluetoothId: 'RT:2L:45:BM:17:20',
    },
  ];

  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [obj, setObj] = useState({});
  const [devicesAvailable, setDevicesAvailable] = useState([]);

  const handleDevicesList = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        BleManager.getDiscoveredPeripherals().then(peripheralsArray => {
          console.log('Discovered peripherals: ' + peripheralsArray);
        });
        // _BleManager.getDiscoveredPeripherals([]).then(peripheralsArray => {
        //   console.log('Discovered peripherals: ' + peripheralsArray);
        // });
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
    setDevicesAvailable([]);
    startScan();
    // BleManager.enableBluetooth()
    //   .then(() => {
    //     console.log('User granted Bluetooth access');
    //   })
    //   .catch(error => {
    //     console.log('User denied Bluetooth access', error);
    //   });
  };

  const startScan = () => {
    // BleManager.scan([], 3, true).then(ee => {
    //   console.log('Scanning...');
    // });
    setIsScanning(true);
    setTimeout(() => {
      setDevicesAvailable(prev => {
        return [...prev, localDevices[0]];
      });
    }, 1000);
    setTimeout(() => {
      setDevicesAvailable(prev => {
        return [...prev, localDevices[1]];
      });
    }, 3000);
    setTimeout(() => {
      setDevicesAvailable(prev => {
        return [...prev, localDevices[2]];
      });
    }, 5000);
    handleDevicesList();
  };

  // const startScan = () => {
  //   console.log('device:------ ');
  //   _BleManager.startDeviceScan(null, null, (error, device) => {
  //     console.log('device: ', device);
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //     handleDevicesList();
  //   });
  // };

  const stopScan = () => {
    BleManager.stopScan().then(() => {
      console.log('Scan stopped');
    });
    setIsScanning(false);
    // setDevicesAvailable([]);
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
        checkBluetoothEnabled();
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
      <Logout cb={() => setDevicesAvailable([])} />
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
            requestBluetoothPermission();
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
      {devicesAvailable.map(item => {
        return (
          <Card
            key={item.id}
            style={{marginVertical: 8, backgroundColor: 'white'}}>
            <Card.Content>
              <MyText style={{fontWeight: 'bold'}}>{item?.name}</MyText>
              <MyText style={{color: '#ababab', fontSize: 14}}>
                {item?.bluetoothId}
              </MyText>
            </Card.Content>
          </Card>
        );
      })}
      {devicesAvailable?.length === 0 && (
        <Card
          style={{
            backgroundColor: 'white',
            width: '90%',
            alignSelf: 'center',
            marginTop: 50,
          }}>
          <Card.Content>
            <Image
              source={require('../images/nodata.png')}
              resizeMode="contain"
              style={{width: 300, height: 300}}
            />
          </Card.Content>
        </Card>
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
