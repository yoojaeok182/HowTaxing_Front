// Note: 전자증명서 서비스 이용약관

import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components';
import CloseIcon from '../../../assets/icons/close_button.svg';
import getFontSize from '../../../utils/getFontSize';
import DropShadow from 'react-native-drop-shadow';
import { SheetManager } from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { setCert } from '../../../redux/certSlice';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ProgressSection = styled.View`
  flex-direction: row;
  width: 100%;
  height: 5px;
  background-color: #2f87ff;
`;


const ButtonSection = styled.View`
  bottom: 10px;
  width: 100%;
`;

const Button = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6,
}))`
  width: ${props => props.width - 40}px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => (props.active ? '#2F87FF' : '#e5e5e5')};
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  align-self: center;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-family: Pretendard-Bold;
  color: ${props => (props.active ? '#fff' : '#a3a5a8')};
  line-height: 20px;
`;


const Cert2 = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const webviewRef = useRef(null);
  const { width } = useWindowDimensions();
  const [activeButton, setActiveButton] = useState(true);
  const { agreeCert, agreePrivacy, agreeLocation, agreeAge, agreeMarketing } = useSelector(
    state => state.cert.value,
  );

  const handleBackPress = () => {
    navigation.goBack({ tokens: props?.route?.params?.tokens ? props?.route?.params?.tokens : null, id: props?.route?.params?.id ? props?.route?.params?.id : null, password: props?.route?.params?.password ? props?.route?.params?.password : null});
    return true;
  }
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }
    }, [handleBackPress])
  );


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => {
            navigation.goBack({ tokens: props?.route?.params?.tokens ? props?.route?.params?.tokens : null, id: props?.route?.params?.id ? props?.route?.params?.id : null, password: props?.route?.params?.password ? props?.route?.params?.password : null});
          }}>
          <CloseIcon />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      title: '약관 조회하기',
      headerShadowVisible: false,
      contentStyle: {
        borderTopWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
        color: '#333',
        letterSpacing: -0.8,
      },
    });
  }, []);

  return (
    <Container>
      <ProgressSection>
      </ProgressSection>
      <View style={{ flex: 1 }}>
        <WebView
          ref={webviewRef}
          source={{ uri: 'https://deep-hortensia-87c.notion.site/01-21b491ee8865420483acec873c30ddd9?pvs=4' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          mixedContentMode="always"
        />

      </View>
      <ButtonSection>
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
          }}>
          <Button
            width={width}
            active={agreeCert}
            onPress={() => {

              dispatch(
                setCert({
                  agreeAge,
                  agreePrivacy,
                  agreeMarketing,
                  agreeLocation,
                  agreeCert: true,
                }),
              );
              // 채팅방으로 이동
              navigation.goBack({ tokens: props?.route?.params?.tokens ? props?.route?.params?.tokens : null, id: props?.route?.params?.id ? props?.route?.params?.id : null, password: props?.route?.params?.password ? props?.route?.params?.password : null });

            }
              // 동의하기 버튼 클릭 시 redux에 저장
            }>
            <ButtonText active={activeButton || agreeCert}>{'동의하기'}</ButtonText>
          </Button>
        </DropShadow>
      </ButtonSection>
    </Container>
  );
};

export default Cert2;
