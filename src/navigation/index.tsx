import { RouteProp} from "@react-navigation/native"; // 전체 네비게이션을 감싸는 컨테이너 불러오기
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

export enum AppScreens {
    MyDoc = 'MyDoc',
    FavoriteDoc = 'FavoriteDoc',
    SecurityDoc = 'SecurityDoc',
    TrashDoc = 'TrashDoc',
    ShareDoc = 'ShareDoc',
    SharedDoc = 'SharedDoc',
    ReceivedShareDoc = 'ReceivedShareDoc',
    CopyDialog = "CopyDialog",
    MoveDialog = "MoveDialog",
    DocInfoDialog = 'DocInfoDialog',
    DocHistory = 'DocHistory',
    UserInfoDialog = 'UserInfoDialog',
    TagDialog = 'TagDialog',
    SecurityDialog = 'SecurityDialog',

    Login = 'Login',
    Home = 'Home',
    Splash = 'Splash',
    GroupDoc = 'GroupDoc',
    CompanyDoc = 'CompanyDoc',
    ShareReceiveDoc = 'ShareReceiveDoc',
    ShareConfig = "ShareConfig",
    ShareMessage = "ShareMessage",
    FileView = "FileView",
    LastViewDoc = "LastViewDoc",
    CategoryDoc = "CategoryDoc",
    TrashBinContent = "TrashBinContent",
    Main = 'Main',
    // Auth = 'Auth'
}
  
export type AppStackParamList = {
    MyDoc: undefined;
    FavoriteDoc: undefined;
    SecurityDoc: undefined;
    TrashDoc: undefined;
    ShareDoc : undefined;
    SharedDoc : undefined;
    ReceivedShareDoc : undefined;
    CopyDialog: undefined;
    MoveDialog: undefined;
    DocInfoDialog: undefined;
    DocHistory: undefined;
    UserInfoDialog: undefined;
    TagDialog: undefined;
    SecurityDialog: undefined;

    Splash: undefined;
    Login: undefined;
    Home: undefined;
    GroupDoc: undefined;
    CompanyDoc: undefined;
    ShareReceiveDoc: undefined;
    FileView: undefined;
    LastViewDoc: undefined;
    CategoryDoc: undefined;
    TrashBinContent: undefined;
    Main: undefined;
};

export const Stack = createStackNavigator<AppStackParamList>();
export type AppScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Login'>;
export type AppScreenRouteProp = RouteProp<AppStackParamList, 'Splash'>;


