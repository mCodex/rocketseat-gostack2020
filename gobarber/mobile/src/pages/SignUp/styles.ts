import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../../colors';

export const Container = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
})`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${colors.black};
  flex-direction: row;
  border-top-width: 1px;
  border-color: #232129;
  padding: 20px 0;

  align-items: center;
  justify-content: center;
`;

export const BackToSignInButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
