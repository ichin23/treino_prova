import { Name } from "../../../domain/value-objects/Name"


describe("Testar VO Name", ()=>{
    it("Instacia certinho", ()=>{
        let name = Name.create("Pedro")

        expect(name.value).toBe("Pedro")
    })

    it("Gera erro", ()=>{
        expect(()=>Name.create("")).toThrow("Invalid name")
    })
})