import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as Location from 'expo-location';
import { Pedidos } from '@/components/interface/Pedidos';

const Vendas: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedidos[]>([]);
  const [formData, setFormData] = useState<Pedidos>({
    id: 0,
    cliente: '',
    pedido: '',
    quantidade: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [location, setLocation] = useState<string>('');

  const loadPedidos = async () => {
    try {
      const storedPedidos = await AsyncStorage.getItem('@pedidos');
      if (storedPedidos) {
        setPedidos(JSON.parse(storedPedidos));
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os pedidos armazenados.');
    }
  };


  const savePedidos = async (pedidos: Pedidos[]) => {
    try {
      await AsyncStorage.setItem('@pedidos', JSON.stringify(pedidos));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os pedidos.');
    }
  };

  
  useEffect(() => {
    loadPedidos();
  }, []);

  
  useEffect(() => {
    savePedidos(pedidos);
  }, [pedidos]);

  
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível acessar sua localização.');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation(`Lat: ${latitude}, Lng: ${longitude}`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    }
  };

  
  useEffect(() => {
    getLocation();
  }, []);
  

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPedido = () => {
    if (!formData.cliente || !formData.pedido || !formData.quantidade) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    if (editMode) {
      setPedidos(
        pedidos.map((pedido) =>
          pedido.id === formData.id ? { ...formData } : pedido
        )
      );
    } else {
      setPedidos([
        ...pedidos,
        { ...formData, id: pedidos.length + 1 },
      ]);
    }

    resetForm();
  };

  const handleDeletePedido = () => {
    setPedidos(pedidos.filter((pedido) => pedido.id !== formData.id));
    resetForm();
  };

  const resetForm = () => {
    setFormData({ id: 0, cliente: '', pedido: '', quantidade: '' });
    setModalVisible(false);
    setEditMode(false);
  };

  const openModal = (pedido?: Pedidos) => {
    if (pedido) {
      setFormData(pedido);
      setEditMode(true);
    } else {
      setFormData({ id: 0, cliente: '', pedido: '', quantidade: '' });
      setEditMode(false);
    }
    setModalVisible(true);
  };

  const renderPedido = ({ item }: { item: Pedidos }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.pedidoCard}>
        <Text style={styles.pedidoTitulo}>{item.pedido}</Text>
        <Text>Quantidade: {item.quantidade}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pedidos</Text>
      <Text style={styles.locationText}>Localização: {location || 'Obtendo localização...'}</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => openModal()}
      >
        <Text style={styles.addButtonText}>+ Adicionar Pedido</Text>
      </TouchableOpacity>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum pedido cadastrado.</Text>}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={resetForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editMode ? 'Editar Pedido' : 'Adicionar Pedido'}
            </Text>

            <TextInput
              placeholder="Cliente"
              value={formData.cliente}
              onChangeText={(value) => handleInputChange('cliente', value)}
              style={styles.input}
            />

            <TextInput
              placeholder="Pedido"
              value={formData.pedido}
              onChangeText={(value) => handleInputChange('pedido', value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Quantidade"
              value={formData.quantidade}
              onChangeText={(value) => handleInputChange('quantidade', value)}
              style={styles.input}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <Button title="Salvar" onPress={handleAddPedido} color="#099000" />
              <Button title="Cancelar" onPress={resetForm} color="#F9900D" />
              {editMode && (
                <Button
                  title="Deletar"
                  onPress={handleDeletePedido}
                  color="#FF4D4D"
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Vendas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  pedidoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  pedidoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  locationText: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 10, 
    textAlign: 'center', 
    backgroundColor: '#f9f9f9', 
    padding: 10, 
    borderRadius: 5, 
  },
  
});
