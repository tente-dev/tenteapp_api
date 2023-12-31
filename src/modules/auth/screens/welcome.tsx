import {
  Button,
  Icon,
  ScrollView,
  StatusBar,
  Text,
  VStack,
  View,
} from 'native-base'
import React, { Fragment } from 'react'
import { BACKGROUND_COLORS, TEXT_COLORS } from '@styles'
import { ImageBackground } from 'react-native'
import { IMAGES } from '@images'
import { FeaturesSlider } from '@shared-components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigationActions } from '@navigation'

export const Welcome = () => {
  const { navigateToLogin, navigateToMaps } = useNavigationActions()
  return (
    <Fragment>
      <StatusBar backgroundColor={BACKGROUND_COLORS.lightGreen} />
      <View bgColor={BACKGROUND_COLORS.lightGreen} flex={1}>
        <ImageBackground
          source={IMAGES.welcome_bg}
          style={{ flex: 1 }}
          imageStyle={{ height: '20%', marginVertical: 15 }}
          resizeMode="contain">
          <ScrollView _contentContainerStyle={{ flexGrow: 1 }} py={34}>
            <Text
              fontSize={'3xl'}
              fontWeight={'900'}
              textAlign={'center'}
              px={'7.5%'}>
              {'Bienvenid@ a Tente'}
            </Text>
            <Text
              fontSize={'sm'}
              fontWeight={'600'}
              textAlign={'center'}
              px={'7.5%'}>
              {'Conecta con el cambio'}
            </Text>
            <View flexGrow={1} justifyContent={'center'}>
              <FeaturesSlider />
            </View>
            <VStack space={3} px="7.5%">
              <Button
                rightIcon={
                  <Icon
                    size={22}
                    as={MaterialCommunityIcons}
                    name="chevron-right"
                  />
                }
                _text={{ paddingLeft: 4 }}
                onPress={navigateToLogin}>
                {'Empezar'}
              </Button>
              <Button
                variant={'outline'}
                borderColor={TEXT_COLORS.primary}
                _text={{ color: TEXT_COLORS.primary }}
                onPress={navigateToMaps}>
                {'Explorar tiendas a mi alrededor'}
              </Button>
            </VStack>
          </ScrollView>
        </ImageBackground>
      </View>
    </Fragment>
  )
}
