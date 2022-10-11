import React from "react";
import { View} from 'react-native';
import { Stack, AppScreens} from './';
import Splash from '../splash'
import Login from '../login';
import Home from '..//home';
import MyDoc from '../content/MyDoc_F';
import { createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import { SafeAreaView } from "react-native-safe-area-context";
// import ShareDoc from '../content/'

//drawer menu
const Drawer = createDrawerNavigator();
const DrawerComponent = ( props: any) => {
    return (
        <View style={{ flex:1, paddingTop: 20}} >
            <SafeAreaView>
                <DrawerItemList {...props}/>
            </SafeAreaView>
        </View>
    )
};

const DrawerNavigation = () => {
    const headerFn = () : undefined => undefined;
    return (
        <Drawer.Navigator initialRouteName={ AppScreens.MyDoc} drawerContent={ DrawerComponent} screenOptions={{drawerPosition: 'left', drawerType: 'front'}}>
            <Drawer.Screen
                name={ AppScreens.Home}
                component={Home}
                options={{ header: headerFn, drawerLabel: '홈'}}
            />
            <Drawer.Screen 
                name={ AppScreens.MyDoc}
                component={MyDoc}
                options={{ header: headerFn, drawerLabel: '내 문서함'}}
            />
            <Drawer.Screen 
                name={ AppScreens.ShareDoc}
                component={ MyDoc}
                options={{ header: headerFn, drawerLabel: '공유 문서함'}}
            />
            <Drawer.Screen 
                name={ AppScreens.FavoriteDoc}
                component={ MyDoc}
                options={{ header: headerFn, drawerLabel: '중요 문서함'}}
            />
            <Drawer.Screen 
                name={ AppScreens.SecurityDoc}
                component={ MyDoc}
                options={{ header: headerFn, drawerLabel: '보안 문서함'}}
            />
            <Drawer.Screen 
                name={ AppScreens.TrashDoc}
                component={ MyDoc}
                options={{ header: headerFn, drawerLabel: '휴지통'}}
            />
        </Drawer.Navigator>
    )
}

const StackNanigation = () => {
    return (
        <Stack.Navigator initialRouteName={AppScreens.Splash}>
            {/* SplashScreen which will come once for 5 Seconds */}
            <Stack.Screen
                name={AppScreens.Splash}
                component={Splash}
                // Hiding header for Splash Screen
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name={ AppScreens.Main}
                component={ DrawerNavigation}
                options={{ headerShown: false}}
            />

            {/* Auth Navigator: Include Login and Signup */}
            {/* <Stack.Screen
                name={AppScreens.Auth}
                component={Auth}
                options={{headerShown: false}}
            /> */}
            <Stack.Screen
                name={AppScreens.Login}
                component={Login}
                options={{headerShown: false}}
            />
            {/* <Stack.Screen
                name={AppScreens.Home}
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={AppScreens.MyDoc}
                component={MyDoc}
                options={{headerShown: false}}
            /> */}
            {/* <Stack.Screen
                name={AppScreens.GroupDoc}
                component={GroupDoc}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={AppScreens.CompanyDoc}
                component={CompanyDoc}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={AppScreens.ShareDoc}
                component={ShareDoc}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={AppScreens.ShareReceiveDoc}
                component={ShareReceiveDoc}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={AppScreens.FileView}
                component={FileView}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={AppScreens.LastViewDoc}
                component={LastViewDoc}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={AppScreens.CategoryDoc}
                component={CategoryDoc}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={AppScreens.TrashBinContent}
                component={TrashBinContent}
                options={{headerShown: false}}
            /> */}
            {/* Navigation Drawer as a landing page */}
            {/* <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}
            // Hiding header for Navigation Drawer
            options={{headerShown: false}}
        /> */}
        </Stack.Navigator>
    );
}

export default StackNanigation;