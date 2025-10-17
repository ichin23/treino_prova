import { RegisterVinylRecord } from "../../../domain/use-cases/RegisterVinylRecord"
import { MockVinylRecordRepository } from "../../../infra/repositories/MockVinylRecordRepository"


describe("Restrar vinil", ()=>{
    it("Cadastra certo", async ()=>{
        const repository = MockVinylRecordRepository.getInstance()

        const usecase = new RegisterVinylRecord(repository)

        const newVinil = await usecase.execute({
            band: "banda1",
            album: "album1",
            year: 1999,
            numberOfTracks:10,
            photoUrl:"http://ncjids.com",
            ownerId: "user1"
        })

        expect(newVinil.id).toBeDefined()
        expect(newVinil.album.value).toBe("album1")
    })
})