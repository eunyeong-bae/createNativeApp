import React from "react"
import { NavigationContainer } from "@react-navigation/native"; // 전체 네비게이션을 감싸는 컨테이너 불러오기
import StackNavigation from './src/navigation/StackNavigation';
import { CommonProvider } from "./src/context/CommonContext";
import CommonState from "./src/component/CommonState";
import { ModalPortal } from 'react-native-modals';

const AppRoute = () => {
    return (
        <CommonProvider>
            <NavigationContainer>
                <StackNavigation />
                <CommonState/>
                <ModalPortal />
            </NavigationContainer>
        </CommonProvider>
    );
}


export default AppRoute;