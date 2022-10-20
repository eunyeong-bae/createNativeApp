import React, { useEffect, useState} from 'react';
import { View, StyleSheet, LogBox, SafeAreaView, Dimensions} from 'react-native';
import ActionButton, { ActionButtonItem } from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatingMenu = () => {
    const [ isBtnClicked, setBtnClicked] = useState( false);

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    const onClickSubMenu = () => {
        setBtnClicked( !isBtnClicked);

        alert('click');
    };

    return (
        /** active 속성 필요 (보이고 안보이고) */
        <>
        {/* #9cd3e0 */}
            <View style={ styles.container}>
                <ActionButton buttonColor= { isBtnClicked ? '#B5CAF0' : '#3498db'} zIndex={ 2} autoInactive={ true} onPress={() => ( setBtnClicked( !isBtnClicked))}>
                    <ActionButton.Item textContainerStyle={ styles.textContainer} buttonColor='#3498db' title="CreateNewFolder" onPress={ onClickSubMenu}>
                        <Icon name="folder-outline" style={ styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item textContainerStyle={ styles.textContainer} buttonColor='#3498db' title="CreateNewDoc" onPress={ onClickSubMenu}>
                        <Icon name="document-text-outline" style={ styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item textContainerStyle={ styles.textContainer} buttonColor='#3498db' title="DocumentForms" onPress={ onClickSubMenu}>
                        <Icon name="documents-outline" style={ styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
            {
                isBtnClicked &&
                 <View style={ styles.modalContainer}></View>
            }
        </>
    );
};

export default FloatingMenu;

const styles = StyleSheet.create({
    container: {
        opacity: 1,
        position: 'absolute',
        width: 100,
        height: 100,
        bottom:0,
        right:0,
        zIndex:3 
    },
    textContainer : {
        // borderColor:'#eee',
        // borderWidth:1,
        borderWidth: 1,
        borderColor: '#CFDFFB',// '#CFDFFB','#DCE7FB', #E4ECF9
        width: 120,
        alignItems:'center'
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    modalContainer: {
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height,
        position: 'absolute',
        opacity: 0.2,
        zIndex: 1,
        backgroundColor: '#000'
    }
  });