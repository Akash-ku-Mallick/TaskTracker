import React, { useState } from 'react';
import {View, Text, SafeAreaView, TextInput, Button, Pressable, Alert} from 'react-native';
import {Styles, Custum_colors} from '../Styles';

const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function Signup () {
            console.log(`email: ${email}`);
    }

    function SigneIn () {
            console.log(`password: ${password}`);
    }

    function GoogleAuth ()  {
            console.log('Lond');
    }

    return (
        <SafeAreaView>
            <View>
                <View style={Styles.Container}>
                    
                    <View style={Styles.SubContainer}>
                    <View>
                        <TextInput
                        style={Styles.Input} 
                        placeholder="Email" 
                        placeholderTextColor= {Custum_colors.OlivShade.lightest}
                        name="email"
                         onChangeText={(text)=>{setEmail(text)}} />
                        <TextInput
                        style={Styles.Input}
                        placeholderTextColor= {Custum_colors.OlivShade.lightest}
                        name="password"
                        placeholder="Password" 
                        secureTextEntry={true}
                        onChangeText={(text)=>{setPassword(text)}}/>
                        <View style={{flexDirection: 'row'}}>
                        <Pressable 
                        style={[Styles.Button , {width: 150}]}
                        onPress={() => {SigneIn()}}>
                            <Text style={Styles.BtnText}>Sign in</Text>
                        </Pressable>
                        <Pressable 
                        style={[Styles.Button , {width: 150}]}
                        onPress={() => {Signup()}}>
                            <Text style={Styles.BtnText}>Sign up</Text>
                        </Pressable>
                        </View>
                    </View>
                    <View>
                        <Text
                        selectable={false}
                        style={Styles.Text}
                        >----Or----</Text>
                        <Pressable
                        style={[Styles.Button , {width: 320}]}
                         onPress={() => {GoogleAuth()}}>
                            <Text style={Styles.BtnText}>Continue with Google</Text>
                        </Pressable>
                    </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default AuthScreen;
