import React from 'react';
import { Platform, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.brand}>Cafeliz.</Text>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navLink}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink}>
          <Text>Cardápio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    backgroundColor: '#007bff',
    padding: 10,
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    zIndex: 1000, 
    width: '100%', 
  },
  brand: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20, 
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center', 
    marginTop: 10,
    width: '100%',
  },
  navLink: {
    padding: 5,
  },

  navText: {
    color: '#fff',
    fontSize: 165,
    fontWeight: 'bold',
  },

  
        
});

export default Header; 
