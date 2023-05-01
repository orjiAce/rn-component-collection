import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../helpers/normalize";

import Colors from "../constants/Colors";

import PinInput from "../components/input/PinInput";


import {Entypo, Ionicons, Octicons} from "@expo/vector-icons";


import Animated, {Easing, FadeIn, FadeInDown, FadeOut, FadeOutDown, Layout} from 'react-native-reanimated';


const LockScreen = () => {


    const [pin, setPin] = useState('');


    const [pinNumber, setPinNumber] = useState([]);

    const [counter, setCounter] = React.useState(45);

    const addInputs = useCallback(async (number: string) => {

        setPinNumber(prevState => [...prevState, number])
        //  setCoinValue(number);
        // handleChange('pin')(number)

        setPin(number)

    }, [pinNumber])

//console.log(pinNumber.join('))

    const backSpace = useCallback(async () => {


        const array = Array.from(pinNumber)
        const index = array.indexOf(pinNumber)
        if (index !== 1) {
            array.splice(index, 1);
            setPinNumber(array);
        }
    }, [pinNumber])


    const renderNumber = useCallback(
        ({item}) => (
            <TouchableOpacity disabled={pinNumber.length === 6} style={[{
                backgroundColor: '#FBFBFB',
            }, styles.keys]} onPress={() => addInputs(item.value)}>
                <Text style={[{
                    color: '#333'
                },
                    styles.keyText]}>
                    {item.value}
                </Text>
            </TouchableOpacity>
        ), [pinNumber])


    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {

        setPin(pinNumber.join(''))
    }, [pinNumber]);

    /*
        useEffect(() => {
            if (pinNumber.length === 4) {


                setPinNumber([])


            }


        }, [pinNumber]);
    */


    return (
        <>


            <SafeAreaView style={styles.safeArea}>

                {/* <ActivityIndicator color={Colors.primary} size={"small"} style={[StyleSheet.absoluteFill,{

               }]}/>*/}


                <View style={styles.profileDetails}>

                    <View style={styles.welcomeBack}>
                        <Text style={styles.welcomeBackTxt}>
                            Enter OTP
                        </Text>
                    </View>

                    <View style={styles.welcomeBack}>
                        <Text style={{
                            //   fontFamily: Fonts.clarityRegular,
                            fontSize: fontPixel(14),
                            color: Colors.tintText
                        }}>
                            Enter your account pin to proceed
                        </Text>
                    </View>
                </View>

                <View style={styles.pinWrap}>

                    {/*    <Octicons name="dot-fill" size={heightPixel(35)} style={{*/}
                    {/*    lineHeight: heightPixel(30)*/}
                    {/*}} color={Colors.primary}/>*/}
                    <PinInput value={pin}
                              codeLength={6} cellSize={40} cellSpacing={33}

                              password={true}
                              mask={
                                  <Animated.View key={pin} layout={Layout.easing(Easing.bounce).delay(50)}
                                                 entering={FadeIn} exiting={FadeOut} style={{
                                      width: 18, height: 18, backgroundColor: Colors.primary,
                                      borderRadius: 25
                                  }}>
                                  </Animated.View>
                              }
                              autoFocus={false}
                              cellStyle={[styles.cellStyle, {
                                  backgroundColor: "#D1D5DB",
                              }]}

                              textStyle={{
                                  justifyContent: 'center',
                                  alignItems: 'center',

                              }}
                              keyboardType={'numeric'}
                              editable={false}
                              onTextChange={(text) => {
                                  setPin(text)
                              }}

                              restrictToNumbers={false}/>


                </View>

                <View style={styles.resendOTP}>
                    <Text>
                        Resend OTP in {counter}
                    </Text>
                </View>


                <View style={styles.VirtualKeyboard}>
                    <FlatList scrollEnabled={false} contentContainerStyle={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }} data={KeyboardNumber} renderItem={renderNumber}
                              keyExtractor={item => item.id}
                              numColumns={3}
                    />
                    <View style={styles.bottomKeyboard}>

                        <TouchableOpacity style={[{
                            backgroundColor: '#fff',
                        }, styles.keys]}>

                        </TouchableOpacity>

                        <TouchableOpacity disabled={pinNumber.length === 4} style={[{
                            backgroundColor: '#FBFBFB',
                        }, styles.keys]} onPress={() => addInputs('0')}>
                            <Text style={[{
                                color: '#333'
                            },
                                styles.keyText]}>

                                0
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity disabled={pinNumber.length < 1} style={[{
                            backgroundColor: '#FBFBFB',
                        }, styles.keys]} onPress={backSpace}>
                            <Octicons name="trash" size={24} color={Colors.textDark}/>


                        </TouchableOpacity>


                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.7}
                                  style={[styles.button, {
                                      backgroundColor: Colors.primary
                                  }]}>


                    <Text style={styles.btnText}>
                        Continue
                    </Text>


                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};


const KeyboardNumber = [
    {
        id: '1',
        value: '1'
    }, {
        id: '2',
        value: '2'
    }, {
        id: '3',
        value: '3'
    }, {
        id: '4',
        value: '4'
    }, {
        id: '5',
        value: '5'
    }, {
        id: '6',
        value: '6'
    }, {
        id: '7',
        value: '7'
    }, {
        id: '8',
        value: '8'
    }, {
        id: '9',
        value: '9'
    },
]


const styles = StyleSheet.create({
    safeArea: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 20,
    },

    profileDetails: {
        marginTop: 30,
        height: heightPixel(250),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        //backgroundColor:"#f9f9f9"
    },
    welcomeBack: {
        height: heightPixel(80),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeBackTxt: {
        fontSize: fontPixel(28),
        //fontFamily: Fonts.clarityBold,
        color: Colors.textDark
    },
    profileName: {
        height: heightPixel(30),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileNameTxt: {
        fontSize: fontPixel(18),
        // fontFamily: Fonts.clarityMedium,
        color: Colors.textDark
    },
    profileImage: {
        width: widthPixel(90),
        height: heightPixel(90),
        backgroundColor: "#E6E9EB",
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Avatar: {
        borderRadius: 100,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    VirtualKeyboard: {
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        bottom: 0,
        //minHeight: heightPixel(320),
        alignItems: 'center',
        justifyContent: 'center'
    },

    keyText: {
        //   fontFamily: Fonts.claritySemiBold,
        fontSize: fontPixel(16),
    },

    keys: {
        borderRadius: 6,
        width: '30%',
        height: heightPixel(55),
        marginVertical: 10,
        marginHorizontal: pixelSizeHorizontal(5),
        alignItems: 'center',
        justifyContent: 'center',

    },
    keysFaceID: {

        width: 55,
        height: 55,
        borderRadius: 35,
        marginVertical: 10,
        marginHorizontal: pixelSizeHorizontal(5),
        alignItems: 'center',
        justifyContent: 'center',

    },
    bottomKeyboard: {
        width: '100%',
        height: heightPixel(80),
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: "space-between"
    },

    pinWrap: {
        width: '100%',
        height: heightPixel(120),
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    cellStyle: {
        borderRadius: 25,
        height: heightPixel(20),
        width: widthPixel(20),
        alignItems: 'center',
        justifyContent: 'center',

    },
    errorMessage: {
        right: 0,
        lineHeight: 15,
        fontSize: fontPixel(14),
        color: Colors.errorRed,
        textTransform: 'capitalize',
        // fontFamily: Fonts.clarityBold,
    },
    loader: {
        width: '100%',

        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    resendOTP: {
        width: '100%',
        alignItems: 'center',
        height: heightPixel(50),
        justifyContent: 'center'
    },
    button: {
        marginTop: 25,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

        height: heightPixel(55),
        paddingVertical: 16,


    },
    btnText: {
        color: 'white',
        fontSize: fontPixel(18),


    },


});

export default LockScreen;
