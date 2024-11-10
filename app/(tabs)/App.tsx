import { Image, Platform, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Carrosel from '@/components/Carrosel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const carroselItens = [
  {
    imagemUrl: 'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhZmV8ZW58MHx8MHx8fDA%3D',
    descricao: 'Bem-vindos à nossa cafeteria!',
  },
  {
    imagemUrl: 'https://plus.unsplash.com/premium_photo-1666174853184-7300db42e0f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    descricao: 'Venha tomar um café e comer alguma coisa',
  },
  {
    imagemUrl: 'https://images.unsplash.com/photo-1690126671026-623dc4f8370a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    descricao: 'Sinta o sabor do nosso café expresso.',
  },
];

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
