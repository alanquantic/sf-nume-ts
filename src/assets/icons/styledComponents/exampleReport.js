import {StyleSheet} from '@react-pdf/renderer';

export const exampleRreport = StyleSheet.create({
    page:{
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section:{
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    pageBackground:{
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        height: '100%',
        width: '100%',
        zIndex:2,
    },
    text:{
        position: 'absolute',
        top:'300px',
        left:'90px',
        display:'block',
        color:'white',
        fontSize:30,
        zIndex:1,
    },
    pinaculo:{
        position: 'absolute',
        top:'300px',
        left:'90px',
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))'
    }
});