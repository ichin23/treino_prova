import { createDrawerNavigator } from '@react-navigation/drawer'
import { MeuTabNavigation } from './MeuTabNavigation'
import { colors } from '../styles/colors'
import { VinylRecordStackNavigation } from './VinylRecordStackNavigation'
import { ScreenPhoto } from '../screens'

const Drawer = createDrawerNavigator({
    initialRouteName: 'Meu',
    screens: {
        Meu: MeuTabNavigation
    }
})

export function MainDrawerNavigation() {
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            drawerStyle: {
                backgroundColor: colors.primary,
            },
            drawerActiveTintColor: colors.white,
            drawerInactiveTintColor: colors.white
        }}>
            <Drawer.Screen component={MeuTabNavigation} name='Meu' />
            <Drawer.Screen component={VinylRecordStackNavigation} name='Vinyl Records' />
            <Drawer.Screen component={ScreenPhoto} name='Foto' />
        </Drawer.Navigator>
    )
}
