import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Popover, { PopoverMode } from 'react-native-popover-view';

const SortPopOver = (props: any) => {
    const touchable = useRef();
    const [showPopover, setShowPopover] = useState(false);
    var {width, height} = Dimensions.get('window');
    const displayArea = {x: 5, y: 20, width: width - 10, height: height - 25};
    const buttonRect = {x: 10, y: 30, width: 10, height: 10}
    return (
        <>
            <Popover
                from={(
                    <TouchableOpacity>
                    <Text>Press here to open popover!</Text>
                    </TouchableOpacity>
                )}/>
                {/* <Text>This is the contents of the popover</Text>
            </Popover> */}
            {/* <TouchableOpacity ref={touchable} onPress={() => setShowPopover(true)}>
                <Text>Press here to open popover!</Text>
            </TouchableOpacity>
            <Popover from={touchable}
                isVisible={showPopover}
                onRequestClose={() => setShowPopover(false)}
            >
                <Text>This is the contents of the popover</Text>
            </Popover> */}
        </>
    );
}

export default SortPopOver;