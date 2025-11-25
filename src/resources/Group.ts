/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import {
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
} from 'date-fns';
import _, { capitalize } from 'lodash';
import Person from './Person';

import {
  getAllMonths,
  getDaysOfWeek,
  getDaysOfWeekEnglish,
  getMonthName,
  reduceMonth, reduceNumber, reduceNumberForSub, reduceNumberISK,
} from '@/utils/numbers';
import { useTranslation } from 'react-i18next';

export type AnnualReturn = {
  yearToCalculate: number,
  age: number,
  A: string,
  B: string,
  C: string,
  D: string,
  E: string,
  F: string,
  G: string,
  H: string,
};

export type SplittedDate = {
  day: number,
  month: number,
  year: number,
};

class Group {
  group:Person[];

  groupDate:number;

  NOW:Date;

  karmic:number[];

  constructor(group:Person[], groupYear:number) {
    this.group = group;
    this.groupDate = groupYear;
    this.NOW = new Date();
    this.karmic = [13, 14, 16, 19];
  }

  getMonthOfBirth() :number {
    let sumBirthDates = 0;
    this.group.forEach((birthDate) => {
      const birth = birthDate.getBirthDate();
      sumBirthDates += getMonth(birth) + 1;
    });
    let reduce;
    if (sumBirthDates === 19) {
      reduce = 10;
    } else {
      reduce = reduceMonth(sumBirthDates);
    }
    return reduce;
  }

  getYearOfBirth():number {
    const partnerGroup = this.group;
    let yearOfBirth = 0;
    partnerGroup.forEach((pinnacleYearOfBirth) => {
      yearOfBirth += getYear(pinnacleYearOfBirth.getBirthDate());
    });
    return reduceNumber(yearOfBirth);
  }

  getYearTimeCurve():number {
    return this.groupDate;
  }

  getYearsOld(year:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return yearToCalculate - this.groupDate;
  }

  getA():number {
    const partnerGroup = this.group;
    let A = 0;
    partnerGroup.forEach((pinnacleA) => {
      const birthDate = pinnacleA.getBirthDate();
      A += getMonth(birthDate) + 1;
    });
    return reduceNumber(A);
  }

  getAs():number {
    const partnerGroup = this.group;
    let A = 0;
    partnerGroup.forEach((pinnacleAs) => {
      const birthDate = pinnacleAs.getBirthDate();
      A += getMonth(birthDate) + 1;
    });
    return reduceNumberForSub(A);
  }

  getAWOR():number {
    const partnerGroup = this.group;
    let A = 0;
    partnerGroup.forEach((pinnacleA) => {
      const birthDate = pinnacleA.getBirthDate();
      A += getMonth(birthDate) + 1;
    });
    return A;
  }

  getAISK():string {
    const partnerGroup = this.group;
    let A = 0;
    partnerGroup.forEach((pinnacleA) => {
      const birthDate = pinnacleA.getBirthDate();
      A += getMonth(birthDate) + 1;
    });
    const reduceISK = reduceNumberISK(A);
    return this.karmic.includes(reduceISK) ? '*' : '';
  }

  getB():number {
    const partnerGroup = this.group;
    let B = 0;
    partnerGroup.forEach((pinnacleB) => {
      const birthDate = pinnacleB.getBirthDate();
      B += getDate(birthDate);
    });
    return reduceNumber(B);
  }

  getBs():number {
    const partnerGroup = this.group;
    let B = 0;
    partnerGroup.forEach((pinnacleB) => {
      const birthDate = pinnacleB.getBirthDate();
      B += getDate(birthDate);
    });
    return reduceNumberForSub(B);
  }

  getBWOR():number {
    const partnerGroup = this.group;
    let B = 0;
    partnerGroup.forEach((pinnacleB) => {
      const birthDate = pinnacleB.getBirthDate();
      B += getDate(birthDate);
    });
    return B;
  }

  getBISK():string {
    const partnerGroup = this.group;
    let B = 0;
    partnerGroup.forEach((pinnacleB) => {
      const birthDate = pinnacleB.getBirthDate();
      B += getDate(birthDate);
    });
    const reduceISK = reduceNumberISK(B);
    return this.karmic.includes(reduceISK) ? '*' : '';
  }

  getC():number {
    const partnerGroup = this.group;
    let C = 0;
    partnerGroup.forEach((pinnacleC) => {
      const birthDate = pinnacleC.getBirthDate();
      C += getYear(birthDate);
    });
    return reduceNumber(C);
  }

  getCs():number {
    const partnerGroup = this.group;
    let C = 0;
    partnerGroup.forEach((pinnacleC) => {
      const birthDate = pinnacleC.getBirthDate();
      C += getYear(birthDate);
    });
    return reduceNumberForSub(C);
  }

  getCWOR():number {
    const partnerGroup = this.group;
    let C = 0;
    partnerGroup.forEach((pinnacleC) => {
      const birthDate = pinnacleC.getBirthDate();
      C += getYear(birthDate);
    });
    return C;
  }

  getCISK():string {
    const partnerGroup = this.group;
    let C = 0;
    partnerGroup.forEach((pinnacleC) => {
      const birthDate = pinnacleC.getBirthDate();
      C += getYear(birthDate);
    });
    const reduceISK = reduceNumberISK(C);
    return this.karmic.includes(reduceISK) ? '*' : '';
  }

  getD():number {
    return reduceNumber(
      this.getA()
      + this.getB()
      + this.getC(),
    );
  }

  getDISK():string {
    const D = reduceNumberISK(
      this.getA()
      + this.getB()
      + this.getC(),
    );
    return this.karmic.includes(D) ? '*' : '';
  }

  getDISKCheck() :string {
    const D = reduceNumberISK(
      this.getA()
      + this.getB()
      + this.getC(),
    );
    return this.karmic.includes(D) ? '*' : '';
  }

  getDCheck():number {
    const partnerGroup = this.group;
    let A = 0;
    let B = 0;
    let C = 0;
    partnerGroup.forEach((pinnacleA) => {
      const birthDate = pinnacleA.getBirthDate();
      A += getMonth(birthDate) + 1;
      B += getDate(birthDate);
      C += getYear(birthDate);
    });
    const sumReduce = A + B + C;
    return reduceNumber(sumReduce);
  }

  getE():number {
    return reduceNumber(
      this.getA()
      + this.getB(),
    );
  }

  getEISK():string {
    const E = reduceNumberISK(
      this.getA()
      + this.getB(),
    );
    return this.karmic.includes(E) ? '*' : '';
  }

  getEISKCheck():string {
    const E = reduceNumberISK(
      this.getA()
      + this.getB(),
    );
    return this.karmic.includes(E) ? '*' : '';
  }

  getF():number {
    return reduceNumber(
      this.getC()
      + this.getB(),
    );
  }

  getFISK():string {
    const F = reduceNumberISK(
      this.getC()
      + this.getB(),
    );
    return this.karmic.includes(F) ? '*' : '';
  }

  getFISKCheck():string {
    const F = reduceNumberISK(
      this.getC()
      + this.getB(),
    );
    return this.karmic.includes(F) ? '*' : '';
  }

  getG():number {
    return reduceNumber(
      this.getE()
      + this.getF(),
    );
  }

  getGISK():string {
    const G = reduceNumberISK(
      this.getE()
      + this.getF(),
    );
    return this.karmic.includes(G) ? '*' : '';
  }

  getH():number {
    return reduceNumber(
      this.getA()
      + this.getC(),
    );
  }

  getHISK():string {
    const H = reduceNumberISK(
      this.getA()
      + this.getC(),
    );
    return this.karmic.includes(H) ? '*' : '';
  }

  getHCheck():number {
    const partnerGroup = this.group;
    let A = 0;
    let C = 0;
    partnerGroup.forEach((pinnacleA) => {
      const birthDate = pinnacleA.getBirthDate();
      A += getMonth(birthDate) + 1;
      C += getYear(birthDate);
    });
    const sumReduce = A + C;
    return reduceNumber(sumReduce);
  }

  getHISKCheck():string {
    const H = reduceNumberISK(
      this.getA()
      + this.getC(),
    );
    return this.karmic.includes(H) ? '*' : '';
  }

  getI():number {
    return reduceNumber(
      this.getE()
      + this.getF()
      + this.getG(),
    );
  }

  getIISK():string {
    const I = reduceNumberISK(
      this.getE()
      + this.getF()
      + this.getG(),
    );
    return this.karmic.includes(I) ? '*' : '';
  }

  getJ() :number {
    return reduceNumber(
      this.getH()
      + this.getD(),
    );
  }

  getJISK():string {
    const J = reduceNumberISK(
      this.getH()
      + this.getD(),
    );
    return this.karmic.includes(J) ? '*' : '';
  }

  getK():number {
    return Math.abs(reduceNumber(
      this.getAs()
      - this.getBs(),
    ));
  }

  getL() :number {
    return Math.abs(reduceNumber(
      this.getBs()
      - this.getCs(),
    ));
  }

  getM():number {
    return Math.abs(reduceNumber(
      this.getK()
      - this.getL(),
    ));
  }

  getN() :number {
    return Math.abs(reduceNumber(
      this.getAs()
      - this.getCs(),
    ));
  }

  getO():number {
    return reduceNumber(
      this.getM()
      + this.getK()
      + this.getL(),
    );
  }

  getP():number {
    return reduceNumber(
      this.getD()
      + this.getO(),
    );
  }

  getQ():number {
    return reduceNumber(
      this.getM()
      + this.getK(),
    );
  }

  getR() :number {
    return reduceNumber(
      this.getM()
      + this.getL(),
    );
  }

  getS():number {
    return reduceNumber(
      this.getQ()
      + this.getR(),
    );
  }

  getW():string {
    const appearances = [
      this.getK(),
      this.getO(),
      this.getL(),
      this.getM(),
      this.getN(),
      this.getQ(),
      this.getR(),
      this.getS(),
      this.getP(),
    ];
    const occurrences :Record<number, number> = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const num of appearances) {
      occurrences[num] = occurrences[num] ? occurrences[num] + 1 : 1;
    }
    Object.entries(occurrences).forEach((occurrence) => {
      if (occurrence[1] === 3) {
        occurrences[occurrence[1]] += 1;
      }
    });
    return Object.entries(occurrences).filter((e) => e[1] === 3).map((e) => reduceNumber(Number(e[0]) * 3)).join(', ');
  }

  calcName():number {
    const partnerGroup = this.group;
    let resultCalcName = 0;
    partnerGroup.forEach((g) => {
      resultCalcName += g.calcName();
    });
    return reduceNumber(resultCalcName);
  }

  getNameCheck():number {
    const partnerGroup = this.group;
    let resultCalcName = 0;
    partnerGroup.forEach((g) => {
      resultCalcName += g.getNameCheck();
    });
    return reduceNumber(resultCalcName);
  }

  calcNameISK():string {
    const partnerGroup = this.group;
    let resultCalcName = 0;
    partnerGroup.forEach((g) => {
      resultCalcName += g.calcName();
    });
    const resultISK = reduceNumberISK(resultCalcName);
    return this.karmic.includes(resultISK) ? '*' : '';
  }

  calcSoulNumber():number {
    const partnerGroup = this.group;
    let soul = 0;
    partnerGroup.forEach((g) => {
      soul += g.calcSoulNumber();
    });
    return reduceNumber(soul);
  }

  calcSoulNumberISK() :string {
    const partnerGroup = this.group;
    let soul = 0;
    partnerGroup.forEach((g) => {
      soul += g.calcSoulNumber();
    });
    const soulISK = reduceNumberISK(soul);
    return this.karmic.includes(soulISK) ? '*' : '';
  }

  getSoulCheck() :number {
    const partnerGroup = this.group;
    let soul = 0;
    partnerGroup.forEach((g) => {
      soul += g.getSoulCheck();
    });
    return reduceNumber(soul);
  }

  calcSoulExpression():number {
    const partnerGroup = this.group;
    let soul = 0;
    partnerGroup.forEach((g) => {
      soul += g.calcSoulExpression();
    });
    return reduceNumber(soul);
  }

  calcSoulExpressionISK():string {
    const partnerGroup = this.group;
    let soul = 0;
    partnerGroup.forEach((g) => {
      soul += g.calcSoulExpression();
    });
    const soulISK = reduceNumberISK(soul);
    return this.karmic.includes(soulISK) ? '*' : '';
  }

  getExpressionSoulCheck():number {
    const partnerGroup = this.group;
    let soul = 0;
    partnerGroup.forEach((g) => {
      soul += g.getExpressionSoulCheck();
    });
    return reduceNumber(soul);
  }

  calcMaturity():number {
    const partnerGroup = this.group;
    let soul = 0;
    partnerGroup.forEach((g) => {
      soul += g.calcMaturity();
    });
    return reduceNumber(soul);
  }

  calcMaturityISK():string {
    const partnerGroup = this.group;
    let soul = 0;
    partnerGroup.forEach((g) => {
      soul += g.calcMaturity();
    });
    const soulISK = reduceNumberISK(soul);
    return this.karmic.includes(soulISK) ? '*' : '';
  }

  calcPersonalYear(year?:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(
      this.getA()
      + this.getB()
      + yearToCalculate,
    );
  }

  calcPersonalYearISK(year:number):string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const personalYear = reduceNumberISK(this.getA() + this.getB() + yearToCalculate);
    return this.karmic.includes(personalYear) ? '*' : '';
  }

  /**
   * calculate personal month
   * @returns {Number} sumPersonalMonth
   */
  calcPersonalMonth(opts: SplittedDate):number {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const personalYear = this.calcPersonalYear(yearToCalculate);
    const personalMonth = reduceNumber(personalYear + monthToCalculate);
    return personalMonth;
  }

  calcPersonalMonthISK(opts: SplittedDate):string {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const personalYear = this.calcPersonalYear(yearToCalculate);
    const personalMonth = reduceNumberISK(personalYear + monthToCalculate);
    return this.karmic.includes(personalMonth) ? '*' : '';
  }

  /**
 * Calculate a especific personal weeek
 * @param monthToCalculate
 * @param weekToCalculate
 * @param yearToCalculate
 * @returns {Number}
 */
  calcSelectPersonalWeek(weekToCalculate: 1 | 2 | 3 | 4, opts: SplittedDate): number {
    const monthToCalculate: number = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const weekOne = monthToCalculate + this.calcPersonalYear(yearToCalculate);
    if (weekToCalculate === 1) { return reduceNumber(weekOne); }
    const weekTwo = this.calcPersonalYear(yearToCalculate) + reduceNumber(weekOne);
    if (weekToCalculate === 2) { return reduceNumber(weekTwo); }
    const weekThr = reduceNumber(reduceNumber(weekOne) + reduceNumber(weekTwo));
    if (weekToCalculate === 3) { return reduceNumber(weekThr); }
    const weekFou = reduceNumber(monthToCalculate + reduceNumber(weekOne));
    if (weekToCalculate === 4) { return reduceNumber(weekFou); }
    return 0;
  }

  calcSelectPersonalWeekISK(weekToCalculate: 1 | 2 | 3 | 4, opts: SplittedDate): string {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate: number = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const weekOne = monthToCalculate + this.calcPersonalYear(yearToCalculate);
    if (weekToCalculate === 1) {
      const personalWeekOne = reduceNumberISK(weekOne);
      return this.karmic.includes(personalWeekOne) ? '*' : '';
    }
    const weekTwo = this.calcPersonalYear(yearToCalculate) + weekOne;
    if (weekToCalculate === 2) {
      const personalWeekTwo = reduceNumberISK(weekTwo);
      return this.karmic.includes(personalWeekTwo) ? '*' : '';
    }
    const weekThr = reduceNumber(reduceNumber(weekOne) + reduceNumber(weekTwo));
    if (weekToCalculate === 3) {
      const personalWeekThr = reduceNumberISK(weekThr);
      return this.karmic.includes(personalWeekThr) ? '*' : '';
    }
    const weekFou = reduceNumber(monthToCalculate + reduceNumber(weekOne));
    if (weekToCalculate === 4) {
      const personalWeekFou = reduceNumberISK(weekFou);
      return this.karmic.includes(personalWeekFou) ? '*' : '';
    }
    return '';
  }

  /**
   * calculate personal week
   * @returns {Number} sumPersonalWeek
   */
  calcPersonalWeek(day:number, month:number, year:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const monthToCalculate = _.isNil(month) ? getMonth(this.NOW) + 1 : month;
    const dayToCalculate = _.isNil(day) ? getDate(this.NOW) : day;
    const sumPersonalWeekOne = monthToCalculate + this.calcPersonalYear(yearToCalculate);
    if (dayToCalculate >= 1 && dayToCalculate <= 7) {
      return reduceNumber(sumPersonalWeekOne);
    }
    const sumPersonalWeekTwo = this.calcPersonalYear(yearToCalculate) + reduceNumber(sumPersonalWeekOne);
    if (dayToCalculate >= 8 && dayToCalculate <= 14) {
      return reduceNumber(sumPersonalWeekTwo);
    }

    const sumPersonalWeekThree = reduceNumber(sumPersonalWeekTwo) + reduceNumber(sumPersonalWeekOne);
    if ((dayToCalculate) >= 15 && dayToCalculate <= 21) {
      return reduceNumber(sumPersonalWeekThree);
    }

    const sumPersonalWeekFour = reduceNumber(monthToCalculate + reduceNumber(sumPersonalWeekOne));
    if (dayToCalculate >= 22) {
      return reduceNumber(sumPersonalWeekFour);
    }
    return 0;
  }

  calcPersonalWeekISK(year:number, month:number, day:number):string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const monthToCalculate = _.isNil(month) ? getMonth(this.NOW) + 1 : month;
    const dayToCalculate = _.isNil(day) ? getDate(this.NOW) : day;
    const sumPersonalWeekOne = reduceNumberISK(this.calcPersonalYear(yearToCalculate) + monthToCalculate);
    if (dayToCalculate >= 1 && dayToCalculate <= 7) {
      return this.karmic.includes(sumPersonalWeekOne) ? '*' : '';
    }
    const sumPersonalWeekTwo = reduceNumberISK(this.calcPersonalYear(yearToCalculate) + sumPersonalWeekOne);
    if (dayToCalculate >= 8 && dayToCalculate <= 14) {
      return this.karmic.includes(sumPersonalWeekTwo) ? '*' : '';
    }

    const sumPersonalWeekThree = reduceNumberISK(sumPersonalWeekTwo + sumPersonalWeekOne);
    if ((dayToCalculate) >= 15 && dayToCalculate <= 21) {
      return this.karmic.includes(sumPersonalWeekThree) ? '*' : '';
    }

    const sumPersonalWeekFour = reduceNumberISK(monthToCalculate + sumPersonalWeekOne);
    if (dayToCalculate >= 22) {
      return this.karmic.includes(sumPersonalWeekFour) ? '*' : '';
    }
    return '';
  }

  calcPersonalDay(opts: SplittedDate):number {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const dayToCalculate = _.isNil(opts.day) ? getDate(this.NOW) : opts.day;
    return reduceNumber(
      this.calcPersonalYear(yearToCalculate)
      + monthToCalculate
      + dayToCalculate,
    );
  }

  calcPersonalDayISK(opts: SplittedDate):string {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const dayToCalculate = _.isNil(opts.day) ? getDate(this.NOW) : opts.day;
    const personalDay = reduceNumberISK(this.calcPersonalYear(yearToCalculate) + monthToCalculate + dayToCalculate);
    return this.karmic.includes(personalDay) ? '*' : '';
  }

  getLifeStage(year:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const start = this.groupDate;
    const duration = 9 - this.calcPersonalYear(start);
    let stageOneEnd = start + duration;
    if (duration === 0) {
      stageOneEnd += 9;
    }
    const stageOne = this.getE();
    if (start <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      return stageOne;
    }

    const stageTwo = this.getF();
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      return stageTwo;
    }

    const stageThr = this.getG();
    const stageThrEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      return stageThr;
    }

    const stageFou = this.getH();
    const stageFouEnd = stageThrEnd + 9;
    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      return stageFou;
    }

    if (stageFouEnd <= yearToCalculate && yearToCalculate <= (stageFouEnd + 9)) {
      return stageThr;
    }
    if ((stageFouEnd + 9) <= yearToCalculate && yearToCalculate <= (stageFouEnd + 18)) {
      return stageTwo;
    }
    if ((stageFouEnd + 18) <= yearToCalculate) {
      return stageOne;
    }
    return 0;
  }

  getLifeStageISK(year:number):string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const start = this.groupDate;
    const duration = 9 - this.calcPersonalYear(start);
    let stageOneEnd = start + duration;
    if (duration === 0) {
      stageOneEnd += 9;
    }
    const stageOne = reduceNumberISK(this.getA() + this.getB());
    if (start <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      return this.karmic.includes(stageOne) ? '*' : '';
    }

    const stageTwo = reduceNumberISK(this.getC() + this.getB());
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      return this.karmic.includes(stageTwo) ? '*' : '';
    }

    const stageThr = reduceNumberISK(this.getE() + this.getF());
    const stageThrEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      return this.karmic.includes(stageThr) ? '*' : '';
    }

    const stageFou = reduceNumberISK(this.getA() + this.getC());
    const stageFouEnd = stageThrEnd + 9;
    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      return this.karmic.includes(stageFou) ? '*' : '';
    }

    if (stageFouEnd <= yearToCalculate && yearToCalculate <= (stageFouEnd + 9)) {
      return this.karmic.includes(stageThr) ? '*' : '';
    }
    if ((stageFouEnd + 9) <= yearToCalculate && yearToCalculate <= (stageFouEnd + 18)) {
      return this.karmic.includes(stageTwo) ? '*' : '';
    }
    if ((stageFouEnd + 18) <= yearToCalculate) {
      return this.karmic.includes(stageOne) ? '*' : '';
    }
    return '';
  }

  getQuarterOne():number {
    return this.getC();
  }

  getQuarterOneISK():string {
    return this.getCISK();
  }

  getQuarterTwo(year:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(yearToCalculate - this.getD());
  }

  getQuarterTwoISK(year:number):string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const quarterTwo = reduceNumberISK(yearToCalculate - this.getD());
    return this.karmic.includes(quarterTwo) ? '*' : '';
  }

  /**
   * calculate third quater
   * @returns {Number} quater three
   */
  getQuarterThree(year:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(this.getQuarterOne() + this.getQuarterTwo(yearToCalculate));
  }

  getQuarterThreeISK(year:number):string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const quarterThr = reduceNumberISK(this.getQuarterOne() + this.getQuarterTwo(yearToCalculate));
    return this.karmic.includes(quarterThr) ? '*' : '';
  }

  calcCurrentQuarter(year:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const months = getAllMonths();
    const actualMonth = getMonthName(this.NOW.getMonth() + 1);
    const currentMonth = months.findIndex((i) => i === capitalize(actualMonth));
    const index = this.getCustomMonths().findIndex((i) => i === capitalize(actualMonth));
    const indexEnero = this.getMonthOfBirth();
    const shouldAdvanceStage = (currentMonth + 1) >= indexEnero;
    if (index < 5) {
      return this.getQuarterOne();
    }
    if (index > 4 && index < 9) {
      if (indexEnero === 0) {
        return this.getQuarterTwo(yearToCalculate);
      }
      if (!shouldAdvanceStage) {
        return this.getQuarterTwo(yearToCalculate - 1);
      }
      return this.getQuarterTwo(yearToCalculate);
    }
    if (index > 8) {
      if (indexEnero === 0) {
        return this.getQuarterThree(yearToCalculate);
      }
      if (!shouldAdvanceStage) {
        return this.getQuarterThree(yearToCalculate - 1);
      }
      return this.getQuarterThree(yearToCalculate);
    }
    return 0;
  }

  calcCurrentQuarterISK(year:number):string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const months = getAllMonths();
    const actualMonth = getMonthName(this.NOW.getMonth() + 1);
    const currentMonth = months.findIndex((i) => i === capitalize(actualMonth));
    const index = this.getCustomMonths().findIndex((i) => i === capitalize(actualMonth));
    const indexEnero = this.getMonthOfBirth();
    const shouldAdvanceStage = (currentMonth + 1) >= indexEnero;
    if (index < 5) {
      return this.getQuarterOneISK();
    }
    if (index > 4 && index < 9) {
      if (indexEnero === 0) {
        return this.getQuarterTwoISK(yearToCalculate);
      }
      if (!shouldAdvanceStage) {
        return this.getQuarterTwoISK(yearToCalculate - 1);
      }
      return this.getQuarterTwoISK(yearToCalculate);
    }
    if (index > 8) {
      if (indexEnero === 0) {
        return this.getQuarterThreeISK(yearToCalculate);
      }
      if (!shouldAdvanceStage) {
        return this.getQuarterThreeISK(yearToCalculate - 1);
      }
      return this.getQuarterThreeISK(yearToCalculate);
    }
    return '';
  }

  getQuarterMonth(monthToCalculate: number, yearToCalculate: number): number {
    const { t } = useTranslation();
    const year = _.isNil(yearToCalculate) ? getYear(this.NOW) : yearToCalculate;
    const month = _.isNil(monthToCalculate) ? getMonth(this.NOW) + 1 : monthToCalculate;
    const quarterMonth = getMonthName(month);
    const monthIndex = this.getCustomMonths().findIndex((i) => i === capitalize(quarterMonth));

    // Use birth month index (0-11) instead of searching for 'Enero'
    const indexEnero = this.getCustomMonths().findIndex((i) => i === capitalize(t('months.january') as string));

    if (monthIndex < 5) {
      if (monthIndex >= indexEnero) {
        if (indexEnero === 0) { return this.getQuarterOne(); }
        return this.getQuarterOne();
      }
      return this.getQuarterOne();
    }
    if (monthIndex > 4 && monthIndex < 9) {
      if (monthIndex >= indexEnero) {
        if (indexEnero === 0) { return this.getQuarterTwo(year); }
        return this.getQuarterTwo(year - 1);
      }
      return this.getQuarterTwo(year);
    }
    if (monthIndex > 8) {
      if (monthIndex >= indexEnero) {
        if (indexEnero === 0) { return this.getQuarterThree(year); }
        return this.getQuarterThree(year - 1);
      }
      return this.getQuarterThree(year);
    }
    return 0;
  }

  getQuarterMonthISK(monthToCalculate: number, yearToCalculate: number): string {
    const year = _.isNil(yearToCalculate) ? getYear(this.NOW) : yearToCalculate;
    const quarterMonth = getMonthName(monthToCalculate);
    const monthIndex = this.getCustomMonths().findIndex((i) => i === capitalize(quarterMonth));
    // Use birth month index (0-11) instead of searching for 'Enero'
    const indexEnero = this.getMonthOfBirth();
    if (monthIndex < 5) {
      if (monthIndex >= indexEnero) {
        return this.getQuarterOneISK();
      }
      return this.getQuarterOneISK();
    }
    if (monthIndex > 4 && monthIndex < 9) {
      if (monthIndex >= indexEnero) {
        return this.getQuarterTwoISK(year - 1);
      }
      return this.getQuarterTwoISK(year);
    }
    if (monthIndex > 8) {
      if (monthIndex >= indexEnero) {
        return this.getQuarterThreeISK(year - 1);
      }
      return this.getQuarterThreeISK(year);
    }
    return '';
  }

  getCustomMonths():string[] {
    let sumBirthDates = 0;
    this.group.forEach((m) => {
      const birth = m.getBirthDate();
      sumBirthDates += getMonth(birth) + 1;
    });
    let reduce;
    if (sumBirthDates === 19) {
      reduce = 10;
    } else {
      reduce = reduceMonth(sumBirthDates);
    }
    let reduceIndex = reduce - 1;
    const months = getAllMonths();
    const listOfMonths = [];
    for (let index = 0; index < 13; index++) {
      if (reduceIndex > 11) {
        reduceIndex = 0;
      }
      listOfMonths.push(months[reduceIndex]);
      reduceIndex++;
    }
    return listOfMonths;
  }

  /**
   * calculate current stage name
   * @returns {Number} stage
   */

  getLifeStageNumber(month:number, year:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const monthToCalculate = _.isNil(month) ? getMonth(this.NOW) + 1 : month;
    const months = getAllMonths();
    const actualMonth = getMonthName(monthToCalculate);
    const currentMonthIndex = months.findIndex((i:string) => i === capitalize(actualMonth));
    const indexEnero = this.getMonthOfBirth();
    const start: number = Number(this.groupDate);
    const duration = 9 - reduceNumberForSub(
      this.getA() + this.getB() + start,
    );
    let stageOneEnd = start + duration;
    if (duration === 0) {
      stageOneEnd += 9;
    }
    const shouldAdvanceStage = (currentMonthIndex + 1) >= indexEnero;
    // let stageOne = this.getE()
    if (start <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageOneEnd) {
        return 2;
      }
      return 1;
    }

    // let stageTwo = this.getF()
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageTwoEnd) {
        return 3;
      }
      return 2;
    }

    // let stageThr = this.getG()
    const stageThrEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageThrEnd) {
        return 4;
      }
      return 3;
    }

    // const stageFou = this.getH()
    const stageFouEnd = stageThrEnd + 9;
    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageFouEnd) {
        return 5;
      }
      return 4;
    }

    if (stageFouEnd <= yearToCalculate && yearToCalculate <= (stageFouEnd + 9)) {
      if (shouldAdvanceStage && yearToCalculate === (stageFouEnd + 9)) {
        return 6;
      }
      return 5;
    }
    if ((stageFouEnd + 9) <= yearToCalculate && yearToCalculate <= (stageFouEnd + 18)) {
      if (shouldAdvanceStage && yearToCalculate === (stageFouEnd + 18)) {
        return 7;
      }
      return 6;
    }
    if ((stageFouEnd + 18) <= yearToCalculate) {
      return 7;
    }
    return 0;
  }

  getDoubleLifeStageNumber(year:number):number {
    const start:number = Number(this.groupDate);
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const duration = 9 - reduceNumberForSub(this.getA() + this.getB());
    let stageOneEnd = start + duration;
    if (duration === 0) {
      stageOneEnd += 9;
    }
    if (start <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      return 1;
    }
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      return 2;
    }
    const stageThrEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      return 3;
    }
    const stageFouEnd = stageThrEnd + 9;
    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      return 4;
    }
    if (stageFouEnd <= yearToCalculate && yearToCalculate <= (stageFouEnd + 9)) {
      return 5;
    }
    if ((stageFouEnd + 9) <= yearToCalculate && yearToCalculate <= (stageFouEnd + 18)) {
      return 6;
    }
    if ((stageFouEnd + 18) <= yearToCalculate) {
      return 7;
    }
    return 0;
  }

  hasDoubleStage():boolean {
    const yearBirthday = this.group.map((person: Person) => getYear(person.getBirthDate())).reduce((a, b) => a + b, 0);
    const monthBirthday = this.group.map((person: Person) => getMonth(person.getBirthDate()) + 1).reduce((a, b) => a + b, 0);
    const dayBirthday = this.group.map((person: Person) => getDate(person.getBirthDate())).reduce((a, b) => a + b, 0);
    const reduceYear = reduceNumber(yearBirthday);
    const reduceM = reduceNumber(monthBirthday);
    const reduceDay = reduceNumber(dayBirthday);

    const stageOne = yearBirthday + monthBirthday + dayBirthday;
    const stageTwo = reduceYear + reduceM + reduceDay;
    const reduceStageOne = reduceNumber(stageOne);
    const reduceStageTwo = reduceNumber(stageTwo);
    if (reduceStageOne === reduceStageTwo) {
      return false;
    }
    return true;
  }

  calcDoubleLifeStageDuration(stage :number):number {
    const start:number = Number(this.groupDate);
    const stageOne = 9 - reduceNumberForSub(this.getA() + this.getB());
    let stageOneEnd = start + stageOne;
    if (stageOne === 0) {
      stageOneEnd += 9;
    }
    if (stage === 1) return stageOneEnd;

    if (stage < 8) {
      const stageEnd = stageOneEnd + Math.abs((stage - 1) * 9);
      return stageEnd;
    }

    return 0;
  }

  /**
   * calculate life stages
   * AKA: 1 => E
   * AKA: 2 => F
   * AKA: 3 => G
   * AKA: 4 => H
   * @returns {Number}
   */
  calcLifeStage(stage: number):number {
    const stageOne = this.getE();
    if (stage === 1) return stageOne;

    const stageTwo = this.getF();
    if (stage === 2) return stageTwo;

    const stageThr = this.getG();
    if (stage === 3) return stageThr;

    const stageFou = this.getH();
    if (stage === 4) return stageFou;

    if (stage === 5) return stageThr;
    if (stage === 6) return stageTwo;
    if (stage === 7) return stageOne;
    return stageOne;
  }

  calcLifeStageISK(stage: number) :string {
    const stageOne = reduceNumberISK(this.getA() + this.getB());
    if (stage === 1) return this.karmic.includes(stageOne) ? '*' : '';

    const stageTwo = reduceNumberISK(this.getC() + this.getB());
    if (stage === 2) return this.karmic.includes(stageTwo) ? '*' : '';

    const stageThr = reduceNumberISK(this.getE() + this.getF());
    if (stage === 3) return this.karmic.includes(stageThr) ? '*' : '';

    const stageFou = reduceNumberISK(this.getA() + this.getC());
    if (stage === 4) return this.karmic.includes(stageFou) ? '*' : '';

    if (stage === 5) return this.karmic.includes(stageThr) ? '*' : '';
    if (stage === 6) return this.karmic.includes(stageTwo) ? '*' : '';
    if (stage === 7) return this.karmic.includes(stageOne) ? '*' : '';
    return '';
  }

  calcLifeStageDuration(stage: number):number {
    const start = Number(this.groupDate);
    const stageOne = 9 - reduceNumberForSub(
      this.getA() + this.getB() + start,
    );

    let stageOneEnd = start + stageOne;
    if (stageOne === 0) {
      stageOneEnd += 9;
    }

    if (stage === 1) {
      return stageOneEnd;
    }
    if (stage < 8) {
      const stageEnd = stageOneEnd + Math.abs((stage - 1) * 9);
      return stageEnd;
    }

    return 0;
  }

  /**
 * get nine year cycle
 * @returns {Number} nineYearCycle
 */
  getNineYearCycleStage(year:number):number[] {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    let firstValue = false;
    let firstYear:number = 0;
    const nineYearCycle = [];
    for (let index = 0; index <= 9; index++) {
      const personalYear = this.calcPersonalYear(yearToCalculate - index);
      if (personalYear === 9 && firstValue === false) {
        nineYearCycle.push(yearToCalculate - index);
        firstYear = yearToCalculate - index;
        firstValue = true;
      }
    }
    for (let index = 1; index <= 9; index++) {
      nineYearCycle[index] = firstYear + index;
    }
    return nineYearCycle;
  }

  /**
   * get nine year cycle
   * @returns {Number} nineYearCycle
   */
  getNineYearCycle(year:number):number[] {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const nineYearCycle = [
      yearToCalculate - 4,
      yearToCalculate - 3,
      yearToCalculate - 2,
      yearToCalculate - 1,
      yearToCalculate,
      yearToCalculate + 1,
      yearToCalculate + 2,
      yearToCalculate + 3,
      yearToCalculate + 4,
    ];
    return nineYearCycle;
  }

  getAllDaysInMonth(month?: number, year?: number): number[] {
    const today = new Date();
    const yearToCalculate = year ?? today.getFullYear();
    const monthToCalculate = (month ?? today.getMonth() + 1) - 1;
    const totalDays = getDaysInMonth(new Date(yearToCalculate, monthToCalculate));
    return Array.from({ length: totalDays }, (unused, index) => index + 1);
  }

  getDaysOfWeekCustom(month: number, year: number): string[] {
    const monthToCalculate = _.isNil(month) ? getMonth(this.NOW) + 1 : month;
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const daysInMonth = this.getAllDaysInMonth(monthToCalculate, yearToCalculate);
    const dayInWeek = getDaysOfWeek();

    const firstDay = format(new Date(yearToCalculate, monthToCalculate - 1, daysInMonth[0]), 'EEE')
      .replace(/\./g, '');

    const dayIndex = getDaysOfWeekEnglish().findIndex((i) => i === capitalize(firstDay));

    return Array.from({ length: 7 }, (unused, index) => {
      const weekIndex = (dayIndex + index) % 7;
      return dayInWeek[weekIndex];
    });
  }

  annualReturn(year:number):AnnualReturn {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const age = yearToCalculate - this.groupDate;
    const a = reduceNumber(yearToCalculate);
    const A = `${a}`;
    const b = reduceNumber(
      yearToCalculate
      + this.getAWOR()
      + this.getBWOR(),
    );
    const B = `${b}`;
    const c = reduceNumber(this.getCWOR() - yearToCalculate);
    const C = `${c}`;
    const d = reduceNumber(a + b);
    const D = `${d}`;
    const e = reduceNumber(b + c);
    const E = `${e}`;
    const f = reduceNumber(d + e);
    const F = `${f}`;
    const g = reduceNumber(d + e + f);
    const G = `${g}`;
    const h = reduceNumber(a + c);
    const H = `${h}`;

    return {
      yearToCalculate, age, A, B, C, D, E, F, G, H,
    };
  }

  getAbsences():string {
    const appearances:number[] = [
      this.getA(),
      this.getB(),
      this.getC(),
      this.getD(),
      this.getE(),
      this.getF(),
      this.getG(),
      this.getH(),
      this.getI(),
      this.getJ(),
      this.getK(),
      this.getL(),
      this.getM(),
      this.getN(),
      this.getO(),
      this.getP(),
      this.getQ(),
      this.getR(),
      this.getS(),
      Number(this.getW()),
    ];

    const occurrences = appearances.filter((a) => a > 0).reduce((count: { [key: number]: number }, value: number) => {
      const newCount = count;
      newCount[value] = (newCount[value] || 0) + 1;
      return newCount;
    }, {});

    const base = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const intersection = base.filter((x) => !Object.keys(occurrences).includes(x));
    return intersection.join(' ');
  }
}
export default Group;
