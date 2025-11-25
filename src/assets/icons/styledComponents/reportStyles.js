import {StyleSheet} from '@react-pdf/renderer';

export const reportConfig = StyleSheet.create({
    page:{
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section:{
        margin: 10,
        padding: 10,
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
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
})

export const pinaculoStyle = StyleSheet.create({
    pinaculo:{
        position: 'relative',
        width: '330px',
        height: '480px',
        margin: '0 auto',
        borderWidth: 1,
        borderColor: 'red'
    },
    letter:{
        width: '30px',
        height: '30px',
        paddingTop: '5px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #000',
        // borderRadius: '50%',
        position: 'absolute',
    },
    A:{
        top: '163px',
        left: '21px',
    },
    B: {
        top: '163px',
        left: '112px',
    },
    C:{
        top: '163px',
        left: '202px',
    },
    D:{
        top: '163px',
        left: '292px',
    },
    E:{
        top: '112px',
        left: '67px',
    },
    I:{
        top: '109px',
        left: '111px',
    },
    F:{
        top: '112px',
        left: '156px',
    },
    G:{
        top: '57px',
        left: '111px',
    },
    H:{
        top: '4px',
        left: '111px',
    },
    J:{
        top: '89px',
        left: '229px',
    },
    O:{
        top: '225px',
        left: '111px',
    },
    K:{
        top: '225px',
        left: '66px',
    },
    L:{
        top: '225px',
        left: '158px',
    },
    M:{
        top: '271px',
        left: '111px',
    },
    N:{
        top: '320px',
        left: '111px',
    },
    R:{
        top: '370px',
        left: '111px',
    },
    Q:{
        top: '370px',
        left: '65px',
    },
    S:{
        top: '370px',
        left: '158px',
    },
    P:{
        top: '320px',
        left: '35px',
    },
    W:{
      top: '271px',
      left: '4px',
    },
    ausensias: {
        top: '320px',
        left: '198px',
        width: '90px'
    },
    reaccion: {
        top: '4px',
        left: '292px',
    },
    sintesis: {
        top: '69px',
        left: '292px',
        
    },
    regalo: {
        top: '109px',
        left: '292px',
    },
});
export const bridgeStyle = StyleSheet.create({
    puente:{
        position: 'relative',
        width: '130px',
        height: '120px',
        margin: '0 auto',
        borderWidth: 1,
        borderColor: 'red',
        display: 'grid',
        gridTemplateRows: '50px 50px 50px 50px 50px' 
    },
    letter:{
        width: '30px',
        height: '30px',
        paddingTop: '5px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #000',
        // borderRadius: '50%',
        position: 'absolute',
    },
    et:{
        top: '4px',
        left: '50px'
    },
    el:{
        top: '44px',
        left: '10px'
    },
    ec:{
        top: '44px',
        left: '50px'
    },
    er:{
        top: '44px',
        left: '90px'
    },
    eb:{
        top: '84px',
        left: '50px'
    },
    ed:{
        top: '4px',
        left: '90px'
    },
    ey:{
        top: '84px',
        left: '10px',
        borderWidth: 0
    },

})