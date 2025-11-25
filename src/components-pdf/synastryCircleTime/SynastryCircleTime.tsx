import Synastry, { SplittedDate } from '@/resources/Synastry';
import Universal from '@/resources/Universal';
import {
  Image, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import bgBlue from '../assets/backBlue.png';
import bgRed from '../assets/bgRed.png';
import borderRed from '../assets/brRed3.png';

export const synastryCircle = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  img: {
    width: '143px',
    height: '90px',
    position: 'absolute',
  },
  pos1: {
    top: '338px',
    left: '95px',
  },
  pos2: {
    top: '385px',
    left: '134px',
  },
  rotatePos2: {
    transform: 'rotate(-30)',
  },
  pos3: {
    top: '408px',
    left: '190px',
  },
  rotatePos3: {
    transform: 'rotate(-60)',
  },
  pos4: {
    top: '400px',
    left: '250px',
  },
  rotatePos4: {
    transform: 'rotate(-90)',
  },
  pos5: {
    top: '361px',
    left: '297px',
  },
  rotatePos5: {
    transform: 'rotate(-120)',
  },
  pos6: {
    top: '306px',
    left: '318px',
  },
  rotatePos6: {
    transform: 'rotate(-150)',
  },
  pos7: {
    top: '247px',
    left: '312px',
  },
  rotatePos7: {
    transform: 'rotate(-180)',
  },
  pos8: {
    top: '199px',
    left: '274px',
  },
  rotatePos8: {
    transform: 'rotate(150)',
  },
  pos9: {
    top: '176px',
    left: '218px',
  },
  rotatePos9: {
    transform: 'rotate(120)',
  },
  pos10: {
    top: '184px',
    left: '159px',
  },
  rotatePos10: {
    transform: 'rotate(90)',
  },
  pos11: {
    top: '221px',
    left: '111px',
  },
  rotatePos11: {
    transform: 'rotate(60)',
  },
  pos12: {
    top: '277px',
    left: '88px',
  },
  rotatePos12: {
    transform: 'rotate(30)',
  },
  year: {
    fontSize: '42px',
    color: '#fff',
    width: 50,
    height: 55,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleFont: {
    fontSize: '14px',
    position: 'absolute',
  },
  w30: {
    width: '40px',
  },

});

export default function SynastryCircleTime({ synastry, date, universalCalcs }: { synastry: Synastry, date: SplittedDate, universalCalcs: Universal }) {
  const currentYear = date.year;
  const currentMonth = date.month;
  const u = universalCalcs;
  return (
    <View style={synastryCircle.container}>

      <View style={[synastryCircle.year, { top: 314, left: 250 }]}>
        <Text>{synastry.calcPersonalYear(currentYear)}</Text>
      </View>
      <Text style={[synastryCircle.circleFont, { top: 339, left: 105 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 1 })}
        {synastry.calcSelectPersonalWeekISK(1, date)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 359, left: 110 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 1 })}
        {synastry.calcSelectPersonalWeekISK(2, date)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 379, left: 115 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 1 })}
        {synastry.calcSelectPersonalWeekISK(3, date)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 399, left: 120 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 1 })}
        {synastry.calcSelectPersonalWeekISK(4, date)}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 424, left: 135 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 2 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 2 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 439, left: 150 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 2 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 2 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 454, left: 165 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 2 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 2 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 469, left: 180 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 2 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 2 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 479, left: 200 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 3 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 3 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 489, left: 220 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 3 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 3 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 494, left: 240 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 3 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 3 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 499, left: 260 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 3 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 3 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 499, left: 285 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 4 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 4 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 494, left: 305 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 4 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 4 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 489, left: 325 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 4 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 4 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 484, left: 345 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 4 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 4 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 469, left: 365 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 5 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 5 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 454, left: 380 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 5 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 5 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 439, left: 395 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 5 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 5 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 424, left: 410 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 5 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 5 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 404, left: 420 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 6 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 6 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 384, left: 430 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 6 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 6 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 359, left: 435 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 6 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 6 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 339, left: 440 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 6 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 6 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 319, left: 440 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 7 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 7 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 299, left: 430 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 7 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 7 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 274, left: 430 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 7 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 7 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 254, left: 425 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 7 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 7 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 234, left: 410 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 8 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 8 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 219, left: 395 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 8 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 8 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 204, left: 380 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 8 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 8 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 189, left: 365 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 8 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 8 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 179, left: 345 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 9 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 9 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 169, left: 325 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 9 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 9 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 164, left: 305 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 9 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 9 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 164, left: 280 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 9 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 9 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 164, left: 260 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 10 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 10 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 164, left: 240 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 10 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 10 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 169, left: 220 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 10 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 10 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 179, left: 200 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 10 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 10 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 189, left: 175 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 11 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 11 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 204, left: 165 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 11 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 11 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 219, left: 150 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 11 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 11 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 239, left: 135 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 11 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 11 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 254, left: 125 }]}>
        {synastry.calcSelectPersonalWeek(1, { ...date, month: 12 })}
        {synastry.calcSelectPersonalWeekISK(1, { ...date, month: 12 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 279, left: 115 }]}>
        {synastry.calcSelectPersonalWeek(2, { ...date, month: 12 })}
        {synastry.calcSelectPersonalWeekISK(2, { ...date, month: 12 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 299, left: 110 }]}>
        {synastry.calcSelectPersonalWeek(3, { ...date, month: 12 })}
        {synastry.calcSelectPersonalWeekISK(3, { ...date, month: 12 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 319, left: 105 }]}>
        {synastry.calcSelectPersonalWeek(4, { ...date, month: 12 })}
        {synastry.calcSelectPersonalWeekISK(4, { ...date, month: 12 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 354, left: 155 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 1 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 1 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 1 })}
        {u.calcUniversalMonthISK({ ...date, month: 1 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 404, left: 180 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 2 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 2 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 2 })}
        {u.calcUniversalMonthISK({ ...date, month: 2 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 434, left: 225 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 3 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 3 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 3 })}
        {u.calcUniversalMonthISK({ ...date, month: 3 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 434, left: 290 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 4 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 4 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 4 })}
        {u.calcUniversalMonthISK({ ...date, month: 4 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 404, left: 340 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 5 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 5 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 5 })}
        {u.calcUniversalMonthISK({ ...date, month: 5 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 354, left: 375 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 6 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 6 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 6 })}
        {u.calcUniversalMonthISK({ ...date, month: 6 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 299, left: 375 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 7 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 7 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 7 })}
        {u.calcUniversalMonthISK({ ...date, month: 7 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 244, left: 340 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 8 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 8 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 8 })}
        {u.calcUniversalMonthISK({ ...date, month: 8 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 209, left: 295 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 9 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 9 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 9 })}
        {u.calcUniversalMonthISK({ ...date, month: 9 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 209, left: 235 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 10 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 10 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 10 })}
        {u.calcUniversalMonthISK({ ...date, month: 10 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 244, left: 175 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 11 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 11 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 11 })}
        {u.calcUniversalMonthISK({ ...date, month: 11 })}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 299, left: 155 }, synastryCircle.w30]}>
        {synastry.calcPersonalMonth({ ...date, month: 12 })}
        {synastry.calcPersonalMonthISK({ ...date, month: 12 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 12 })}
        {u.calcUniversalMonthISK({ ...date, month: 12 })}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 344, left: 215 }]}>
        {synastry.getQuarterMonth(1, date.year)}
        {synastry.getQuarterMonthISK(1, date.year)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 369, left: 230 }]}>
        {synastry.getQuarterMonth(2, date.year)}
        {synastry.getQuarterMonthISK(2, date.year)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 384, left: 255 }]}>
        {synastry.getQuarterMonth(3, date.year)}
        {synastry.getQuarterMonthISK(3, date.year)}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 384, left: 285 }]}>
        {synastry.getQuarterMonth(4, date.year)}
        {synastry.getQuarterMonthISK(4, date.year)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 369, left: 310 }]}>
        {synastry.getQuarterMonth(5, date.year)}
        {synastry.getQuarterMonthISK(5, date.year)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 344, left: 325 }]}>
        {synastry.getQuarterMonth(6, date.year)}
        {synastry.getQuarterMonthISK(6, date.year)}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 314, left: 325 }]}>
        {synastry.getQuarterMonth(7, date.year)}
        {synastry.getQuarterMonthISK(7, date.year)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 289, left: 310 }]}>
        {synastry.getQuarterMonth(8, date.year)}
        {synastry.getQuarterMonthISK(8, date.year)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 274, left: 285 }]}>
        {synastry.getQuarterMonth(9, date.year)}
        {synastry.getQuarterMonthISK(9, date.year)}
      </Text>

      <Text style={[synastryCircle.circleFont, { top: 274, left: 255 }]}>
        {synastry.getQuarterMonth(10, date.year)}
        {synastry.getQuarterMonthISK(10, date.year)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 289, left: 230 }]}>
        {synastry.getQuarterMonth(11, date.year)}
        {synastry.getQuarterMonthISK(11, date.year)}
      </Text>
      <Text style={[synastryCircle.circleFont, { top: 314, left: 215 }]}>
        {synastry.getQuarterMonth(12, date.year)}
        {synastry.getQuarterMonthISK(12, date.year)}
      </Text>

      {currentMonth !== 1 && currentMonth > 1 ? <Image style={[synastryCircle.img, synastryCircle.pos1]} src={bgBlue} /> : ''}
      {currentMonth !== 2 && currentMonth > 2 ? <Image style={[synastryCircle.img, synastryCircle.pos2, synastryCircle.rotatePos2]} src={bgBlue} /> : ''}
      {currentMonth !== 3 && currentMonth > 3 ? <Image style={[synastryCircle.img, synastryCircle.pos3, synastryCircle.rotatePos3]} src={bgBlue} /> : ''}
      {currentMonth !== 4 && currentMonth > 4 ? <Image style={[synastryCircle.img, synastryCircle.pos4, synastryCircle.rotatePos4]} src={bgBlue} /> : ''}
      {currentMonth !== 5 && currentMonth > 5 ? <Image style={[synastryCircle.img, synastryCircle.pos5, synastryCircle.rotatePos5]} src={bgBlue} /> : ''}
      {currentMonth !== 6 && currentMonth > 6 ? <Image style={[synastryCircle.img, synastryCircle.pos6, synastryCircle.rotatePos6]} src={bgBlue} /> : ''}
      {currentMonth !== 7 && currentMonth > 7 ? <Image style={[synastryCircle.img, synastryCircle.pos7, synastryCircle.rotatePos7]} src={bgBlue} /> : ''}
      {currentMonth !== 8 && currentMonth > 8 ? <Image style={[synastryCircle.img, synastryCircle.pos8, synastryCircle.rotatePos8]} src={bgBlue} /> : ''}
      {currentMonth !== 9 && currentMonth > 9 ? <Image style={[synastryCircle.img, synastryCircle.pos9, synastryCircle.rotatePos9]} src={bgBlue} /> : ''}
      {currentMonth !== 10 && currentMonth > 10 ? <Image style={[synastryCircle.img, synastryCircle.pos10, synastryCircle.rotatePos10]} src={bgBlue} /> : ''}
      {currentMonth !== 11 && currentMonth > 11 ? <Image style={[synastryCircle.img, synastryCircle.pos11, synastryCircle.rotatePos11]} src={bgBlue} /> : ''}
      {currentMonth !== 12 && currentMonth > 12 ? <Image style={[synastryCircle.img, synastryCircle.pos12, synastryCircle.rotatePos12]} src={bgBlue} /> : ''}

      {currentMonth === 1 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos1]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos1]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 2 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos2, synastryCircle.rotatePos2]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos2, synastryCircle.rotatePos2]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 3 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos3, synastryCircle.rotatePos3]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos3, synastryCircle.rotatePos3]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 4 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos4, synastryCircle.rotatePos4]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos4, synastryCircle.rotatePos4]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 5 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos5, synastryCircle.rotatePos5]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos5, synastryCircle.rotatePos5]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 6 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos6, synastryCircle.rotatePos6]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos6, synastryCircle.rotatePos6]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 7 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos7, synastryCircle.rotatePos7]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos7, synastryCircle.rotatePos7]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 8 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos8, synastryCircle.rotatePos8]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos8, synastryCircle.rotatePos8]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 9 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos9, synastryCircle.rotatePos9]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos9, synastryCircle.rotatePos9]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 10 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos10, synastryCircle.rotatePos10]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos10, synastryCircle.rotatePos10]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 11 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos11, synastryCircle.rotatePos11]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos11, synastryCircle.rotatePos11]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 12 ? (
        <>
          <Image style={[synastryCircle.img, synastryCircle.pos12, synastryCircle.rotatePos12]} src={bgRed} />
          <Image style={[synastryCircle.img, synastryCircle.pos12, synastryCircle.rotatePos12]} src={borderRed} />
        </>
      ) : ''}
    </View>
  );
}
