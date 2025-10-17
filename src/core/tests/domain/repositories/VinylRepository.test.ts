import { VinylRecord } from "../../../domain/entities/VinylRecord";
import { Name } from "../../../domain/value-objects/Name";
import { Photo } from "../../../domain/value-objects/Photo";
import { MockVinylRecordRepository } from "../../../infra/repositories/MockVinylRecordRepository"

let vinil1 = VinylRecord.create(
    "id-vinil1",
    Name.create("Banda1"),
    Name.create("Album1"),
    1999,
    10,
    Photo.create("https://vbjdisd.com"),
    "user1"
)

describe("Teste Repository", ()=>{
    let repository: MockVinylRecordRepository

    beforeEach(()=>{
        repository = MockVinylRecordRepository.getInstance()
        repository.reset()
    })

    it("Criar vinil", async ()=>{

        await repository.save(vinil1)

        const response = await repository.findById("id-vinil1")

        expect(response).not.toBeNull()
    })

    it("Update vinil", async ()=>{
        await repository.save(vinil1)

        const vinilUpdated:VinylRecord = {
            ...vinil1,
            band: Name.create("Banda2")
        }

        await repository.update(vinilUpdated)

        const response = await repository.findById("id-vinil1")

        expect(response?.band.value).toBe("Banda2")
    })

    it("Delete vinil", async ()=>{
        await repository.save(vinil1)

        const all = await repository.findAll()

        expect(all.length).toBe(1)

        await repository.delete("id-vinil1")

        const validate = await repository.findAll()

        expect(validate.length).toBe(0)
    })
})