import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph, TextInput, List } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { mockSanduqs, addMember, contributeFunds, requestPayout } from '../mockData';

const SanduqDetailsScreen = () => {
  const route = useRoute();
  const { sanduqId } = route.params;
  const sanduq = mockSanduqs.find(s => s.id === sanduqId);

  const [newMemberName, setNewMemberName] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');

  if (!sanduq) {
    return <View><Paragraph>Sanduq not found</Paragraph></View>;
  }

  const handleJoin = () => {
    if (newMemberName) {
      addMember(sanduqId, newMemberName);
      setNewMemberName('');
    }
  };

  const handleContribute = () => {
    if (selectedMemberId && contributionAmount) {
      contributeFunds(sanduqId, selectedMemberId, Number(contributionAmount));
      setContributionAmount('');
      setSelectedMemberId('');
    }
  };

  const handlePayout = () => {
    if (sanduq.nextPayoutMemberId) {
      const payoutAmount = requestPayout(sanduqId, sanduq.nextPayoutMemberId);
      if (payoutAmount > 0) {
        alert(`Payout of $${payoutAmount.toLocaleString()} has been processed for the current member.`);
      } else {
        alert("It's not your turn for a payout or there are no funds available.");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{sanduq.name}</Title>
          <Paragraph>{sanduq.description}</Paragraph>
          <Paragraph>Balance: ${sanduq.balance}</Paragraph>
          <Paragraph>Goal: ${sanduq.goal}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Members</Title>
          {sanduq.members.map((member) => (
            <List.Item
              key={member.id}
              title={member.name}
              description={`Contribution: $${member.contribution}`}
              right={() => member.id === sanduq.nextPayoutMemberId && <Paragraph>Next for payout</Paragraph>}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Join Sanduq</Title>
          <TextInput
            label="Your Name"
            value={newMemberName}
            onChangeText={setNewMemberName}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleJoin} style={styles.button}>
            Join
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Contribute Funds</Title>
          <TextInput
            label="Select Member"
            value={selectedMemberId}
            onChangeText={setSelectedMemberId}
            style={styles.input}
          />
          <TextInput
            label="Amount"
            value={contributionAmount}
            onChangeText={setContributionAmount}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button mode="contained" onPress={handleContribute} style={styles.button}>
            Contribute
          </Button>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={handlePayout} style={styles.button}>
        Request Payout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default SanduqDetailsScreen;