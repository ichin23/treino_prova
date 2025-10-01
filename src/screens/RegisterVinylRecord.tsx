import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, Alert, Platform } from 'react-native';
import { styles } from './Register/styles';
import { colors } from '../styles/colors';
import { ComponentButtonInterface, ComponentLoading } from '../components';
import { makeVinylRecordUseCases } from '../core/factories/makeVinylRecordUseCases';
import { VinylRecordTypes } from '../navigations/VinylRecordStackNavigation';

export function RegisterVinylRecordScreen({ navigation }: VinylRecordTypes) {
  const [band, setBand] = useState('');
  const [album, setAlbum] = useState('');
  const [year, setYear] = useState('');
  const [numberOfTracks, setNumberOfTracks] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vinylRecordUseCases = makeVinylRecordUseCases();

  async function handleRegister() {
    setLoading(true);
    setError(null);
    try {
      await vinylRecordUseCases.registerVinylRecord.execute({
        band,
        album,
        year: parseInt(year, 10),
        numberOfTracks: parseInt(numberOfTracks, 10),
        photoUrl,
      });
      Alert.alert('Success', 'Vinyl record registered successfully');
      navigation.navigate('ListVinylRecords');
    } catch (err) {
      setError('Failed to register vinyl record');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Text style={styles.title}>Register Vinyl Record</Text>
        <View style={styles.formRow}>
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Band"
            value={band}
            onChangeText={setBand}
          />
        </View>
        <View style={styles.formRow}>
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Album"
            value={album}
            onChangeText={setAlbum}
          />
        </View>
        <View style={styles.formRow}>
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Year"
            keyboardType="numeric"
            value={year}
            onChangeText={setYear}
          />
        </View>
        <View style={styles.formRow}>
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Number of Tracks"
            keyboardType="numeric"
            value={numberOfTracks}
            onChangeText={setNumberOfTracks}
          />
        </View>
        <View style={styles.formRow}>
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Photo URL"
            value={photoUrl}
            onChangeText={setPhotoUrl}
          />
        </View>
        {loading ? (
          <ComponentLoading />
        ) : (
          <ComponentButtonInterface title='Save' type='secondary' onPress={handleRegister} disabled={loading} />
        )}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <ComponentButtonInterface title='Back' type='primary' onPress={() => navigation.navigate('ListVinylRecords')} />
      </KeyboardAvoidingView>
    </View>
  );
}
