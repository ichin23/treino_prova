import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ScreenPhoto } from '../screens'
import { colors } from '../styles/colors'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator({
    screens: {
        Foto: ScreenPhoto,
    }
})

export function PhotoTabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: colors.primary,
                tabBarActiveTintColor: colors.white,
                headerShown: false,
                tabBarInactiveBackgroundColor: colors.primary,
                tabBarInactiveTintColor: colors.white,
            }}
        >
            <Tab.Screen name='Foto' component={ScreenPhoto}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="person" size={24} color={colors.white} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}