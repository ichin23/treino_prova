import { VinylRecord } from "../../../domain/entities/VinylRecord";
import { Name } from "../../../domain/value-objects/Name";
import { Photo } from "../../../domain/value-objects/Photo";

describe('VinylRecord Entity', () => {

    it("Instanciar a entidade VinylRecord com sucesso", () => {
        let vinil = VinylRecord.create(
            "id-vinil1",
            Name.create("Banda1"),
            Name.create("Album1"),
            1999,
            10,
            Photo.create("https://vbjdisd.com"),
            "user1"
        )

        expect(vinil.id).toBe("id-vinil1")
        expect(vinil.band.value).toBe("Banda1")
        expect(vinil.album.value).toBe("Album1")
        expect(vinil.year).toBe(1999)
    });

});