import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const pinnaclePotential = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    position: 'absolute',
    top: '10px',
    left: '290px',
    fontSize: '7px',
    width: '240px',
  },
  wrap: {
    position: 'relative',
  },
  circle: {
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '12px',
    top: '17px',
  },

  reaction: {
    left: '53px',
  },
  synthesis: {
    left: '137px',
  },
  gift: {
    left: '215px',
  },
});

export default function PinnaclePotential({ consultant }: { consultant: Person }) {
  return (
    <View style={pinnaclePotential.container}>
      <View style={pinnaclePotential.wrap}>
        <View style={[pinnaclePotential.circle, pinnaclePotential.reaction]}>
          <Text>
            {consultant.calcReaction()}
            {consultant.calcReactionISK()}
            *
          </Text>
        </View>
        <View style={[pinnaclePotential.circle, pinnaclePotential.synthesis]}>
          <Text>
            {consultant.calcSynthesis()}
            {consultant.calcSynthesisISK()}
          </Text>
        </View>
        <View style={[pinnaclePotential.circle, pinnaclePotential.gift]}>
          <Text>
            {consultant.calcGift()}
            {consultant.calcGiftISK()}
          </Text>
        </View>
      </View>
    </View>
  );
}
