import React from 'react';
import { View, FlatList } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { mockSanduqs } from '../mockData';

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderSanduqItem = ({ item }) => (
    <Card style={{ margin: 10 }} onPress={() => navigation.navigate('SanduqDetails', { sanduqId: item.id })}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>Balance: ${item.balance}</Paragraph>
        <Paragraph>Members: {item.members.length}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={mockSanduqs}
        renderItem={renderSanduqItem}
        keyExtractor={(item) => item.id}
      />
      <Button mode="contained" onPress={() => navigation.navigate('CreateSanduq')} style={{ margin: 10 }}>
        Create New Sanduq
      </Button>
    </View>
  );
};

export default HomeScreen;