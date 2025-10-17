import { fireEvent, render, waitFor } from "@testing-library/react-native"
import { AuthProvider } from "../context/auth"
import { VinylRecordStackNavigation } from "../navigations/VinylRecordStackNavigation"
import { Name } from "../core/domain/value-objects/Name";
import { Email } from "../core/domain/value-objects/Email";
import { Password } from "../core/domain/value-objects/Password";
import { GeoCoordinates } from "../core/domain/value-objects/GeoCoordinates";
import { User } from "../core/domain/entities/User";
import * as AuthContext from '../context/auth';
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MockUserRepository } from "../core/infra/repositories/MockUserRepository";
import { MockVinylRecordRepository } from "../core/infra/repositories/MockVinylRecordRepository";

describe("Testar fluxo de CRUD do Vinyl", () => {
    beforeEach(()=>{
        MockUserRepository.getInstance().reset();
        MockVinylRecordRepository.getInstance().reset();
        jest.restoreAllMocks(); // Restores all mocks
    })

    it("Fluxo de Cadatro, edição e delete", async () => {

        // 1. Mock the authenticated user
        const mockUser = User.create(
            'user-1',
            Name.create('Test User'),
            Email.create('test@example.com'),
            Password.create('password123'),
            GeoCoordinates.create(0, 0)
        );

        // Spy on useAuth and return the mock user
        jest.spyOn(AuthContext, 'useAuth').mockReturnValue({
            login: true,
            user: mockUser,
            handleLogin: jest.fn(),
            setLogin: jest.fn(),
            session: null,
        });

        // 2. Mock the Alert component
        const alertSpy = jest.spyOn(Alert, 'alert');

        const { getByText, getByPlaceholderText, queryByText } = render(
            <NavigationContainer>
                <AuthProvider>
                    <VinylRecordStackNavigation />
                </AuthProvider>
            </NavigationContainer>
        )

        await waitFor(()=>fireEvent.press(getByText("Register New Vinyl Record")))

        fireEvent.changeText(getByPlaceholderText("Band"), "banda1")
        fireEvent.changeText(getByPlaceholderText("Album"), "album1")
        fireEvent.changeText(getByPlaceholderText("Year"), "1999")
        fireEvent.changeText(getByPlaceholderText("Number of Tracks"), "10")
        fireEvent.changeText(getByPlaceholderText("Photo URL"), "http://nkodsnocvds.com")

        fireEvent.press(getByText("Save"))

        await waitFor(()=>{ expect(queryByText("banda1 - album1")).not.toBeNull()})

        fireEvent.press(getByText("detalhes"))
        fireEvent.press(getByText("Edit"))

        fireEvent.changeText(getByPlaceholderText("Band"), "banda2")

        fireEvent.press(getByText("Update"))

        await waitFor(()=>{ expect(queryByText("banda2 - album1")).not.toBeNull()})

        fireEvent.press(getByText("detalhes"))
        fireEvent.press(getByText("Delete"))

        const alertArgs = alertSpy.mock.calls[0];
        const deleteButton = alertArgs[2] && alertArgs[2][1]; // [title, message, buttons]
        if (deleteButton && deleteButton.onPress) {
            await deleteButton.onPress();
        }

        await waitFor(()=>{expect(queryByText("banda2 - album1")).toBeNull()})
    })
})