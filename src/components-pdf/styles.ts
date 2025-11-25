import OpenSansBold from '@/assets/fonts/OpenSans/OpenSans-Bold.ttf';
import OpenSansBoldItalic from '@/assets/fonts/OpenSans/OpenSans-BoldItalic.ttf';
import OpenSansItalic from '@/assets/fonts/OpenSans/OpenSans-Italic.ttf';
import OpenSans from '@/assets/fonts/OpenSans/OpenSans-Regular.ttf';
import { Font, StyleSheet } from '@react-pdf/renderer';

export const exampleReport = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  text: {
    position: 'absolute',
    top: '300px',
    left: '90px',
    color: 'white',
    fontSize: 30,
    zIndex: 1,
  },
  pinaculo: {
    position: 'absolute',
    top: '300px',
    left: '90px',
    // gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' // Not supported in react-pdf
  },
});

// Register fonts
Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: OpenSans,
    },
    {
      src: OpenSansItalic,
      fontStyle: 'italic',
    },
    {
      src: OpenSansBold,
      fontWeight: 'bold',
    },
    {
      src: OpenSansBoldItalic,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  ],
});

export const configReport = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    width: '1000%',
  },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    // display: 'block', // Not supported in react-pdf
    height: '100%',
    width: '100%',
  },
  header: {
    color: '#000000',
    fontSize: '7px',
    fontFamily: 'Open Sans',
    width: '795px',
    height: '88px',
    position: 'relative',
  },
  header_consultor_name: {
    position: 'absolute',
    left: '148px',
    top: '34px',
    width: '155px',
  },
  header_consultant_name: {
    position: 'absolute',
    left: '148px',
    top: '64px',
    width: '155px',
  },
  header_date: {
    position: 'absolute',
    left: '400px',
    top: '34px',
    width: '100px',
  },
  header_birth_date: {
    position: 'absolute',
    left: '400px',
    top: '64px',
    width: '100px',
  },
  header_age: {
    position: 'absolute',
    left: '520px',
    top: '64px',
    width: '50px',
  },
  header_logo: {
    position: 'absolute',
    left: '650px',
    top: '20px',
    width: '100px',
    height: '50px',
  },
  img_logo: {
    width: '100px',
    height: '50px',
  },
  sidebar: {
    position: 'absolute',
    right: '0px',
    top: '0px',
    width: '50px',
    height: '100%',
    backgroundColor: '#f0f0f0',
    padding: '10px 5px',
  },
  page_number: {
    fontSize: '8px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  page_copy_1: {
    fontSize: '6px',
    textAlign: 'center',
    marginBottom: '10px',
    transform: 'rotate(90deg)',
  },
  page_copy_2: {
    fontSize: '6px',
    textAlign: 'center',
    marginBottom: '10px',
    transform: 'rotate(90deg)',
  },
  page_copy_3: {
    fontSize: '6px',
    textAlign: 'center',
    marginBottom: '10px',
    transform: 'rotate(90deg)',
  },
  page_copy_4: {
    fontSize: '6px',
    textAlign: 'center',
    marginBottom: '10px',
    transform: 'rotate(90deg)',
  },
  page_copy_5: {
    fontSize: '6px',
    textAlign: 'center',
    marginBottom: '10px',
    transform: 'rotate(90deg)',
  },
  content: {
    position: 'relative',
    padding: '100px 20px 20px 20px',
    minHeight: '700px',
  },
});

// Additional style sets for different components
export const annualReturnStyles = StyleSheet.create({
  return_year: {
    position: 'absolute',
    width: '25px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    top: '15px',
    left: '16px',
  },
  return_age: {
    position: 'absolute',
    width: '48px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    top: '15px',
    left: '69px',
  },
  circle: {
    position: 'absolute',
    width: '18px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  return_top: {
    top: '47px',
    left: '50px',
  },
  return_sl_left: {
    top: '68px',
    left: '26px',
  },
  return_sl_mid: {
    top: '68px',
    left: '50px',
  },
  return_sl_rig: {
    top: '68px',
    left: '74px',
  },
  return_tl_left: {
    top: '90px',
    left: '10px',
  },
  return_tl_mid: {
    top: '90px',
    left: '34px',
  },
  return_tl_rig: {
    top: '90px',
    left: '58px',
  },
  return_bottom: {
    top: '112px',
    left: '34px',
  },
});

export const pinnacleStyles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '200px',
  },
  active: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: '#ff0000',
    borderRadius: '50%',
    zIndex: 4,
  },
  active_1: {
    top: '10px',
    left: '10px',
  },
  active_2: {
    top: '10px',
    left: '40px',
  },
  active_3: {
    top: '10px',
    left: '70px',
  },
  active_4: {
    top: '10px',
    left: '100px',
  },
  wrap: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },
  bridge_1: {
    position: 'relative',
    width: '120px',
    height: '150px',
  },
  bridge_2: {
    position: 'relative',
    width: '120px',
    height: '150px',
  },
  bridge_3: {
    position: 'relative',
    width: '120px',
    height: '150px',
  },
  circle: {
    position: 'absolute',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    border: '1px solid #000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    backgroundColor: '#fff',
  },
  bridgeTop: {
    top: '0px',
    left: '50px',
  },
  bridgeLeft: {
    top: '30px',
    left: '10px',
  },
  bridgeCenter: {
    top: '60px',
    left: '50px',
  },
  bridgeRight: {
    top: '30px',
    left: '90px',
  },
  bridgeBottom: {
    top: '90px',
    left: '50px',
  },
  returnStart: {
    position: 'absolute',
    bottom: '10px',
    left: '0px',
    fontSize: '8px',
    textAlign: 'center',
    width: '100%',
  },
  returnEnd: {
    position: 'absolute',
    bottom: '-10px',
    left: '0px',
    fontSize: '8px',
    textAlign: 'center',
    width: '100%',
  },
});

export default {
  configReport,
  annualReturnStyles,
  pinnacleStyles,
  exampleReport,
};
