import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, Alert, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from '../Register/styles';
import { colors } from '../../styles/colors';
import { ComponentButtonInterface, ComponentLoading } from '../../components';
import { makeVinylRecordUseCases } from '../../core/factories/makeVinylRecordUseCases';
import { VinylRecord } from '../../core/domain/entities/VinylRecord';
import { VinylRecordTypes } from '../../navigations/VinylRecordStackNavigation';

export function EditVinylRecordScreen({ navigation }: VinylRecordTypes) {
  const route = useRoute();
  const { record } = route.params as { record: VinylRecord };

  const [band, setBand] = useState(record.band.value);
  const [album, setAlbum] = useState(record.album.value);
  const [year, setYear] = useState(record.year.toString());
  const [numberOfTracks, setNumberOfTracks] = useState(record.numberOfTracks.toString());
  const [photoUrl, setPhotoUrl] = useState(record.photo.url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vinylRecordUseCases = makeVinylRecordUseCases();

  async function handleUpdate() {
    setLoading(true);
    setError(null);
    try {
      await vinylRecordUseCases.updateVinylRecord.execute({
        id: record.id,
        band,
        album,
        year: parseInt(year, 10),
        numberOfTracks: parseInt(numberOfTracks, 10),
        photoUrl,
      });
      Alert.alert('Success', 'Vinyl record updated successfully');
      navigation.navigate('ListVinylRecords');
    } catch (err) {
      setError('Failed to update vinyl record');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Text style={styles.title}>Edit Vinyl Record</Text>
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
          <ComponentButtonInterface title='Update' type='secondary' onPress={handleUpdate} disabled={loading} />
        )}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <ComponentButtonInterface title='Back' type='primary' onPress={() => navigation.navigate('ListVinylRecords')} />
      </KeyboardAvoidingView>
    </View>
  );
}
