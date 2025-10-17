import { Photo } from "../../../domain/value-objects/Photo"

describe("Test criação do VO Photo", ()=>{
    it("Instancia corretamente", ()=>{
        let photo = Photo.create("http://nvosndv.com")

        expect(photo.url).toBe("http://nvosndv.com")
    })

    it("URL inválida gera erro", ()=>{
        expect(()=>Photo.create("vosndv.com")).toThrow("Invalid photo URL")
    })
})