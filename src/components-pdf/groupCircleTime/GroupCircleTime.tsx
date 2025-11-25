import Group, { SplittedDate } from '@/resources/Group';
import Universal from '@/resources/Universal';
import {
  Image, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import bgBlue from '../assets/backBlue.png';
import bgRed from '../assets/bgRed.png';
import borderRed from '../assets/brRed3.png';

export const groupCircle = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  img: {
    width: '143px',
    height: '90px',
    position: 'absolute',
  },
  pos1: {
    top: '478px',
    left: '95px',
  },
  pos2: {
    top: '525px',
    left: '134px',
  },
  rotatePos2: {
    transform: 'rotate(-30)',
  },
  pos3: {
    top: '548px',
    left: '190px',
  },
  rotatePos3: {
    transform: 'rotate(-60)',
  },
  pos4: {
    top: '540px',
    left: '250px',
  },
  rotatePos4: {
    transform: 'rotate(-90)',
  },
  pos5: {
    top: '501px',
    left: '297px',
  },
  rotatePos5: {
    transform: 'rotate(-120)',
  },
  pos6: {
    top: '446px',
    left: '318px',
  },
  rotatePos6: {
    transform: 'rotate(-150)',
  },
  pos7: {
    top: '387px',
    left: '312px',
  },
  rotatePos7: {
    transform: 'rotate(-180)',
  },
  pos8: {
    top: '339px',
    left: '274px',
  },
  rotatePos8: {
    transform: 'rotate(150)',
  },
  pos9: {
    top: '316px',
    left: '218px',
  },
  rotatePos9: {
    transform: 'rotate(120)',
  },
  pos10: {
    top: '324px',
    left: '159px',
  },
  rotatePos10: {
    transform: 'rotate(90)',
  },
  pos11: {
    top: '361px',
    left: '111px',
  },
  rotatePos11: {
    transform: 'rotate(60)',
  },
  pos12: {
    top: '417px',
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

export default function GroupCircleTime({ groupConsult, date, universalCalcs }: { groupConsult: Group, date: SplittedDate, universalCalcs: Universal }) {
  const currentYear = date.year;
  const currentMonth = date.month;
  const u = universalCalcs;
  return (
    <View style={groupCircle.container}>

      <View style={[groupCircle.year, { top: 454, left: 250 }]}>
        <Text>{groupConsult.calcPersonalYear(currentYear)}</Text>
      </View>
      <Text style={[groupCircle.circleFont, { top: 479, left: 105 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 1 })}
        {groupConsult.calcSelectPersonalWeekISK(1, date)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 499, left: 110 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 1 })}
        {groupConsult.calcSelectPersonalWeekISK(2, date)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 519, left: 115 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 1 })}
        {groupConsult.calcSelectPersonalWeekISK(3, date)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 539, left: 120 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 1 })}
        {groupConsult.calcSelectPersonalWeekISK(4, date)}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 564, left: 135 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 2 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 2 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 579, left: 150 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 2 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 2 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 594, left: 165 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 2 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 2 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 609, left: 180 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 2 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 2 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 619, left: 200 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 3 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 3 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 629, left: 220 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 3 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 3 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 634, left: 240 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 3 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 3 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 639, left: 260 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 3 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 3 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 639, left: 285 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 4 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 4 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 634, left: 305 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 4 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 4 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 629, left: 325 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 4 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 4 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 624, left: 345 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 4 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 4 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 609, left: 365 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 5 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 5 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 594, left: 380 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 5 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 5 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 579, left: 395 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 5 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 5 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 564, left: 410 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 5 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 5 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 544, left: 420 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 6 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 6 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 524, left: 430 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 6 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 6 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 499, left: 435 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 6 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 6 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 479, left: 440 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 6 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 6 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 459, left: 440 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 7 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 7 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 439, left: 430 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 7 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 7 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 414, left: 430 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 7 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 7 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 394, left: 425 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 7 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 7 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 374, left: 410 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 8 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 8 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 359, left: 395 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 8 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 8 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 344, left: 380 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 8 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 8 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 329, left: 365 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 8 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 8 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 319, left: 345 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 9 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 9 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 309, left: 325 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 9 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 9 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 304, left: 305 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 9 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 9 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 304, left: 280 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 9 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 9 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 304, left: 260 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 10 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 10 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 304, left: 240 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 10 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 10 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 309, left: 220 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 10 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 10 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 319, left: 200 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 10 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 10 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 329, left: 175 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 11 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 11 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 344, left: 165 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 11 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 11 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 359, left: 150 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 11 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 11 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 379, left: 135 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 11 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 11 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 394, left: 125 }]}>
        {groupConsult.calcSelectPersonalWeek(1, { ...date, month: 12 })}
        {groupConsult.calcSelectPersonalWeekISK(1, { ...date, month: 12 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 419, left: 115 }]}>
        {groupConsult.calcSelectPersonalWeek(2, { ...date, month: 12 })}
        {groupConsult.calcSelectPersonalWeekISK(2, { ...date, month: 12 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 439, left: 110 }]}>
        {groupConsult.calcSelectPersonalWeek(3, { ...date, month: 12 })}
        {groupConsult.calcSelectPersonalWeekISK(3, { ...date, month: 12 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 459, left: 105 }]}>
        {groupConsult.calcSelectPersonalWeek(4, { ...date, month: 12 })}
        {groupConsult.calcSelectPersonalWeekISK(4, { ...date, month: 12 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 494, left: 155 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 1 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 1 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 1 })}
        {u.calcUniversalMonthISK({ ...date, month: 1 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 544, left: 180 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 2 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 2 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 2 })}
        {u.calcUniversalMonthISK({ ...date, month: 2 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 574, left: 225 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 3 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 3 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 3 })}
        {u.calcUniversalMonthISK({ ...date, month: 3 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 574, left: 290 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 4 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 4 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 4 })}
        {u.calcUniversalMonthISK({ ...date, month: 4 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 544, left: 340 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 5 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 5 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 5 })}
        {u.calcUniversalMonthISK({ ...date, month: 5 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 494, left: 375 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 6 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 6 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 6 })}
        {u.calcUniversalMonthISK({ ...date, month: 6 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 439, left: 375 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 7 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 7 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 7 })}
        {u.calcUniversalMonthISK({ ...date, month: 7 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 384, left: 340 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 8 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 8 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 8 })}
        {u.calcUniversalMonthISK({ ...date, month: 8 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 349, left: 295 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 9 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 9 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 9 })}
        {u.calcUniversalMonthISK({ ...date, month: 9 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 349, left: 235 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 10 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 10 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 10 })}
        {u.calcUniversalMonthISK({ ...date, month: 10 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 384, left: 175 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 11 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 11 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 11 })}
        {u.calcUniversalMonthISK({ ...date, month: 11 })}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 439, left: 155 }, groupCircle.w30]}>
        {groupConsult.calcPersonalMonth({ ...date, month: 12 })}
        {groupConsult.calcPersonalMonthISK({ ...date, month: 12 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 12 })}
        {u.calcUniversalMonthISK({ ...date, month: 12 })}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 484, left: 215 }]}>
        {groupConsult.getQuarterMonth(1, date.year)}
        {groupConsult.getQuarterMonthISK(1, date.year)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 509, left: 230 }]}>
        {groupConsult.getQuarterMonth(2, date.year)}
        {groupConsult.getQuarterMonthISK(2, date.year)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 524, left: 255 }]}>
        {groupConsult.getQuarterMonth(3, date.year)}
        {groupConsult.getQuarterMonthISK(3, date.year)}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 524, left: 285 }]}>
        {groupConsult.getQuarterMonth(4, date.year)}
        {groupConsult.getQuarterMonthISK(4, date.year)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 509, left: 310 }]}>
        {groupConsult.getQuarterMonth(5, date.year)}
        {groupConsult.getQuarterMonthISK(5, date.year)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 484, left: 325 }]}>
        {groupConsult.getQuarterMonth(6, date.year)}
        {groupConsult.getQuarterMonthISK(6, date.year)}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 454, left: 325 }]}>
        {groupConsult.getQuarterMonth(7, date.year)}
        {groupConsult.getQuarterMonthISK(7, date.year)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 429, left: 310 }]}>
        {groupConsult.getQuarterMonth(8, date.year)}
        {groupConsult.getQuarterMonthISK(8, date.year)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 414, left: 285 }]}>
        {groupConsult.getQuarterMonth(9, date.year)}
        {groupConsult.getQuarterMonthISK(9, date.year)}
      </Text>

      <Text style={[groupCircle.circleFont, { top: 414, left: 255 }]}>
        {groupConsult.getQuarterMonth(10, date.year)}
        {groupConsult.getQuarterMonthISK(10, date.year)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 429, left: 230 }]}>
        {groupConsult.getQuarterMonth(11, date.year)}
        {groupConsult.getQuarterMonthISK(11, date.year)}
      </Text>
      <Text style={[groupCircle.circleFont, { top: 454, left: 215 }]}>
        {groupConsult.getQuarterMonth(12, date.year)}
        {groupConsult.getQuarterMonthISK(12, date.year)}
      </Text>

      {currentMonth !== 1 && currentMonth > 1 ? <Image style={[groupCircle.img, groupCircle.pos1]} src={bgBlue} /> : ''}
      {currentMonth !== 2 && currentMonth > 2 ? <Image style={[groupCircle.img, groupCircle.pos2, groupCircle.rotatePos2]} src={bgBlue} /> : ''}
      {currentMonth !== 3 && currentMonth > 3 ? <Image style={[groupCircle.img, groupCircle.pos3, groupCircle.rotatePos3]} src={bgBlue} /> : ''}
      {currentMonth !== 4 && currentMonth > 4 ? <Image style={[groupCircle.img, groupCircle.pos4, groupCircle.rotatePos4]} src={bgBlue} /> : ''}
      {currentMonth !== 5 && currentMonth > 5 ? <Image style={[groupCircle.img, groupCircle.pos5, groupCircle.rotatePos5]} src={bgBlue} /> : ''}
      {currentMonth !== 6 && currentMonth > 6 ? <Image style={[groupCircle.img, groupCircle.pos6, groupCircle.rotatePos6]} src={bgBlue} /> : ''}
      {currentMonth !== 7 && currentMonth > 7 ? <Image style={[groupCircle.img, groupCircle.pos7, groupCircle.rotatePos7]} src={bgBlue} /> : ''}
      {currentMonth !== 8 && currentMonth > 8 ? <Image style={[groupCircle.img, groupCircle.pos8, groupCircle.rotatePos8]} src={bgBlue} /> : ''}
      {currentMonth !== 9 && currentMonth > 9 ? <Image style={[groupCircle.img, groupCircle.pos9, groupCircle.rotatePos9]} src={bgBlue} /> : ''}
      {currentMonth !== 10 && currentMonth > 10 ? <Image style={[groupCircle.img, groupCircle.pos10, groupCircle.rotatePos10]} src={bgBlue} /> : ''}
      {currentMonth !== 11 && currentMonth > 11 ? <Image style={[groupCircle.img, groupCircle.pos11, groupCircle.rotatePos11]} src={bgBlue} /> : ''}
      {currentMonth !== 12 && currentMonth > 12 ? <Image style={[groupCircle.img, groupCircle.pos12, groupCircle.rotatePos12]} src={bgBlue} /> : ''}

      {currentMonth === 1 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos1]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos1]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 2 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos2, groupCircle.rotatePos2]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos2, groupCircle.rotatePos2]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 3 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos3, groupCircle.rotatePos3]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos3, groupCircle.rotatePos3]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 4 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos4, groupCircle.rotatePos4]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos4, groupCircle.rotatePos4]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 5 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos5, groupCircle.rotatePos5]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos5, groupCircle.rotatePos5]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 6 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos6, groupCircle.rotatePos6]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos6, groupCircle.rotatePos6]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 7 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos7, groupCircle.rotatePos7]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos7, groupCircle.rotatePos7]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 8 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos8, groupCircle.rotatePos8]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos8, groupCircle.rotatePos8]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 9 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos9, groupCircle.rotatePos9]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos9, groupCircle.rotatePos9]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 10 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos10, groupCircle.rotatePos10]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos10, groupCircle.rotatePos10]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 11 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos11, groupCircle.rotatePos11]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos11, groupCircle.rotatePos11]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 12 ? (
        <>
          <Image style={[groupCircle.img, groupCircle.pos12, groupCircle.rotatePos12]} src={bgRed} />
          <Image style={[groupCircle.img, groupCircle.pos12, groupCircle.rotatePos12]} src={borderRed} />
        </>
      ) : ''}
    </View>
  );
}
