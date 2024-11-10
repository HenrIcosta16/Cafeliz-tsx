import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.socialContainer}>
        <Text style={styles.connectText}>Conecte as nossas redes sociais:</Text>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="twitter" size={24} color="#6c757d" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="instagram" size={24} color="#6c757d" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Icon name="coffee" size={24} color="#6c757d" /> Cafeliz.
          </Text>
          <Text style={styles.sectionText}>
            É uma cafeteria de origem paraibana nascida na cidade de Guarabira.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.contactText}>
            <Icon name="home" size={18} color="#6c757d" /> Brasil, PB Guarabira, BR 
          </Text>
          <Text style={styles.contactText}>
            <Icon name="envelope" size={18} color="#6c757d" /> cafelisgba22@gmail.com
          </Text>
          <Text style={styles.contactText}>
            <Icon name="phone" size={18} color="#6c757d" /> + 55 83 9314-3978
          </Text>
        </View>
      </View>

      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>© 2024 Salento.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  connectText: {
    color: '#6c757d',
    fontSize: 16,
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#6c757d',
  },
  contactText: {
    fontSize: 14,
    color: '#6c757d',
    marginVertical: 4,
  },
  copyright: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  copyrightText: {
    color: '#6c757d',
    fontSize: 14,
  },

  
});

export default Footer;
