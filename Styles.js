import React from 'react';
import {View, StyleSheet} from 'react-native';


const Custum_colors = {
    prim: '#000000',
    prpl: '#451952',
    bgnd: '#662549',
    gairik: "#AE445A",
    mustered: "#F39F5A",
    OlivShade: {
        darkest: "#040D12",
        dark: "#183D3D",
        light: "#5C8374",
        lightest: "#93B1A6",
    }
}

const Custum_styles = {
    brdrRadius: 10,
}

const Styles = StyleSheet.create({

    Container: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        
    },
    Button: {
        backgroundColor: Custum_colors.OlivShade.dark,
        padding: 10,
        borderRadius: Custum_styles.brdrRadius,
        margin: 10,
        color: 'white',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        
    },
    BtnText: {
        color: 'white',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    Input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        backgroundColor: Custum_colors.OlivShade.dark,
        borderRadius: Custum_styles.brdrRadius,
        fontSize: 16.5,
        paddingLeft: 10,
        color: Custum_colors.OlivShade.lightest,
        padding: 10,

    },
    Text: {
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    SubContainer: {
        backgroundColor: Custum_colors.OlivShade.lightest,
        borderRadius: Custum_styles.brdrRadius,
        padding: 10,
    },
    Header: {
        backgroundColor: Custum_colors.OlivShade.dark,
        height: '8%',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

})

export {Styles, Custum_colors};
