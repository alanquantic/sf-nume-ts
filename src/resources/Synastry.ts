/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import {
  format, getDate, getDaysInMonth, getMonth, getYear,
} from 'date-fns';
import _ from 'lodash';
import {
  capitalize, getDaysOfWeek, getDaysOfWeekEnglish, getMonthName, reduceNumber,
} from '../utils/numbers';
import Person from './Person';

import {
  getAllMonths,
  reduceMonth,
  reduceNumberForSub, reduceNumberISK,
} from '@/utils/numbers';
import { useTranslation } from 'react-i18next';

export type SplittedDate = {
  day: number,
  month: number,
  year: number,
};
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

class Synastry {
  consultant: Person;

  partner: Person;

  NOW: Date;

  karmic: number[];

  yearMet?: number;

  constructor(consultant: Person, partner: Person) {
    this.consultant = consultant;
    this.partner = partner;
    this.NOW = new Date();
    this.karmic = [13, 14, 16, 19];
    this.yearMet = partner.yearMet;
  }

  getYearMeet() :number | undefined {
    return this.yearMet;
  }

  getYearTimeCurve() :number | undefined {
    return this.yearMet;
  }

  getYearsOld(year :number) :number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return yearToCalculate - Number(this.yearMet);
  }

  getDayOfBirth():number {
    const consultantBirthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const sumBirthDates = getDate(consultantBirthDate) + getDate(partnerBirthDate);
    return reduceNumber(sumBirthDates);
  }

  getMonthOfBirth():number {
    const consultantBirthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const sumBirthDates = (getMonth(consultantBirthDate) + 1) + (getMonth(partnerBirthDate) + 1);
    let reduce;
    if (sumBirthDates === 19) {
      reduce = 10;
    } else {
      reduce = reduceMonth(sumBirthDates);
    }
    return reduce;
  }

  getYearOfBirth():number {
    const consultantBirthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const sumBirthDates = getYear(consultantBirthDate) + getYear(partnerBirthDate);
    let reduce;
    if (sumBirthDates === 19) {
      reduce = 10;
    } else {
      reduce = reduceNumber(sumBirthDates);
    }
    return reduce;
  }

  getA():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumber((getMonth(birthDate) + 1) + (getMonth(partnerBirthDate) + 1));
  }

  getB():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumber(getDate(birthDate) + getDate(partnerBirthDate));
  }

  getBISK():string {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const B = reduceNumberISK(getDate(birthDate) + getDate(partnerBirthDate));
    return this.karmic.includes(B) ? '*' : '';
  }

  getC():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumber(getYear(birthDate) + getYear(partnerBirthDate));
  }

  getCISK():string {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const C = reduceNumberISK(getYear(birthDate) + getYear(partnerBirthDate));
    return this.karmic.includes(C) ? '*' : '';
  }

  getD():number {
    return reduceNumber(
      this.getA()
      + this.getB()
      + this.getC(),
    );
  }

  getDCheck():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    const monthReduce = getMonth(birthDate) + 1;
    const monthReducePartner = getMonth(partnerBirthDate) + 1;

    const yearReduce = getYear(birthDate);
    const yearReducePartner = getYear(partnerBirthDate);

    const dayReduce = getDate(birthDate);
    const dayReducePartner = getDate(partnerBirthDate);

    const sumReduce = monthReduce + yearReduce + monthReducePartner + yearReducePartner + dayReduce + dayReducePartner;

    return reduceNumber(sumReduce);
  }

  getDISK():string {
    const D = reduceNumberISK(
      this.getA()
      + this.getB()
      + this.getC(),
    );
    return this.karmic.includes(D) ? '*' : '';
  }

  getDISKCheck():string {
    const D = reduceNumberISK(
      this.getA()
      + this.getB()
      + this.getC(),
    );
    return this.karmic.includes(D) ? '*' : '';
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

  getG() :number {
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

  getHISKCheck():string {
    const H = reduceNumberISK(
      this.getA()
      + this.getC(),
    );
    return this.karmic.includes(H) ? '*' : '';
  }

  getHCheck():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    const monthReduce = getMonth(birthDate) + 1;
    const monthReducePartner = getMonth(partnerBirthDate) + 1;

    const yearReduce = getYear(birthDate);
    const yearReducePartner = getYear(partnerBirthDate);

    const sumReduce = monthReduce + yearReduce + monthReducePartner + yearReducePartner;

    return reduceNumber(sumReduce);
  }

  getI():number {
    return reduceNumber(
      this.getE()
      + this.getF()
      + this.getG(),
    );
  }

  getIISK() :string {
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

  getAs() :number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumberForSub(getMonth(birthDate) + 1 + getMonth(partnerBirthDate) + 1);
  }

  getBs():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumberForSub(getDate(birthDate) + getDate(partnerBirthDate));
  }

  getCs():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumberForSub(getYear(birthDate) + getYear(partnerBirthDate));
  }

  getK() :number {
    return Math.abs(reduceNumber(
      this.getAs()
      - this.getBs(),
    ));
  }

  getL():number {
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

  getN():number {
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

  getR():number {
    return reduceNumber(
      this.getM()
      + this.getL(),
    );
  }

  getS() :number {
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
    const occurrences: Record<number, number> = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const num of appearances) {
      occurrences[num] = (occurrences[num] || 0) + 1;
    }
    // Filtrar los números que aparecen exactamente 3 veces y calcular la triplicidad
    const triplicities = Object.entries(occurrences)
      .filter((e) => e[1] >= 3)
      .map((e) => reduceNumber(Number(e[0]) * 3));
    return triplicities.join(', ');
  }

  calcReaction():number {
    return reduceNumber(
      this.consultant.calcReaction()
      + this.partner.calcReaction(),
    );
  }

  calcReactionISK():string {
    const reaction = reduceNumberISK(
      this.consultant.calcReaction()
      + this.partner.calcReaction(),
    );
    return this.karmic.includes(reaction) ? '*' : '';
  }

  calcSynthesis():number {
    return reduceNumber(
      this.consultant.calcSynthesis()
      + this.partner.calcSynthesis(),
    );
  }

  calcSynthesisISK():string {
    const synthesis = reduceNumberISK(
      this.consultant.calcSynthesis()
      + this.partner.calcSynthesis(),
    );
    return this.karmic.includes(synthesis) ? '*' : '';
  }

  calcGift():number {
    return reduceNumber(
      Number(this.consultant.calcGift())
      + Number(this.partner.calcGift()),
    );
  }

  calcGiftISK():string {
    const gift = reduceNumberISK(
      Number(this.consultant.calcGift())
      + Number(this.partner.calcGift()),
    );
    return this.karmic.includes(gift) ? '*' : '';
  }

  calcName():number {
    return reduceNumber(
      this.consultant.calcName()
      + this.partner.calcName(),
    );
  }

  calcNameISK():string {
    const name = reduceNumberISK(
      this.consultant.calcName()
      + this.partner.calcName(),
    );
    return this.karmic.includes(name) ? '*' : '';
  }

  getNameCheck():number {
    return reduceNumber(
      this.consultant.getNameCheck()
      + this.partner.getNameCheck(),
    );
  }

  calcSoulNumber():number {
    return reduceNumber(
      this.consultant.calcSoulNumber()
      + this.partner.calcSoulNumber(),
    );
  }

  calcSoulNumberISK():string {
    const soul = reduceNumberISK(this.consultant.calcSoulNumber() + this.partner.calcSoulNumber());
    return this.karmic.includes(soul) ? '*' : '';
  }

  getSoulCheck():number {
    return reduceNumber(
      this.consultant.getSoulCheck()
      + this.partner.getSoulCheck(),
    );
  }

  calcSoulExpression():number {
    return reduceNumber(
      this.consultant.calcSoulExpression()
      + this.partner.calcSoulExpression(),
    );
  }

  calcSoulExpressionISK():string {
    const soul = reduceNumberISK(this.consultant.calcSoulExpression() + this.partner.calcSoulExpression());
    return this.karmic.includes(soul) ? '*' : '';
  }

  getExpressionSoulCheck():number {
    return reduceNumber(
      this.consultant.getExpressionSoulCheck()
      + this.partner.getExpressionSoulCheck(),
    );
  }

  calcMaturity():number {
    return reduceNumber(
      this.consultant.calcMaturity()
      + this.partner.calcMaturity(),
    );
  }

  calcMaturityISK():string {
    const maturity = reduceNumberISK(this.consultant.calcMaturity() + this.partner.calcMaturity());
    return this.karmic.includes(maturity) ? '*' : '';
  }

  /**
   * calculate personal year
   * @returns {Number} sumPersonalYear
   */
  calcPersonalYear(year?:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(
      this.getA()
      + this.getB()
      + yearToCalculate,
    );
  }

  /* Personal  Year Keramics */
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

  /** Personal Month Keramics */
  calcPersonalMonthISK(opts: SplittedDate):string {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const personalYear = this.calcPersonalYear(yearToCalculate);
    const personalMonth = reduceNumberISK(personalYear + monthToCalculate);
    return this.karmic.includes(personalMonth) ? '*' : '';
  }

  /**
   * calculate personal week
   * @returns {Number} sumPersonalWeek
   */
  calcPersonalWeek(day :number, month :number, year:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const monthToCalculate = _.isNil(month) ? getMonth(this.NOW) + 1 : month;
    const dayToCalculate = _.isNil(day) ? getDate(this.NOW) : day;
    const sumPersonalWeekOne = reduceNumber(reduceNumber(this.calcPersonalYear(yearToCalculate)) + reduceNumber(monthToCalculate));
    if (dayToCalculate >= 1 && dayToCalculate <= 7) {
      return sumPersonalWeekOne;
    }
    const sumPersonalWeekTwo = reduceNumber(reduceNumber(this.calcPersonalYear(yearToCalculate)) + reduceNumber(sumPersonalWeekOne));
    if (dayToCalculate >= 8 && dayToCalculate <= 14) {
      return sumPersonalWeekTwo;
    }

    const sumPersonalWeekThree = reduceNumber(sumPersonalWeekTwo + sumPersonalWeekOne);
    if ((dayToCalculate) >= 15 && dayToCalculate <= 21) {
      return sumPersonalWeekThree;
    }

    const sumPersonalWeekFour = reduceNumber(reduceNumber(monthToCalculate) + sumPersonalWeekOne);
    if (dayToCalculate >= 22) {
      return sumPersonalWeekFour;
    }
    return 0;
  }

  /** Personal Week Keramics */
  calcPersonalWeekISK(day :number, month :number, year:number):string {
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
   * calculate personal day
   * @returns {Number} sumPersonalDay
   */
  calcPersonalDay(opts:SplittedDate):number {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const dayToCalculate = _.isNil(opts.day) ? getDate(this.NOW) : opts.day;
    return reduceNumber(
      this.calcPersonalYear(yearToCalculate)
      + monthToCalculate
      + dayToCalculate,
    );
  }

  calcPersonalDayISK(opts:SplittedDate):string {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const dayToCalculate = _.isNil(opts.day) ? getDate(this.NOW) : opts.day;
    const personalDay = reduceNumberISK(this.calcPersonalYear(yearToCalculate) + monthToCalculate + dayToCalculate);
    return this.karmic.includes(personalDay) ? '*' : '';
  }

  hasDoubleStage():boolean {
    const yearBirthDate = getYear(this.consultant.birthDate) + getYear(this.partner.birthDate);
    const monthBirthDate = (getMonth(this.consultant.birthDate) + 1) + (getMonth(this.partner.birthDate) + 1);
    const dayBirthDate = getDate(this.consultant.birthDate) + getDate(this.partner.birthDate);

    const reducedYear = reduceNumber(yearBirthDate);
    const reducedMonth = reduceNumber(monthBirthDate);
    const reducedDay = reduceNumber(dayBirthDate);

    const stageOne = yearBirthDate + monthBirthDate + dayBirthDate;
    const stageTwo = reducedYear + reducedMonth + reducedDay;
    const reduceStageOne = reduceNumber(stageOne);
    const reduceStageTwo = reduceNumber(stageTwo);

    if (reduceStageOne === reduceStageTwo) {
      return false;
    }
    return true;
  }

  /**
   * calculate life stages
   * AKA: 1 => E
   * AKA: 2 => F
   * AKA: 3 => G
   * AKA: 4 => H
   * @returns {Number}
   */
  calcLifeStage(stage:number):number {
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

  calcLifeStageISK(stage :number):string {
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

  calcDurationStage(stage:number):string {
    const stageOne = 9 - reduceNumberForSub(this.getA() + this.getB());
    if (stage === 1) return `De 0 a los ${stageOne}`;
    const stageTwo = stageOne + 9;
    if (stage === 2) return `${stageOne} a los ${stageTwo}`;

    const stageThr = stageTwo + 9;
    if (stage === 3) return `${stageTwo} a los ${stageThr}`;

    const stageFou = stageThr + 9;
    if (stage === 4) return `${stageThr} a los ${stageFou}`;
    const stageFive = stageFou + 9;
    if (stage === 5) return `${stageFou} a los ${stageFive}`;
    if (stage === 6) return `${stageFive + 9} a los ${stageFive + 18}`;
    if (stage === 7) return `${stageFive + 18} a ...`;
    return '';
  }

  calcLifeStageDuration(stage :number):number {
    const start:number = Number(this.yearMet);
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

  calcDoubleLifeStageDuration(stage :number):number {
    const start:number = Number(this.yearMet);
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

  getLifeStage(year:number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const age = yearToCalculate - Number(this.yearMet);
    const lifeStage = Math.floor(age / 9);
    return lifeStage;
  }

  getLifeStageISK(year :number):string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const start:number = Number(this.yearMet);
    const duration = 9 - reduceNumberForSub(this.getA() + this.getB() + start);
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

  /**
   * calculate current stage number
   * @returns {Number} stage
   */
  getLifeStageNumber(month:number, year:number): number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const monthToCalculate = _.isNil(month) ? getMonth(this.NOW) + 1 : month;
    const months = getAllMonths();
    const actualMonth = getMonthName(monthToCalculate);
    const currentMonthIndex = months.findIndex((i:string) => i === capitalize(actualMonth));
    const indexEnero = this.getMonthOfBirth();
    const start: number = Number(this.yearMet);
    const duration = 9 - reduceNumberForSub(
      this.getA()
      + this.getB()
      + start,
    );
    let stageOneEnd = start + duration;
    if (duration === 0) {
      stageOneEnd += 9;
    }
    const stageTwoEnd = stageOneEnd + 9;
    const stageThrEnd = stageTwoEnd + 9;
    const stageFouEnd = stageThrEnd + 9;
    const shouldAdvanceStage = (currentMonthIndex + 1) >= indexEnero;

    if (start <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageOneEnd) {
        return 2;
      }
      return 1;
    }

    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageTwoEnd) {
        return 3;
      }
      return 2;
    }

    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageThrEnd) {
        return 4;
      }
      return 3;
    }

    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageFouEnd) {
        return 5;
      }
      return 4;
    }

    const stageFivEnd = stageFouEnd + 9;
    if (stageFouEnd <= yearToCalculate && yearToCalculate <= stageFivEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageFivEnd) {
        return 6;
      }
      return 5;
    }

    const stageSixEnd = stageFouEnd + 18;
    if (stageFivEnd <= yearToCalculate && yearToCalculate <= stageSixEnd) {
      if (shouldAdvanceStage && yearToCalculate === stageSixEnd) {
        return 7;
      }
      return 6;
    }

    if (stageSixEnd < yearToCalculate) {
      return 7;
    }

    return 0;
  }

  getDoubleLifeStageNumber(year:number):number {
    const start:number = Number(this.yearMet);
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

  /**
   * get nine year cycle
   * @returns {Number} nineYearCycle
   */
  getNineYearCycleStage(year:number) :number[] {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    let firstValue = false;
    let firstYear:number = 0;
    const nineYearCycle = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index <= 9; index++) {
      const personalYear = this.calcPersonalYear(yearToCalculate - index);
      if (personalYear === 9 && firstValue === false) {
        nineYearCycle.push(yearToCalculate - index);
        firstYear = yearToCalculate - index;
        firstValue = true;
      }
    }
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= 9; index++) {
      nineYearCycle[index] = firstYear + index;
    }
    return nineYearCycle;
  }

  getCycleCustom(stage:number):number[] {
    let start:number = Number(this.yearMet);
    let stageOne = 9 - reduceNumberForSub(this.getA() + this.getB());
    if (stageOne === 0) {
      stageOne += 9;
    }
    const cycleStage = [];
    if (stage === 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < stageOne; i++) {
        cycleStage.push(start);
        // eslint-disable-next-line no-plusplus
        start++;
      }
    }
    if (stage < 8 && stage !== 1) {
      let stageStart = this.calcLifeStageDuration(stage) - 9;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 9; i++) {
        cycleStage.push(stageStart);
        // eslint-disable-next-line no-plusplus
        stageStart++;
      }
    }
    return cycleStage;
  }

  getCustomMonths():string[] {
    const consultantBirthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const sumBirthDates = (getMonth(consultantBirthDate) + 1) + (getMonth(partnerBirthDate) + 1);
    let reduce;
    if (sumBirthDates === 19) {
      reduce = 10;
    } else {
      reduce = reduceMonth(sumBirthDates);
    }
    let reduceIndex = reduce - 1;
    const months = getAllMonths();
    const listOfMonths = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 13; index++) {
      if (reduceIndex > 11) {
        reduceIndex = 0;
      }
      listOfMonths.push(months[reduceIndex]);
      // eslint-disable-next-line no-plusplus
      reduceIndex++;
    }
    return listOfMonths;
  }

  getQuarterOne() {
    return this.getC();
  }

  getQuarterOneISK():string {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const quarterOne = reduceNumberISK(getYear(birthDate) + getYear(partnerBirthDate));
    return this.karmic.includes(quarterOne) ? '*' : '';
  }

  getQuarterTwo(year :number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(yearToCalculate - this.getD());
  }

  getQuarterTwoISK(year :number):string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const quarterTwo = reduceNumberISK(yearToCalculate - this.getD());
    return this.karmic.includes(quarterTwo) ? '*' : '';
  }

  getQuarterThree(year :number):number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(this.getQuarterOne() + this.getQuarterTwo(yearToCalculate));
  }

  getQuarterThreeISK(year :number):string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const quarterThr = reduceNumberISK(this.getQuarterOne() + this.getQuarterTwo(yearToCalculate));
    return this.karmic.includes(quarterThr) ? '*' : '';
  }

  calcCurrentQuarter(year :number):number {
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

  calcCurrentQuarterISK(year :number):string {
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

  annualReturn(year :number):AnnualReturn {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const age = yearToCalculate - Number(this.yearMet);
    const a = reduceNumber(yearToCalculate);
    const aK = reduceNumberISK(yearToCalculate);
    const A = `${a}${this.karmic.includes(aK) ? '*' : ''}`;
    const b = reduceNumber(
      yearToCalculate
      + reduceNumber(this.consultant.birthDate.getMonth() + this.partner.birthDate.getMonth() + 2)
      + reduceNumber(this.consultant.birthDate.getDate() + this.partner.birthDate.getDate()),
    );
    const B = `${b}`;
    const c = reduceNumber((this.consultant.birthDate.getFullYear() + this.partner.birthDate.getFullYear()) - yearToCalculate);
    const C = `${c}`;
    const d = reduceNumber(a + b);
    const dK = reduceNumberISK(a + b);
    const D = `${d}${this.karmic.includes(dK) ? '*' : ''}`;
    const e = reduceNumber(b + c);
    const eK = reduceNumberISK(b + c);
    const E = `${e}${this.karmic.includes(eK) ? '*' : ''}`;
    const f = reduceNumber(d + e);
    const fK = reduceNumberISK(d + e);
    const F = `${f}${this.karmic.includes(fK) ? '*' : ''}`;
    const g = reduceNumber(d + e + f);
    const gK = reduceNumberISK(d + e + f);
    const G = `${g}${this.karmic.includes(gK) ? '*' : ''}`;
    const h = reduceNumber(a + c);
    const hK = reduceNumberISK(a + c);
    const H = `${h}${this.karmic.includes(hK) ? '*' : ''}`;

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

  getNineYearCycle(year :number):number[] {
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

  getAllDaysInMonth(month: number, year: number): number[] {
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
}
export default Synastry;
