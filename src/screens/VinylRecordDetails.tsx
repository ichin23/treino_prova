import { Alert, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ComponentButtonInterface } from "../components";
import { VinylRecord } from "../core/domain/entities/VinylRecord";
import { VinylRecordTypes } from "../navigations/VinylRecordStackNavigation";
import { makeVinylRecordUseCases } from "../core/factories/makeVinylRecordUseCases";


export function VinylRecordDetailsScreen({ navigation }: VinylRecordTypes) {
    const route = useRoute()
    const { record } = route.params as { record: VinylRecord };
    const vinylRecordUseCases = makeVinylRecordUseCases();

    async function handleDelete() {
        Alert.alert("Delete", "Are you sure you want to delete this record?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: async () => {
                    try {
                        await vinylRecordUseCases.deleteVinylRecord.execute({ id: record.id });
                        Alert.alert("Success", "Record deleted successfully");
                        navigation.navigate("ListVinylRecords");
                    } catch (error) {
                        Alert.alert("Error", "Failed to delete record");
                    }
                }
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Text>Vinyl Record Details</Text>
            <Text>Band: {record.band.value}</Text>
            <Text>Album: {record.album.value}</Text>
            <Text>Year: {record.year}</Text>
            <Text>Number of Tracks: {record.numberOfTracks}</Text>
            <ComponentButtonInterface type="secondary" title="Edit"
                onPress={() => navigation.navigate("EditVinylRecord", { record })}
            />
            <ComponentButtonInterface type="third" title="Delete"
                onPress={handleDelete}
            />
            <ComponentButtonInterface type="primary" title="Back"
                onPress={() => navigation.navigate("ListVinylRecords")}
            />
        </View>
    )
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})