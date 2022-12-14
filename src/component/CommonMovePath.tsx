import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { MyDocListViewStyles} from '../content/style/style';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { CommonContext } from '../context/CommonContext';

interface MovePathProps {
    targetFullPathState? : any,
    setTargetFullPath? : any,
}

const CommonMovePath = ( props: MovePathProps) => {
    const { targetFullPathState, setTargetFullPath} = props;
    const { centerDialogState} = useContext( CommonContext);

    const onClickFolderBack = ( fullPathUID: string) => {
        const tempTarget = {
            fullPathUIDs : targetFullPathState.fullPathUIDs.concat(),
            fullPathNames : targetFullPathState.fullPathNames.concat(),
        };

        for(let i =0; i< targetFullPathState.fullPathUIDs.length; i++){
            if( tempTarget.fullPathUIDs[i] === fullPathUID) {
                tempTarget.fullPathUIDs = tempTarget.fullPathUIDs.slice( 0, i + 1);
                tempTarget.fullPathNames = tempTarget.fullPathNames.slice( 0, i + 1);
                break;
            }
        }

        setTargetFullPath( tempTarget.fullPathUIDs, tempTarget.fullPathNames, []);
    };


    return useMemo(() => (
        <TouchableOpacity onPress={ onClickFolderBack.bind( this, targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 2])}>
            <View style={[ MyDocListViewStyles.docListContainer, centerDialogState.dialogName !== '' && MyDocListViewStyles.dialogDocListCon]}>
                    <View style={ MyDocListViewStyles.docListStyle}>
                        <View style ={ MyDocListViewStyles.ThumImg}>
                            <SvgIcon name="folderPrev" width={22} height={22} />
                        </View>
                        <View style={ MyDocListViewStyles.docInfo}>
                            <Text style={ [ MyDocListViewStyles.title, { color: '#75b9f4', fontWeight:'bold', fontSize:15}]} numberOfLines={1}>상위 폴더로 이동</Text>
                        </View>
                    </View>
            </View>
        </TouchableOpacity>
    ), [ targetFullPathState]);
};

export default CommonMovePath;