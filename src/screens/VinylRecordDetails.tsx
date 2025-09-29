import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ComponentButtonInterface } from "../components";
import { VinylRecord } from "../core/domain/entities/VinylRecord";
import { VinylRecordTypes } from "../navigations/VinylRecordStackNavigation";


export function VinylRecordDetailsScreen({ navigation }: VinylRecordTypes) {
    const route = useRoute()
    const { record } = route.params as { record: VinylRecord };
    return (
        <View style={styles.container}>
            <Text>Vinyl Record Details</Text>
            <Text>Band: {record.band.value}</Text>
            <Text>Album: {record.album.value}</Text>
            <Text>Year: {record.year}</Text>
            <Text>Number of Tracks: {record.numberOfTracks}</Text>
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