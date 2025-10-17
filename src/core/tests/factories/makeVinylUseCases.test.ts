import { makeVinylRecordUseCases } from "../../factories/makeVinylRecordUseCases"


describe("Virificar criaçaõ do Factorie", ()=>{

    it("Retorna todos os usecases", ()=>{

        const usecases = makeVinylRecordUseCases()

        expect(usecases.registerVinylRecord).toBeDefined()
        expect(usecases.updateVinylRecord).toBeDefined()
        expect(usecases.deleteVinylRecord).toBeDefined()
        expect(usecases.findVinylRecord).toBeDefined()
        expect(usecases.findAllVinylRecords).toBeDefined()
    })
})