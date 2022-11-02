import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { MyDocListViewStyles} from '../content/style/style';
import SvgIcon from '../component/svgIcon/SvgIcon';

interface MovePathProps {
    targetFullPathState? : any,
    setTargetFullPath? : any,
}

const CommonMovePath = ( props: MovePathProps) => {
    const { targetFullPathState, setTargetFullPath} = props;

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


    return (
        <TouchableOpacity onPress={ onClickFolderBack.bind( this, targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 2])}>
            <View style={ MyDocListViewStyles.docListContainer}>
                    <View style={ MyDocListViewStyles.docListStyle}>
                        <View style ={ MyDocListViewStyles.ThumImg}>
                            <SvgIcon name="DocListFolderIcon" width={22} height={22} />
                        </View>
                        <View style={ MyDocListViewStyles.docInfo}>
                            <Text style={ [ MyDocListViewStyles.title, { color: '#75b9f4', fontWeight:'bold', fontSize:15}]} numberOfLines={1}>상위 폴더로 이동</Text>
                        </View>
                    </View>
            </View>
        </TouchableOpacity>
    )
};

export default CommonMovePath;