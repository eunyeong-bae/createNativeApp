import React from "react";
import { Text, SafeAreaView} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppScreens, AppStackParamList} from '../navigation';
// import LastViewDoc from '../content/LastViewDoc';
import MyDoc from '../content/MyDoc_F';


// const Drawer = createDrawerNavigator<AppStackParamList>();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={'MyDoc'} component={MyDoc} options={{ drawerLabel: 'MyDoc'}} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;