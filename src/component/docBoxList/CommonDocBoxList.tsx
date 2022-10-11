import React from 'react';
import { View, TouchableOpacity, Text, ScrollView} from 'react-native';
import { dialogStyles} from './style/style';
import useDocList from '../../hooks/useDocList';
import CommonUtil from '../../utils/CommonUtil';

/**
 * listType : String ( 검색 타입 * 필수 )
    - 1 공유 한
    - 2 공유 받은 
    - 3 공유한/공유받은
    - 4 중요문서함
    - 5 보안문서함
    - 6 본인 문서
    - 이외 폴더 조회
 */

const DOCUMENT_BOX_LIST = [ //MAP
    { title: 'ONEFFICE', listType: null },
    { title: '내문서함', listType: '' },
    { title: '공유문서함', listType: 3 },
    { title: '공유한 문서함', listType: 1 },
    { title: '공유받은 문서함', listType: 2 },
    { title: '중요문서함', listType: 4 },
    { title: '보안문서함', listType: 5 },
    { title: '휴지통', listType: null },
];

const CommonDocBoxList = () => {
    const onClickDocBox = () => {

    }

    return (
        <View style={ dialogStyles.docBoxListContainer}>
            <ScrollView horizontal={ true}>
                <>
                    {
                        !CommonUtil.objectIsNull( DOCUMENT_BOX_LIST) &&
                        DOCUMENT_BOX_LIST.map( list => {
                            return (
                                <TouchableOpacity key={ list.title} onPress={ onClickDocBox.bind( this, list.listType)}>
                                    <View style={ dialogStyles.docBoxList}>
                                        <Text style={ dialogStyles.docBoxListText}>{ list.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </>
            </ScrollView>
        </View>
    )
};

export default CommonDocBoxList;