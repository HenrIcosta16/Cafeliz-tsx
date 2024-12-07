import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Produto } from '@/components/interface/Produto';

const Cardapio: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [formData, setFormData] = useState<Produto>({
    id: 0,
    titulo: '',
    descricao: '',
    valor: '',
    imagemUrl: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [location, setLocation] = useState<string>('');

  
  const loadProdutos = async () => {
    try {
      const storedProdutos = await AsyncStorage.getItem('@produtos');
      if (storedProdutos) {
        setProdutos(JSON.parse(storedProdutos));
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos armazenados.');
    }
  };

  
  const saveProdutos = async (produtos: Produto[]) => {
    try {
      await AsyncStorage.setItem('@produtos', JSON.stringify(produtos));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os produtos.');
    }
  };

  
  useEffect(() => {
    loadProdutos();
  }, []);

  
  useEffect(() => {
    saveProdutos(produtos);
  }, [produtos]);

  
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

  const handleAddProduto = () => {
    if (!formData.titulo || !formData.descricao || !formData.valor) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (editMode) {
      setProdutos(
        produtos.map((produto) =>
          produto.id === formData.id ? { ...formData } : produto
        )
      );
    } else {
      setProdutos([
        ...produtos,
        { ...formData, id: produtos.length + 1 },
      ]);
    }

    resetForm();
  };

  const handleDeleteProduto = () => {
    setProdutos(produtos.filter((produto) => produto.id !== formData.id));
    resetForm();
  };

  const resetForm = () => {
    setFormData({ id: 0, titulo: '', descricao: '', valor: '', imagemUrl: '' });
    setModalVisible(false);
    setEditMode(false);
  };

  const openModal = (produto?: Produto) => {
    if (produto) {
      setFormData(produto);
      setEditMode(true);
    } else {
      setFormData({ id: 0, titulo: '', descricao: '', valor: '', imagemUrl: '' });
      setEditMode(false);
    }
    setModalVisible(true);
  };

  const renderProduto = ({ item }: { item: Produto }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.produtoCard}>
        <View style={styles.cardContent}>
          {item.imagemUrl ? (
            <Image
              source={{ uri: item.imagemUrl }}
              style={styles.produtoImagem}
            />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <View style={styles.cardDetails}>
            <Text style={styles.produtoTitulo}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text>R$ {item.valor}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>
      <Text style={styles.locationText}>Localização: {location || 'Obtendo localização...'}</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => openModal()}
      >
        <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduto}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
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
              {editMode ? 'Editar Produto' : 'Adicionar Produto'}
            </Text>

            <TextInput
              placeholder="Título"
              value={formData.titulo}
              onChangeText={(value) => handleInputChange('titulo', value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={formData.descricao}
              onChangeText={(value) => handleInputChange('descricao', value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Valor"
              value={formData.valor}
              onChangeText={(value) => handleInputChange('valor', value)}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="URL da Imagem (opcional)"
              value={formData.imagemUrl}
              onChangeText={(value) => handleInputChange('imagemUrl', value)}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button title="Salvar" onPress={handleAddProduto} color="#099000" />
              <Button title="Cancelar" onPress={resetForm} color="#F9900D" />
              {editMode && (
                <Button
                  title="Deletar"
                  onPress={handleDeleteProduto}
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

export default Cardapio

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
  produtoCard: {
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  produtoImagem: {
    width: 150,
    height: 150,
    marginRight: 15,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    marginRight: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  cardDetails: {
    flex: 1,
  },
  produtoTitulo: {
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

/** comentario para eu lembrar que devo separar a lista do cardapio **/