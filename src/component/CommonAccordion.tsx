import { CommonContext } from '../context/CommonContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View} from 'react-native';
import { List} from 'react-native-paper';
import Adapter from '../ecmadapter';
import { format, parseISO} from 'date-fns';
import SvgIcon from '../component/svgIcon/SvgIcon';

const CommonAccordion = ( ) => {
    const { selectedTargetState} = useContext( CommonContext);

    const [ isResultData, setIsResultData] = useState({
        isSetClear: false,
        data: [],
    });

    useEffect(() => {
        const getDocHistory = async( docUID: any) => {
            let result: any = [];
    
            const data: any = {
                protocolId : 'P538',
                data : {
                    docUID: docUID,
                    targetObjectType:'DO',
                    termValue :'Y',					
                }
            };
    
            await Adapter.fetch.protocol( data).then((res) =>{
                if( res) {
                    result = res.list;
    
                    setIsResultData({
                        ...isResultData,
                        data: result
                    });
                }
            }).catch((error) => {
                console.log( error);
            })
            return result;
        };
       
        if( isResultData.data?.length === 0) {
            getDocHistory( selectedTargetState.selectedTarget?.docUID);
        }
    }, []);
    
    useEffect(() => {
        if( !isResultData.isSetClear && isResultData.data.length > 0 ) {
            getDocHistoryContent();
        }
    }, [ isResultData]);

    const convertHistoryData = ( _obj : any) => {
        let _iconUrl = "";
        let _action_name ="";
        let _sharedUser = "";
        let _shareComment = "";
      
        const isGroup = ( str : string) => {
          if( str.indexOf(" 외") > -1 && str.indexOf("건") > -1)
            return true;
          else
            return false;
        };  
      
        switch ( _obj.action_code) {
          case '1': //보기
            _iconUrl = "docHistoryView";
            _action_name = "님이 문서를 열람했습니다.";
              break;
      
          case '4': //문서 공유
            _iconUrl = "docHistoryShare";
            _sharedUser = _obj.shareDetailItem ? _obj.shareDetailItem.summary : "";
            _shareComment = `${_sharedUser}에게 공유`;  
            
            if(isGroup(_sharedUser)) _shareComment = `${_sharedUser} 공유`;
            _action_name = `님이 문서를 공유했습니다.`;
            break;
          case '29': // 공유 변경
            _iconUrl = "docHistoryShare";
            _sharedUser = _obj.shareDetailItem ? _obj.shareDetailItem.summary : "";
            _shareComment = `${_sharedUser}의 공유 변경`;
      
            if(isGroup(_sharedUser)) _shareComment = `${_sharedUser} 공유 변경`;
            _action_name = `님이 문서를 공유 변경했습니다.`;
            //1818101092
            break;
          case '5':// 공유해제
            _iconUrl = "docHistoryShare";
            _sharedUser = _obj.shareDetailItem ? _obj.shareDetailItem.summary : "";
            _shareComment = `${_sharedUser}의 공유 해제`;
      
            if(isGroup(_sharedUser)) _shareComment = `${_sharedUser} 공유 해제`;
            _action_name = "님이 문서를 공유 해제했습니다.";
              break;
      
          case '8': //문서보안 생성, 수정, 해제
              _iconUrl ="docHistoryCreate";
            _action_name = "님이 문서를 암호 설정했습니다.";
            break;
          case '9':
            _iconUrl ="docHistoryCreate";
            _action_name = "님이 문서를 암호 변경했습니다.";
            break;
          case '10':
              _iconUrl ="docHistoryCreate";
            _action_name = "님이 문서를 암호 해제했습니다.";
            break;
      
          case '14': //사본만들기
            _iconUrl = "docHistoryCopy";
            _action_name = "님이 문서를 사본 만들기했습니다.";
            break;
      
          // case '25': //원플립 생성,수정,해제
          //     _iconUrl = "../mobile/images/ico/icon-oneflip.png";
          //   _action_name = "님이 문서를 원플립 생성했습니다.";
          //   break;
          // case '26':
          //   _iconUrl = "../mobile/images/ico/icon-oneflip.png";
          //   _action_name = "님이 문서를 원플립 수정했습니다.";
          //   break;
          // case '27':
          //   _iconUrl = "../mobile/images/ico/icon-oneflip.png";
          //   _action_name = "님이 문서를 원플립 해제했습니다.";
          //   break;
      
          case '30': // 오픈 링크 공유
            _iconUrl = "docHistoryShare";
            _action_name = "님이 오픈 링크 공유했습니다."
            _sharedUser = _obj.shareDetailItem ? _obj.shareDetailItem.summary : "";
            _shareComment = `${_sharedUser} 공유`;
            break;
          case '31': // 오픈 링크 해제
            _iconUrl = "docHistoryShare";
            _action_name = "님이 오픈 링크 공유 해제했습니다."
            _sharedUser = _obj.shareDetailItem ? _obj.shareDetailItem.summary : "";
            _shareComment = `${_sharedUser} 공유 해제`;
            break;
          case '32': // 오픈 링크 변경
              _iconUrl = "docHistoryShare";
            _action_name = "님이 오픈 링크 공유 변경했습니다."
            _sharedUser = _obj.shareDetailItem ? _obj.shareDetailItem.summary : "";
            _shareComment = `${_sharedUser} 공유 변경`;
            break;
      
          // case '33': case '34': case '35':
          //   _iconUrl = "../mobile/images/ico/icon_sketch.png";
          //   _action_name = "님이 스케치를 편집했습니다.";
          //   break;
      
          case '36': case '37': case '38':
            _iconUrl = "docHistoryCreate";
            _action_name = "님이 문서를 제한 설정했습니다.";
            break;
          case '39': case '40': case '41':
            _iconUrl = "docHistoryCreate";
            _action_name = "님이 문서를 제한 해제했습니다.";
            break;
          default: //편집
            _iconUrl = "docHistoryEdit";
            _action_name = "님이 문서를 편집했습니다.";
            break;
        }
      
        const _nboj = {
          icon : _iconUrl, 
          name : _obj.action_user_name, 
          date : parseISO(_obj.reg_date.replace(' ','T')), 
          action : _action_name,
          new_data : _obj.newHistoryShare,
          sharedUser : _shareComment
        };
      
        return _nboj;
      }
      
      const getDocHistoryContent = () => {
          const docHistoryData = isResultData.data;

          let dayGroupLists = [];
          for( let i =0; i < docHistoryData.length; i++) {
            let isDataInclude = false;
      
            const docData = docHistoryData[i];
            const addHistoryDataObj = {
              month : format( parseISO( docData.reg_date?.split(" ")[0]), "yyyy년 MM월"),
              day : format( parseISO( docData.reg_date?.split(" ")[0]), "MM월 dd일"),
              date : docData.reg_date,
              history: [ convertHistoryData( docData)]
            };
      
            for( let j = 0; j < dayGroupLists.length; j++){
              const dayGroupObj = dayGroupLists[j];
      
              if( dayGroupObj.day === format( parseISO( docData.reg_date?.split(" ")[0]), "MM월 dd일")){
                dayGroupObj.history.push( convertHistoryData(docData));
                isDataInclude = true;
              }
            }
            if(!isDataInclude) dayGroupLists.push(addHistoryDataObj);      
          }
      
          if( dayGroupLists.length > 0) {
            setIsResultData({
                isSetClear: true,
                data: dayGroupLists
            });
          }
      };

      return useMemo(() => (
        isResultData.isSetClear && isResultData.data.length > 0 &&
            <List.Section style={{ width:'95%', height:'90%',marginLeft:8}}>
                { isResultData.data.map(( data: any) => {
                    return (
                        <List.Accordion
                            title={ data.month}
                            id={ data.month + data.date}
                            left={ props => <List.Icon {...props} icon="folder" />}
                            style={{ borderWidth:1, borderColor:'#DCE7FB',borderRadius:10, marginBottom:5, backgroundColor:'#fff', }}
                        >                            
                            { data.history.map(( dayHistory: any) => {
                                return (
                                    <View style={{ flexDirection:'row',alignItems:'center', borderWidth:1,borderColor:'#DCE7FB', borderRadius:10, paddingLeft:10, backgroundColor:'#fff', height:65, marginBottom:5}}>
                                        <SvgIcon name={ dayHistory.icon} width={35} height={35}/>
                                        <List.Item key={ data.date} title={ dayHistory.name + dayHistory.action} description={ data.date} style={{ width: '85%', height:'100%', backgroundColor:'#fff',}}  />
                                    </View>
                                )
                            })}
                        </List.Accordion>
                    )})
                }
            </List.Section>
              
      ), [ isResultData]);
};

export default CommonAccordion;