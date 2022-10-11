import { RouteProp} from "@react-navigation/native"; // 전체 네비게이션을 감싸는 컨테이너 불러오기
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

export enum AppScreens {
    Login = 'Login',
    Home = 'Home',
    Splash = 'Splash',
    MyDoc = 'MyDoc',
    GroupDoc = 'GroupDoc',
    CompanyDoc = 'CompanyDoc',
    ShareDoc = 'ShareDoc',
    ShareReceiveDoc = 'ShareReceiveDoc',
    ShareConfig = "ShareConfig",
    ShareMessage = "ShareMessage",
    FileView = "FileView",
    LastViewDoc = "LastViewDoc",
    CategoryDoc = "CategoryDoc",
    TrashBinContent = "TrashBinContent",
    CopyDialog = "CopyDialog",
    MoveDialog = "MoveDialog",
    FavoriteDoc = 'FavoriteDoc',
    SecurityDoc = 'SecurityDoc',
    TrashDoc = 'TrashDoc',
    Main = 'Main'
    // Auth = 'Auth'
}
  
export type AppStackParamList = {
    Splash: undefined;
    Login: undefined;
    Home: undefined;
    MyDoc: undefined;
    GroupDoc: undefined;
    CompanyDoc: undefined;
    ShareDoc: undefined;
    ShareReceiveDoc: undefined;
    FileView: undefined;
    LastViewDoc: undefined;
    CategoryDoc: undefined;
    TrashBinContent: undefined;
    CopyDialog: undefined;
    MoveDialog: undefined;
    FavoriteDoc: undefined;
    SecurityDoc: undefined;
    TrashDoc: undefined;
    Main: undefined;
};

export const Stack = createStackNavigator<AppStackParamList>();
export type AppScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Login'>;
export type AppScreenRouteProp = RouteProp<AppStackParamList, 'Splash'>;


