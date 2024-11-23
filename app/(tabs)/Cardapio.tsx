import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { Produto } from '@/components/interface/Produto';


const Cardapio: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    valor: '',
    imagemUrl: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduto = () => {
    if (!formData.titulo || !formData.descricao || !formData.valor) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const novoProduto: Produto = {
      id: produtos.length + 1,
      ...formData,
    };

    setProdutos([...produtos, novoProduto]);
    setFormData({ titulo: '', descricao: '', valor: '', imagemUrl: '' });
    setModalVisible(false);
  };

  const renderProduto = ({ item }: { item: Produto }) => (
    <View style={styles.produtoCard}>
      <View style={styles.cardContent}>
        {item.imagemUrl ? (
          <Image 
            source={{ uri: item.imagemUrl }} 
            style={styles.produtoImagem}
            resizeMode="cover" 
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
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduto}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
        style={{ pointerEvents: 'auto' }} 
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Produto</Text>

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
              <Button title="Cancelar" onPress={() => setModalVisible(false)} 
               color="#FF4D4D" />
              <Button title="Adicionar" onPress={handleAddProduto} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cardapio;

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
});
