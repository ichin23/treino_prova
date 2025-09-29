import { createDrawerNavigator } from '@react-navigation/drawer'
import { BottomTabNavigation } from './MeuTabNavigation'
import { colors } from '../styles/colors'
import { VinylRecordStackNavigation } from './VinylRecordStackNavigation'

const Drawer = createDrawerNavigator({
    initialRouteName: 'Meu',
    screens: {
        Meu: BottomTabNavigation
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
            <Drawer.Screen component={BottomTabNavigation} name='Meu' />
            <Drawer.Screen component={VinylRecordStackNavigation} name='Vinyl Records' />
        </Drawer.Navigator>
    )
}
