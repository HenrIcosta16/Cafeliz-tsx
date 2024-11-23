import { Image, Platform, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Carrosel from '@/components/Carrosel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { carroselItens } from '@/components/interface/carroselItens';

export default function AppScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header />
        <Carrosel itens={carroselItens} />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
