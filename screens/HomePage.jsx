import { StyleSheet, Text, View, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import transactionData from '../components/TransData';
import { useEffect, useState } from 'react';
import { transaction } from '../api/restAPI';
import { ActivityIndicator } from 'react-native-web';
import Ionicons from "@expo/vector-icons/Ionicons";
import { logout } from '../api/restAPI';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const { logout, setLogoutState } = useAuth();

    const handleLogout = async () => {
            try {
                const {token} = await logout();
                alert('Success', 'Logout successful');
                navigation.navigate("Login");
            } catch (error) {
                console.log('Logout Error:', error.message);
                alert('Error', error.message);
            }
        };

  const renderTransactionItem = ({ item }) => {
    const amountColor = item.amount.startsWith('-') ? 'red' : 'teal';
    return (
      <View style={styles.HistoryTransBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: 'https://i.pinimg.com/originals/b5/df/6e/b5df6e88db58a19e85ebec90898425cf.jpg' }}
            style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
          />
          <View>
            <Text style={styles.teks14}>{item.from_to}</Text>
            <Text style={styles.teks12}>{item.type==='c'?'Transfer':'TopUp'}</Text>
            <Text style={styles.subText}>{item.created_at}</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.teks14, { color: amountColor }]}>{item.amount}</Text>
        </View>
      </View>
    );
  };


    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await transaction()
                setPost(data)
            } catch (error) {
                setError(error.message);
            } finally {
              setLoading(false);
            }
        }
        getPosts();
    }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      {/* Navbar Absolute */}
      <View style={styles.navBar}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/b5/df/6e/b5df6e88db58a19e85ebec90898425cf.jpg',
          }}
          style={{ width: 46, height: 46, borderRadius: 50 }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: 'black', fontWeight: '700' }}>Andika</Text>
          <Text>Personal Account</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Ionicons name='sunny-outline' size={30} color='orange'/>
        <TouchableOpacity onPress={() => handleLogout()}>
            <Ionicons name='log-out-outline' size={30} style={{marginLeft:10}}/>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', elevation: 2, alignItems: 'center', width: '90%', paddingVertical: 35, marginTop: 80 }}>
            <View style={{ width: 250 }}>
              <Text style={{ fontWeight: '700', fontSize: 20, marginBottom: 10 }}>Good Morning, Chelsea</Text>
              <Text style={{ fontWeight: '400', fontSize: 16 }}>
                Check all your incoming and outgoing transactions here
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View>
              <Image source={require('../assets/Group.png')} style={{ width: 80, height: 80 }} />
            </View>
          </View>

          {/* Account Info */}
          <View style={styles.accountBox}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Account No.</Text>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>100899</Text>
          </View>

          {/* Balance Info */}
          <View style={styles.balanceBox}>
            <View>
              <Text style={styles.teks14}>Balance</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: '600', fontSize: 24, width: 160 }}>Rp 10.000.000</Text>
                <Ionicons name='eye-outline' size={20}/>
              </View>
            </View>
            <View style={{ justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => navigation.navigate('TopUp')} style={[styles.addSendButton, { marginBottom: 15 }]}>
                <Ionicons name='add-outline' size={20} color='white'/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Transfer')} style={styles.addSendButton}>
                <Ionicons name='paper-plane-outline' size={20} color='white'/>
              </TouchableOpacity>
            </View>
          </View>

          {/* Transaction History */}
        <View style={styles.transactionBox}>
            <Text style={{ fontWeight: '700', fontSize: 16, textAlign: 'left' }}>Transaction History</Text>
            <View style={[styles.line, { marginVertical: 10 }]} />
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={renderTransactionItem}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 80,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 10,
  },
  scrollView: {
    backgroundColor: '#fafbfd',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  accountBox: {
    backgroundColor: 'teal',
    height: 37,
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  balanceBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 20,
    borderRadius: 20,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionBox: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  HistoryTransBox: {
    flexDirection: 'row',
    elevation: 3,
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  teks14: {
    fontWeight: '400',
    fontSize: 14,
  },
  teks12: {
    fontWeight: '400',
    fontSize: 12,
  },
  subText: {
    fontWeight: '400',
    fontSize: 10,
    color: '#939393',
  },
  addSendIcon: {
    width: 20,
    height: 20,
  },
  addSendButton: {
    alignItems: 'center',
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
  },
});
