import { FindAllVinylRecords } from "../../../domain/use-cases/FindAllVinylRecords"
import { RegisterVinylRecord } from "../../../domain/use-cases/RegisterVinylRecord"
import { MockVinylRecordRepository } from "../../../infra/repositories/MockVinylRecordRepository"


describe("FindAll vinil", ()=>{
    it("Busca Tudo", async ()=>{
        const repository = MockVinylRecordRepository.getInstance()

        const usecase = new FindAllVinylRecords(repository)

        const allVinil = await usecase.execute()

        expect(allVinil.length).toBe(1)

        repository.delete("vinyl-1")

        const allVinil2 = await usecase.execute()

        expect(allVinil2.length).toBe(0)
    })
})