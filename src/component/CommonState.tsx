import React from 'react';
import { ModalDialog } from '../dialog/ModalDialog';
import ActionMenu from '../menu/ActionMenu';
// import Dialog from '../dialog';
// import ActionMenuClass from '../menu';
// import ReViewDoc from '../dialog/ReViewDoc'

export default function CommonState(){
    return(
        <>
            {/* <ReViewDoc /> 미리보기(썸넬)
            <Dialog /> 
            
            * 밑에 아이들이 렌더 될 때마다 최상단 애들도 같이 렌더링 됌 이를 방지하기 위해 하위 컴포넌트에서 useMemo로 최적화 시켜줌, 
            */}
            <ModalDialog />
            <ActionMenu />
        </>
    )
}