import Person, { SplittedDate } from '@/resources/Person';
import Universal from '@/resources/Universal';
import {
  Image, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import bgBlue from '../assets/backBlue.png';
import bgRed from '../assets/bgRed.png';
import borderRed from '../assets/brRed3.png';

export const circle = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  img: {
    width: '143px',
    height: '90px',
    position: 'absolute',
  },
  pos1: {
    top: '234px',
    left: '90px',
  },
  pos2: {
    top: '281px',
    left: '129px',
  },
  rotatePos2: {
    transform: 'rotate(-30)',
  },
  pos3: {
    top: '304px',
    left: '185 px',
  },
  rotatePos3: {
    transform: 'rotate(-60)',
  },
  pos4: {
    top: '296px',
    left: '245px',
  },
  rotatePos4: {
    transform: 'rotate(-90)',
  },
  pos5: {
    top: '257px',
    left: '292px',
  },
  rotatePos5: {
    transform: 'rotate(-120)',
  },
  pos6: {
    top: '202px',
    left: '313px',
  },
  rotatePos6: {
    transform: 'rotate(-150)',
  },
  pos7: {
    top: '143px',
    left: '307px',
  },
  rotatePos7: {
    transform: 'rotate(-180)',
  },
  pos8: {
    top: '95px',
    left: '269px',
  },
  rotatePos8: {
    transform: 'rotate(150)',
  },
  pos9: {
    top: '72px',
    left: '213px',
  },
  rotatePos9: {
    transform: 'rotate(120)',
  },
  pos10: {
    top: '80px',
    left: '154px',
  },
  rotatePos10: {
    transform: 'rotate(90)',
  },
  pos11: {
    top: '117px',
    left: '106px',
  },
  rotatePos11: {
    transform: 'rotate(60)',
  },
  pos12: {
    top: '173px',
    left: '83px',
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

export default function Circle({ consultant, date, universalCalcs }: { consultant: Person, date: SplittedDate, universalCalcs: Universal }) {
  const currentYear = date.year;
  const currentMonth = date.month;
  const u = universalCalcs;
  return (
    <View style={circle.container}>

      <View style={[circle.year, { top: 210, left: 245 }]}>
        <Text>{consultant.calcPersonalYear(currentYear)}</Text>
      </View>
      <Text style={[circle.circleFont, { top: 235, left: 100 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 1 })}
        {consultant.calcSelectPersonalWeekISK(1, date)}
      </Text>
      <Text style={[circle.circleFont, { top: 255, left: 105 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 1 })}
        {consultant.calcSelectPersonalWeekISK(2, date)}
      </Text>
      <Text style={[circle.circleFont, { top: 275, left: 110 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 1 })}
        {consultant.calcSelectPersonalWeekISK(3, date)}
      </Text>
      <Text style={[circle.circleFont, { top: 295, left: 115 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 1 })}
        {consultant.calcSelectPersonalWeekISK(4, date)}
      </Text>

      <Text style={[circle.circleFont, { top: 320, left: 130 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 2 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 2 })}
      </Text>
      <Text style={[circle.circleFont, { top: 335, left: 145 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 2 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 2 })}
      </Text>
      <Text style={[circle.circleFont, { top: 350, left: 160 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 2 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 2 })}
      </Text>
      <Text style={[circle.circleFont, { top: 365, left: 175 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 2 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 2 })}
      </Text>

      <Text style={[circle.circleFont, { top: 375, left: 195 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 3 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 3 })}
      </Text>
      <Text style={[circle.circleFont, { top: 385, left: 215 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 3 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 3 })}
      </Text>
      <Text style={[circle.circleFont, { top: 390, left: 235 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 3 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 3 })}
      </Text>
      <Text style={[circle.circleFont, { top: 395, left: 255 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 3 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 3 })}
      </Text>

      <Text style={[circle.circleFont, { top: 395, left: 280 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 4 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 4 })}
      </Text>
      <Text style={[circle.circleFont, { top: 390, left: 300 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 4 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 4 })}
      </Text>
      <Text style={[circle.circleFont, { top: 385, left: 320 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 4 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 4 })}
      </Text>
      <Text style={[circle.circleFont, { top: 380, left: 340 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 4 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 4 })}
      </Text>

      <Text style={[circle.circleFont, { top: 365, left: 360 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 5 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 5 })}
      </Text>
      <Text style={[circle.circleFont, { top: 350, left: 375 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 5 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 5 })}
      </Text>
      <Text style={[circle.circleFont, { top: 335, left: 390 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 5 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 5 })}
      </Text>
      <Text style={[circle.circleFont, { top: 320, left: 405 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 5 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 5 })}
      </Text>

      <Text style={[circle.circleFont, { top: 300, left: 415 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 6 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 6 })}
      </Text>
      <Text style={[circle.circleFont, { top: 280, left: 425 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 6 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 6 })}
      </Text>
      <Text style={[circle.circleFont, { top: 255, left: 430 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 6 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 6 })}
      </Text>
      <Text style={[circle.circleFont, { top: 235, left: 435 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 6 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 6 })}
      </Text>

      <Text style={[circle.circleFont, { top: 215, left: 435 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 7 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 7 })}
      </Text>
      <Text style={[circle.circleFont, { top: 195, left: 425 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 7 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 7 })}
      </Text>
      <Text style={[circle.circleFont, { top: 170, left: 425 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 7 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 7 })}
      </Text>
      <Text style={[circle.circleFont, { top: 150, left: 420 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 7 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 7 })}
      </Text>

      <Text style={[circle.circleFont, { top: 130, left: 405 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 8 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 8 })}
      </Text>
      <Text style={[circle.circleFont, { top: 115, left: 390 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 8 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 8 })}
      </Text>
      <Text style={[circle.circleFont, { top: 100, left: 375 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 8 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 8 })}
      </Text>
      <Text style={[circle.circleFont, { top: 85, left: 360 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 8 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 8 })}
      </Text>

      <Text style={[circle.circleFont, { top: 75, left: 340 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 9 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 9 })}
      </Text>
      <Text style={[circle.circleFont, { top: 65, left: 320 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 9 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 9 })}
      </Text>
      <Text style={[circle.circleFont, { top: 60, left: 300 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 9 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 9 })}
      </Text>
      <Text style={[circle.circleFont, { top: 60, left: 275 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 9 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 9 })}
      </Text>

      <Text style={[circle.circleFont, { top: 60, left: 255 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 10 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 10 })}
      </Text>
      <Text style={[circle.circleFont, { top: 60, left: 235 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 10 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 10 })}
      </Text>
      <Text style={[circle.circleFont, { top: 65, left: 215 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 10 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 10 })}
      </Text>
      <Text style={[circle.circleFont, { top: 75, left: 195 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 10 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 10 })}
      </Text>

      <Text style={[circle.circleFont, { top: 85, left: 170 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 11 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 11 })}
      </Text>
      <Text style={[circle.circleFont, { top: 100, left: 160 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 11 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 11 })}
      </Text>
      <Text style={[circle.circleFont, { top: 115, left: 145 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 11 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 11 })}
      </Text>
      <Text style={[circle.circleFont, { top: 135, left: 130 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 11 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 11 })}
      </Text>

      <Text style={[circle.circleFont, { top: 150, left: 120 }]}>
        {consultant.calcSelectPersonalWeek(1, { ...date, month: 12 })}
        {consultant.calcSelectPersonalWeekISK(1, { ...date, month: 12 })}
      </Text>
      <Text style={[circle.circleFont, { top: 175, left: 110 }]}>
        {consultant.calcSelectPersonalWeek(2, { ...date, month: 12 })}
        {consultant.calcSelectPersonalWeekISK(2, { ...date, month: 12 })}
      </Text>
      <Text style={[circle.circleFont, { top: 195, left: 105 }]}>
        {consultant.calcSelectPersonalWeek(3, { ...date, month: 12 })}
        {consultant.calcSelectPersonalWeekISK(3, { ...date, month: 12 })}
      </Text>
      <Text style={[circle.circleFont, { top: 215, left: 100 }]}>
        {consultant.calcSelectPersonalWeek(4, { ...date, month: 12 })}
        {consultant.calcSelectPersonalWeekISK(4, { ...date, month: 12 })}
      </Text>

      <Text style={[circle.circleFont, { top: 250, left: 150 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 1 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 1 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 1 })}
        {u.calcUniversalMonthISK({ ...date, month: 1 })}
      </Text>
      <Text style={[circle.circleFont, { top: 300, left: 175 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 2 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 2 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 2 })}
        {u.calcUniversalMonthISK({ ...date, month: 2 })}
      </Text>
      <Text style={[circle.circleFont, { top: 330, left: 220 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 3 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 3 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 3 })}
        {u.calcUniversalMonthISK({ ...date, month: 3 })}
      </Text>

      <Text style={[circle.circleFont, { top: 330, left: 285 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 4 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 4 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 4 })}
        {u.calcUniversalMonthISK({ ...date, month: 4 })}
      </Text>
      <Text style={[circle.circleFont, { top: 300, left: 335 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 5 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 5 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 5 })}
        {u.calcUniversalMonthISK({ ...date, month: 5 })}
      </Text>
      <Text style={[circle.circleFont, { top: 250, left: 370 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 6 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 6 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 6 })}
        {u.calcUniversalMonthISK({ ...date, month: 6 })}
      </Text>

      <Text style={[circle.circleFont, { top: 195, left: 370 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 7 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 7 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 7 })}
        {u.calcUniversalMonthISK({ ...date, month: 7 })}
      </Text>
      <Text style={[circle.circleFont, { top: 140, left: 335 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 8 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 8 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 8 })}
        {u.calcUniversalMonthISK({ ...date, month: 8 })}
      </Text>
      <Text style={[circle.circleFont, { top: 105, left: 290 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 9 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 9 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 9 })}
        {u.calcUniversalMonthISK({ ...date, month: 9 })}
      </Text>

      <Text style={[circle.circleFont, { top: 105, left: 230 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 10 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 10 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 10 })}
        {u.calcUniversalMonthISK({ ...date, month: 10 })}
      </Text>
      <Text style={[circle.circleFont, { top: 140, left: 170 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 11 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 11 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 11 })}
        {u.calcUniversalMonthISK({ ...date, month: 11 })}
      </Text>
      <Text style={[circle.circleFont, { top: 195, left: 150 }, circle.w30]}>
        {consultant.calcPersonalMonth({ ...date, month: 12 })}
        {consultant.calcPersonalMonthISK({ ...date, month: 12 })}
        {' '}
        /
        {u.calcUniversalMonth({ ...date, month: 12 })}
        {u.calcUniversalMonthISK({ ...date, month: 12 })}
      </Text>

      <Text style={[circle.circleFont, { top: 240, left: 210 }]}>
        {consultant.getQuarterMonth(1, date.year)}
        {consultant.getQuarterMonthISK(1, date.year)}
      </Text>
      <Text style={[circle.circleFont, { top: 265, left: 225 }]}>
        {consultant.getQuarterMonth(2, date.year)}
        {consultant.getQuarterMonthISK(2, date.year)}
      </Text>
      <Text style={[circle.circleFont, { top: 280, left: 250 }]}>
        {consultant.getQuarterMonth(3, date.year)}
        {consultant.getQuarterMonthISK(3, date.year)}
      </Text>

      <Text style={[circle.circleFont, { top: 280, left: 280 }]}>
        {consultant.getQuarterMonth(4, date.year)}
        {consultant.getQuarterMonthISK(4, date.year)}
      </Text>
      <Text style={[circle.circleFont, { top: 265, left: 305 }]}>
        {consultant.getQuarterMonth(5, date.year)}
        {consultant.getQuarterMonthISK(5, date.year)}
      </Text>
      <Text style={[circle.circleFont, { top: 240, left: 320 }]}>
        {consultant.getQuarterMonth(6, date.year)}
        {consultant.getQuarterMonthISK(6, date.year)}
      </Text>

      <Text style={[circle.circleFont, { top: 210, left: 320 }]}>
        {consultant.getQuarterMonth(7, date.year)}
        {consultant.getQuarterMonthISK(7, date.year)}
      </Text>
      <Text style={[circle.circleFont, { top: 185, left: 305 }]}>
        {consultant.getQuarterMonth(8, date.year)}
        {consultant.getQuarterMonthISK(8, date.year)}
      </Text>
      <Text style={[circle.circleFont, { top: 170, left: 280 }]}>
        {consultant.getQuarterMonth(9, date.year)}
        {consultant.getQuarterMonthISK(9, date.year)}
      </Text>

      <Text style={[circle.circleFont, { top: 170, left: 250 }]}>
        {consultant.getQuarterMonth(10, date.year)}
        {consultant.getQuarterMonthISK(10, date.year)}
      </Text>
      <Text style={[circle.circleFont, { top: 185, left: 225 }]}>
        {consultant.getQuarterMonth(11, date.year)}
        {consultant.getQuarterMonthISK(11, date.year)}
      </Text>
      <Text style={[circle.circleFont, { top: 210, left: 210 }]}>
        {consultant.getQuarterMonth(12, date.year)}
        {consultant.getQuarterMonthISK(12, date.year)}
      </Text>

      {currentMonth !== 1 && currentMonth > 1 ? <Image style={[circle.img, circle.pos1]} src={bgBlue} /> : ''}
      {currentMonth !== 2 && currentMonth > 2 ? <Image style={[circle.img, circle.pos2, circle.rotatePos2]} src={bgBlue} /> : ''}
      {currentMonth !== 3 && currentMonth > 3 ? <Image style={[circle.img, circle.pos3, circle.rotatePos3]} src={bgBlue} /> : ''}
      {currentMonth !== 4 && currentMonth > 4 ? <Image style={[circle.img, circle.pos4, circle.rotatePos4]} src={bgBlue} /> : ''}
      {currentMonth !== 5 && currentMonth > 5 ? <Image style={[circle.img, circle.pos5, circle.rotatePos5]} src={bgBlue} /> : ''}
      {currentMonth !== 6 && currentMonth > 6 ? <Image style={[circle.img, circle.pos6, circle.rotatePos6]} src={bgBlue} /> : ''}
      {currentMonth !== 7 && currentMonth > 7 ? <Image style={[circle.img, circle.pos7, circle.rotatePos7]} src={bgBlue} /> : ''}
      {currentMonth !== 8 && currentMonth > 8 ? <Image style={[circle.img, circle.pos8, circle.rotatePos8]} src={bgBlue} /> : ''}
      {currentMonth !== 9 && currentMonth > 9 ? <Image style={[circle.img, circle.pos9, circle.rotatePos9]} src={bgBlue} /> : ''}
      {currentMonth !== 10 && currentMonth > 10 ? <Image style={[circle.img, circle.pos10, circle.rotatePos10]} src={bgBlue} /> : ''}
      {currentMonth !== 11 && currentMonth > 11 ? <Image style={[circle.img, circle.pos11, circle.rotatePos11]} src={bgBlue} /> : ''}
      {currentMonth !== 12 && currentMonth > 12 ? <Image style={[circle.img, circle.pos12, circle.rotatePos12]} src={bgBlue} /> : ''}

      {currentMonth === 1 ? (
        <>
          <Image style={[circle.img, circle.pos1]} src={bgRed} />
          <Image style={[circle.img, circle.pos1]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 2 ? (
        <>
          <Image style={[circle.img, circle.pos2, circle.rotatePos2]} src={bgRed} />
          <Image style={[circle.img, circle.pos2, circle.rotatePos2]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 3 ? (
        <>
          <Image style={[circle.img, circle.pos3, circle.rotatePos3]} src={bgRed} />
          <Image style={[circle.img, circle.pos3, circle.rotatePos3]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 4 ? (
        <>
          <Image style={[circle.img, circle.pos4, circle.rotatePos4]} src={bgRed} />
          <Image style={[circle.img, circle.pos4, circle.rotatePos4]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 5 ? (
        <>
          <Image style={[circle.img, circle.pos5, circle.rotatePos5]} src={bgRed} />
          <Image style={[circle.img, circle.pos5, circle.rotatePos5]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 6 ? (
        <>
          <Image style={[circle.img, circle.pos6, circle.rotatePos6]} src={bgRed} />
          <Image style={[circle.img, circle.pos6, circle.rotatePos6]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 7 ? (
        <>
          <Image style={[circle.img, circle.pos7, circle.rotatePos7]} src={bgRed} />
          <Image style={[circle.img, circle.pos7, circle.rotatePos7]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 8 ? (
        <>
          <Image style={[circle.img, circle.pos8, circle.rotatePos8]} src={bgRed} />
          <Image style={[circle.img, circle.pos8, circle.rotatePos8]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 9 ? (
        <>
          <Image style={[circle.img, circle.pos9, circle.rotatePos9]} src={bgRed} />
          <Image style={[circle.img, circle.pos9, circle.rotatePos9]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 10 ? (
        <>
          <Image style={[circle.img, circle.pos10, circle.rotatePos10]} src={bgRed} />
          <Image style={[circle.img, circle.pos10, circle.rotatePos10]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 11 ? (
        <>
          <Image style={[circle.img, circle.pos11, circle.rotatePos11]} src={bgRed} />
          <Image style={[circle.img, circle.pos11, circle.rotatePos11]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 12 ? (
        <>
          <Image style={[circle.img, circle.pos12, circle.rotatePos12]} src={bgRed} />
          <Image style={[circle.img, circle.pos12, circle.rotatePos12]} src={borderRed} />
        </>
      ) : ''}
    </View>
  );
}
