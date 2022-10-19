import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import ActionButton, { ActionButtonItem } from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatingMenu = () => {
    return (
        <View style={{flex:1, backgroundColor:'#f3f3f3'}}>
            <ActionButton buttonColor="#3498db">
                <ActionButtonItem buttonColor='rgba(231,76,60,1)' title="새 문서" onPress={() => alert('clicked!')}>
                    <Icon name="ios-create" style={ styles.actionButtonIcon}></Icon>
                </ActionButtonItem>
                <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                    <Icon name="ios-notifications-off" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                {/* <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                    <Icon name="ios-done-all" style={styles.actionButtonIcon} />
                </ActionButton.Item> */}
            </ActionButton>
        </View>
    );
};

export default FloatingMenu;

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });