import React, { useState } from 'react';
import {View,Text,TextInput,Button,Modal,StyleSheet,FlatList,TouchableOpacity,Alert,} from 'react-native';
import { Pedidos } from '@/components/interface/Pedidos';

const Vendas: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedidos[]>([]);
  const [formData, setFormData] = useState({
    pedido: '',
    quantidade: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPedido = () => {
    if (!formData.pedido || !formData.quantidade) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    const novoPedido: Pedidos = {
      id: pedidos.length + 1,
      pedido: formData.pedido,
      quantidade: parseInt(formData.quantidade, 10),
    };

    setPedidos([...pedidos, novoPedido]);
    setFormData({ pedido: '', quantidade: '' });
    setModalVisible(false);
  };

  const renderPedido = ({ item }: { item: Pedidos }) => (
    <View style={styles.pedidoCard}>
      <Text style={styles.pedidoTitulo}>{item.pedido}</Text>
      <Text>Quantidade: {item.quantidade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pedidos</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Pedido</Text>

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
              <Button
                title="Cancelar"
                onPress={() => setModalVisible(false)}
                color="#FF4D4D"
              />
              <Button title="Adicionar" onPress={handleAddPedido} />
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
});
