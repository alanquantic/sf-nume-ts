/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-plusplus */
import {
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
  parse,
} from 'date-fns';
import _ from 'lodash';

import {
  capitalize,
  consonantValues,
  getAllMonths,
  getDaysOfWeek,
  getDaysOfWeekEnglish,
  getMonthName,
  inclusionValue,
  letterValue,
  reduceNumber,
  reduceNumberForSub,
  reduceNumberISK,
  sumNumbers,
  vowelsValues,
} from '@/utils/numbers';
import { useTranslation } from 'react-i18next';

type PersonProps = {
  id: string;
  name: string;
  lastName: string;
  scdLastName: string;
  birthDate: string;
  yearMet?: number;
  partner?: Person[];
  group?: any[];
};
export type SplittedDate = {
  day: number,
  month: number,
  year: number,
};
type Appearance = {
  a: number,
  v: string,
};
type Appearances = {
  [key: number]: Appearance,
};
export type NameSettings = {
  pmN?: number,
  pmD?: number,
  pmC?: string,
};

type UngroupName = {
  v: number,
  L: string,
  c: number,
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

class Person {
  id: string;

  name: string;

  lastName: string;

  scdLastName: string;

  birthDate: Date;

  NOW: Date;

  fullName: string;

  nameView: string;

  karmic: number[];

  yearMet?: number;

  private memoizedValues: Map<string, any> = new Map();

  constructor({
    id, name, lastName, scdLastName, birthDate, yearMet,
  }: PersonProps) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.scdLastName = scdLastName;
    this.birthDate = parse(birthDate, 'yyyy-MM-dd', new Date());
    this.NOW = new Date();
    this.fullName = `${name} ${lastName} ${scdLastName}`;
    this.nameView = name;
    this.karmic = [13, 14, 16, 19];
    this.yearMet = yearMet;
  }

  private memoize<T>(key: string, fn: () => T): T {
    if (this.memoizedValues.has(key)) {
      return this.memoizedValues.get(key);
    }
    const result = fn();
    this.memoizedValues.set(key, result);
    return result;
  }

  getSingle(): boolean {
    return this.scdLastName !== '';
  }

  getYearTimeCurve(): number {
    return getYear(this.birthDate);
  }

  getInitials(): string {
    const names = this.name.split(' ');
    const initials = names.map((el) => el.toUpperCase().charAt(0));
    initials.push(this.lastName.toUpperCase().charAt(0));
    initials.push(this.scdLastName.toUpperCase().charAt(0));
    return initials.join(', ');
  }

  getFormBirthDate(): string {
    return format(this.birthDate, 'dd/MM/yyyy');
  }

  getBirthDate(): Date {
    return this.birthDate;
  }

  getDayOfBirth(): number {
    return getDate(this.birthDate);
  }

  getMonthOfBirth(): number {
    return getMonth(this.birthDate);
  }

  getYearOfBirth(): number {
    return getYear(this.birthDate);
  }

  getFormattedBirthDate(): string {
    return `${getDate(this.birthDate)} de ${getMonthName(this.getMonthOfBirth() + 1)} ${getYear(this.birthDate)}`;
  }

  getYearsOld(number?: number): number {
    const yearToCalculate = _.isNil(number) ? getYear(this.NOW) : number;
    let age = yearToCalculate - getYear(this.birthDate);
    if (age < 1) { age = 0; }
    return age;
  }

  calcAgeDigit(yearToCalculate?: number): number {
    return reduceNumber((this.getYearsOld(yearToCalculate) - 1) + this.getYearsOld(yearToCalculate));
  }

  /** ======================Pinnacle Calcs ==================== */

  /**
   * calculate Karma number
   * AKA: A
   * @returns {Number}
   */
  calcKarma(): number {
    return this.memoize('karma', () => reduceNumber(getMonth(this.birthDate) + 1));
  }

  /**
   * Calculate personal number
   *AKA: B
   * @returns {Number}
   */
  calcPersonalNumber(): number {
    return this.memoize('personalNumber', () => reduceNumber(getDate(this.birthDate)));
  }

  /**
   * calculate past life number
   * AKA: C
   * reduce birth date year to one digit
   * @returns {Number}
   */
  calcPastLife(): number {
    return this.memoize('pastLife', () => reduceNumber(getYear(this.birthDate)));
  }

  /**
   * calculate personality number
   * AKA: D
   * reduce sum of birth date numbers to one digit
   * @returns {Number}
   */
  calcPersonalityNumber(): number {
    return this.memoize('personalityNumber', () => reduceNumber(
      getDate(this.birthDate)
      + getMonth(this.birthDate) + 1
      + getYear(this.birthDate),
    ));
  }

  /**
 *Validate if D has two values
 * @returns {Number}
 */
  getDCheck(): number {
    const yearReduce = reduceNumber(getYear(this.birthDate));
    const monthReduce = reduceNumber(getMonth(this.birthDate) + 1);
    const dayReduce = reduceNumber(getDate(this.birthDate));
    const sumReduce = reduceNumber(yearReduce + monthReduce + dayReduce);
    return sumReduce;
  }

  /**
 *Validate if H has two values
 * @returns {Number}
 */
  getHCheck(): number {
    const monthReduce = reduceNumber(getMonth(this.birthDate) + 1);
    const yearReduce = reduceNumber(getYear(this.birthDate));
    const sumReduce = reduceNumber(monthReduce + yearReduce);

    return sumReduce;
  }

  /**
   * calculate unconscious number
   * AKA: I
   * reduce sum of first three life stages
   * @returns {Number}
   */
  calcUnconsciousNumber(): number {
    return reduceNumber(
      this.calcLifeStage(1)
      + this.calcLifeStage(2)
      + this.calcLifeStage(3),
    );
  }

  /**
   * calculate subconscious number
   * AKA: J
   * reduce sum of fourth life stage and personality number
   * @returns {Number}
   */
  calcSubconsciousNumber(): number {
    return reduceNumber(
      this.calcPersonalityNumber()
      + this.calcLifeStage(4),
    );
  }

  /**
   * calculate negative subconscious number
   * AKA: O
   * reduce sum of first three life goals
   * @returns {Number}
   */
  calcNegativeUnconsciousNumber(): number {
    return reduceNumber(
      this.calcLifeGoal(1)
      + this.calcLifeGoal(2)
      + this.calcLifeGoal(3),
    );
  }

  /**
 * calculate shade number
 * AKA: P
 * reduce sum of personality number and negative subconscious number
 * @returns {Number}
 */
  calcShadeNumber(): number {
    return reduceNumber(
      this.calcPersonalityNumber()
      + this.calcNegativeUnconsciousNumber(),
    );
  }

  /**
 * AKA: Q
 * reduce sum of first and third life goal
 * @returns {Number}
 */
  calcQ(): number {
    return reduceNumber(
      this.calcLifeGoal(1)
      + this.calcLifeGoal(3),
    );
  }

  /**
 * AKA: R
 * reduce sum of second and third life goal
 * @returns {Number}
 */
  calcR(): number {
    return reduceNumber(
      this.calcLifeGoal(2)
      + this.calcLifeGoal(3),
    );
  }

  /**
 * AKA: S
 * reduce sum of Q and R
 * @returns {Number}
 */
  calcS(): number {
    return reduceNumber(
      this.calcQ()
      + this.calcR(),
    );
  }

  /**
 *Get values of the letter  W
 *
 * @returns {String}
 */
  calcW(): string {
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
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < appearances.length; i++) {
      const num = appearances[i];
      occurrences[num] = (occurrences[num] || 0) + 1;
    }
    // Filtrar los números que aparecen exactamente 3 veces (triplicidad)
    // Multiplicar por 3 el número que tiene triplicidad y reducirlo
    const triplicities = Object.entries(occurrences)
      .filter((e) => e[1] === 3)
      .map((e) => reduceNumber(Number(e[0]) * 3));
    return triplicities.join(', ');
  }

  /**
 *Get the absences in the name
 * @returns {Array}
 */
  getAbsencesName(): string {
    const appearances = this.getAppearances();
    const absents = Object.entries(appearances).filter((el) => el[1].a === 0);
    const absentsTxt = Object.entries(absents).map((el) => el[1][0]);
    return absentsTxt.join(' ');
  }

  /**
 *get the Absences in the letters calcs
 * @returns {Array}
 */
  getAbsences(): string {
    const appearances: number[] = [
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
      this.getW(),
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

  /**
 *Get the appearances
 * @returns {Array}
 */
  getAppearances(): Appearances {
    const appearances: Appearances = {
      1: { a: 0, v: 'AJS' },
      2: { a: 0, v: 'BKT' },
      3: { a: 0, v: 'CLU' },
      4: { a: 0, v: 'DMV' },
      5: { a: 0, v: 'ENW' },
      6: { a: 0, v: 'FOX' },
      7: { a: 0, v: 'GPY' },
      8: { a: 0, v: 'HQZ' },
      9: { a: 0, v: 'IR' },
    };

    const letters = this.fullName.toLowerCase().replace(/\s/g, '');
    for (const letter of letters) {
      const val = reduceNumberForSub(inclusionValue(letter));
      appearances[val].a++;
    }
    return appearances;
  }

  /**
 * Calculate the reaction number
 * @returns {Number}
 */
  calcReaction(): number {
    return reduceNumber(
      this.getB() + this.getD(),
    );
  }

  /**
 * Calculate the Synthesis number
 * @returns {Number}
 */
  calcSynthesis(): number {
    return reduceNumber(
      this.getA()
      + this.getB()
      + this.getC()
      + this.getD()
      + this.calcReaction(),
    );
  }

  /**
 * Calculate the Gift number
 * @returns {Number}
 */
  calcGift(): number {
    let gift: number = reduceNumber(
      Number(getYear(this.birthDate).toString()[2])
      + Number(getYear(this.birthDate).toString()[3]),
    );
    if (gift === 0) {
      gift = Number(getYear(this.birthDate).toString()[1]);
    }
    if (gift === 0) {
      gift = Number(getYear(this.birthDate).toString()[0]);
    }
    if (gift === 0) {
      gift = Number(getYear(this.birthDate).toString()[0]);
    }
    return gift;
  }

  /**
   * calculate life stages
   * AKA: 1 => E
   * AKA: 2 => F
   * AKA: 3 => G
   * AKA: 4 => H
   * @returns {Number}
   */
  calcLifeStage(stage: number): number {
    const reducedYear = reduceNumber(getYear(this.birthDate));
    const reducedMonth = reduceNumber(getMonth(this.birthDate) + 1);
    const reducedDay = reduceNumber(getDate(this.birthDate));

    const stageOne = reduceNumberForSub(reducedMonth + reducedDay);
    if (stage === 1) return stageOne;

    const stageTwo = reduceNumber(reducedDay + reducedYear);
    if (stage === 2) return stageTwo;

    const stageThr = reduceNumber(stageOne + stageTwo);
    if (stage === 3) return stageThr;

    const stageFou = reduceNumber(getMonth(this.birthDate) + 1 + getYear(this.birthDate));
    if (stage === 4) return stageFou;

    if (stage === 5) return stageThr;
    if (stage === 6) return stageTwo;
    if (stage === 7) return stageOne;
    return 0;
  }

  /**
   * calculate life goals
   * AKA: 1 => K
   * AKA: 2 => L
   * AKA: 3 => M
   * AKA: 4 => N
   * @returns {Number}
   */
  calcLifeGoal(goal: number): number {
    let sumDay = reduceNumber(getDate(this.birthDate));
    sumDay = sumNumbers(sumDay);
    let sumMonth = reduceNumber(getMonth(this.birthDate) + 1);
    sumMonth = sumNumbers(sumMonth);
    let sumYear = reduceNumber(getYear(this.birthDate));
    sumYear = sumNumbers(sumYear);

    let goalOne = Math.abs(sumMonth - sumDay);
    if (goal === 1) return goalOne;

    let goalTwo = Math.abs(sumDay - sumYear);
    if (goal === 2) return goalTwo;

    goalOne = sumNumbers(goalOne);
    goalTwo = sumNumbers(goalTwo);
    const goalThr = Math.abs(goalOne - goalTwo);
    if (goal === 3) return goalThr;

    const goalFou = Math.abs(sumMonth - sumYear);
    if (goal === 4) return goalFou;
    return 0;
  }

  /**
 * Calculate de value of the full name
 * @returns {Number}
 */
  getNameCheck(): number {
    const names = this.fullName.toString().toLowerCase().split(' ');
    let nameValues = 0;
    let namev = 0;
    names.forEach((el) => {
      const vowels = el.split('');
      let val = 0;
      let val2 = 0;
      vowels.forEach((element) => { val += consonantValues(element); });
      vowels.forEach((element) => { val2 += vowelsValues(element); });
      nameValues += val;
      namev += val2;
    });
    return reduceNumber(nameValues + namev);
  }

  /**
 * Validate if the soul number has two values
 * @returns {Number}
 */
  getSoulCheck(): number {
    const names = this.nameView.toLowerCase().split(' ');
    const lastName = this.lastName.toLowerCase().split(' ');
    const scdLastName = this.scdLastName.toLowerCase().split(' ');
    let n = 0;
    let ln = 0;
    let sln = 0;

    names.forEach((el) => {
      const vowels = el.split('');
      let val = 0;
      vowels.forEach((element) => {
        val += vowelsValues(element);
      });
      n += val;
    });
    lastName.forEach((el) => {
      const vowels = el.split('');
      let val = 0;
      vowels.forEach((element) => {
        val += vowelsValues(element);
      });
      ln += val;
    });
    scdLastName.forEach((el) => {
      const vowels = el.split('');
      let val = 0;
      vowels.forEach((element) => {
        val += vowelsValues(element);
      });
      sln += val;
    });
    return reduceNumber(n + ln + sln);
  }

  /**
 * Validate if expresion soul number has two values
 * @returns {Number}
 */
  getExpressionSoulCheck(): number {
    const names = this.fullName.toString().toLowerCase().split(' ');
    let nameValues = 0;
    names.forEach((el) => {
      const vowels = el.split('');
      let val = 0;
      vowels.forEach((element) => {
        val += consonantValues(element);
      });
      nameValues += val;
    });
    return reduceNumber(nameValues);
  }

  /**
  * calculate name
  * @returns {Number} name value
  */
  calcName(): number {
    return this.memoize('name', () => reduceNumber(this.calcNameFull()));
  }

  /**
 * Calculate the value of full name
 * @returns {Number}
 */
  calcNameFull(): number {
    const names = this.name.toString().toLowerCase().toLowerCase().split(' ');
    const namesValues = [];
    const consultantValues = [];
    names.forEach((el) => {
      const letters = el.split('');
      let vowels = 0;
      let consonants = 0;
      letters.forEach((element) => {
        vowels += vowelsValues(element);
        consonants += consonantValues(element);
      });
      namesValues.push(reduceNumber(vowels));
      consultantValues.push(reduceNumber(consonants));
    });
    const lastnameConst = this.lastName.toString().toLowerCase().toLowerCase().split('');
    let lastnameVowelsValues = 0;
    let lastnameConstValues = 0;
    lastnameConst.forEach((element) => {
      lastnameVowelsValues += vowelsValues(element);
      lastnameConstValues += consonantValues(element);
    });
    namesValues.push(reduceNumber(lastnameVowelsValues));
    consultantValues.push(reduceNumber(lastnameConstValues));
    const scdLastnameConst = this.scdLastName.toString().toLowerCase().toLowerCase().split('');
    let scdLastnameVowelsValues = 0;
    let scdLastnameConstValues = 0;
    scdLastnameConst.forEach((element) => {
      scdLastnameVowelsValues += vowelsValues(element);
      scdLastnameConstValues += consonantValues(element);
    });
    namesValues.push(reduceNumber(scdLastnameVowelsValues));
    consultantValues.push(reduceNumber(scdLastnameConstValues));
    let total = 0;
    for (let index = 0; index < namesValues.length; index++) {
      total += reduceNumber(namesValues[index] + consultantValues[index]);
    }
    return total;
  }

  /**
 * Calculate value of initials
 * @returns {Number}
 */
  calcInitials(): number {
    const nameLetters = this.getInitials().toString().toLowerCase().toLowerCase()
      .split('');
    let nameVowelsValues = 0;
    nameLetters.forEach((e) => { nameVowelsValues += vowelsValues(e); });
    let nameConsonantsValue = 0;
    nameLetters.forEach((e) => { nameConsonantsValue += consonantValues(e); });
    const nameValue = reduceNumber(nameVowelsValues + nameConsonantsValue);
    return reduceNumber(nameValue);
  }

  /**
 * Show the soul number
 * @returns {Number}
 */
  calcSoulNumber(): number {
    return this.memoize('soulNumber', () => reduceNumber(this.calcSoulNumberFull()));
  }

  /**
 * Calculate the soul number
 * @returns {Number}
 */
  calcSoulNumberFull(): number {
    let nameValues = 0;
    const names = this.nameView.toString().toLowerCase().toLowerCase().split(' ');
    names.forEach((el) => {
      const vowels = el.split('');
      let val = 0;
      vowels.forEach((element) => {
        val += vowelsValues(element);
      });
      nameValues += reduceNumber(val);
    });

    const lastnameLetters = this.lastName.toString().toLowerCase().toLowerCase().split('');
    let lastnameVowelsValues = 0;
    lastnameLetters.forEach((element) => {
      lastnameVowelsValues += vowelsValues(element);
    });
    nameValues += reduceNumber(lastnameVowelsValues);
    const scdLastnameLetters = this.scdLastName.toString().toLowerCase().toLowerCase().split('');
    let scdLastnameVowelsValues = 0;
    scdLastnameLetters.forEach((element) => {
      scdLastnameVowelsValues += vowelsValues(element);
    });
    nameValues += reduceNumber(scdLastnameVowelsValues);
    return nameValues;
  }

  /**
 * Show the soul  expresion number
 * @returns {Number}
 */
  calcSoulExpression(): number {
    return this.memoize('soulExpression', () => reduceNumber(this.calcSoulExpresionFull()));
  }

  /**
 * Calculate the soul expresion number
 * @returns {Number}
 */
  calcSoulExpresionFull(): number {
    const fullName = this.fullName.toString().toLowerCase().toLowerCase().split(' ');
    let values2 = 0;
    fullName.forEach((letter) => {
      let val = 0;
      const consonantes = letter.split('');
      consonantes.forEach((el) => {
        val += consonantValues(el);
      });
      values2 += reduceNumber(val);
    });
    return values2;
  }

  /**
 * Calculate the maturity number
 * @returns {Number}
 */
  calcMaturity(): number {
    return reduceNumber(
      this.getD()
      + this.calcName(),
    );
  }

  /** ======================Personal Calcs ==================== */

  /**
   * calculate personal year
   * @param {Number} year
   * @returns {Number} personalYear
   * @memberof Numerology
   * @description
   * 1. Add the month and day of birth to the year of last birthday.
   * 2. Reduce this number to a single digit.
   * 3. Add this to the current year.
   * 4. Reduce this to a single digit.
   * 5. This is your Personal Year number for the current year.
   */
  calcPersonalYear(year?: number): number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(yearToCalculate + getMonth(this.birthDate) + 1 + getDate(this.birthDate));
  }

  /**
   * calculate personal month
   * @param {Number} month
   * @param {Number} year
   * @returns {Number} personalMonth
   */
  calcPersonalMonth(opts: SplittedDate): number {
    const monthToCalculate: number = opts.month;
    const yearToCalculate: number = opts.year;
    return reduceNumber(this.calcPersonalYear(yearToCalculate) + monthToCalculate);
  }

  /**
     * calculate personal week
     * reduce birth date day to one digit
     * @returns {Number}
     */
  calcPersonalWeek(opts: SplittedDate): number | string {
    const dayToCalculate = _.isNil(opts.day) ? getDate(this.NOW) : opts.day;
    const monthToCalculate: number = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const personalYear = this.calcPersonalYear(yearToCalculate);
    const sumPersonalWeekOne = reduceNumber(personalYear + monthToCalculate);
    if (dayToCalculate >= 1 && dayToCalculate <= 7) {
      return sumPersonalWeekOne;
    }
    const sumPersonalWeekTwo = reduceNumber(personalYear + sumPersonalWeekOne);
    if (dayToCalculate >= 8 && dayToCalculate <= 14) {
      return sumPersonalWeekTwo;
    }
    const sumPersonalWeekThree = reduceNumber(sumPersonalWeekTwo + sumPersonalWeekOne);
    if (dayToCalculate >= 15 && dayToCalculate <= 21) {
      return sumPersonalWeekThree;
    }
    const sumPersonalWeekFour = reduceNumber(monthToCalculate + sumPersonalWeekOne);
    if (dayToCalculate >= 22) {
      return sumPersonalWeekFour;
    }
    return `${sumPersonalWeekOne} ${sumPersonalWeekTwo} ${sumPersonalWeekThree} ${sumPersonalWeekFour}`;
  }

  /**
   * calculate personal day
   * @returns {Number} sumPersonalDay
   */
  calcPersonalDay(opts: SplittedDate): number {
    const dayToCalculate = _.isNil(opts.day) ? getDate(this.NOW) : opts.day;
    const monthToCalculate: number = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    return reduceNumber(this.calcPersonalYear(yearToCalculate) + dayToCalculate + monthToCalculate);
  }
  /**
 * calculate the universal year value
 * @param yearToCalculate
 * @returns {Number}
 */

  /**
 * Calculate a especific personal weeek
 * @param monthToCalculate
 * @param weekToCalculate
 * @param yearToCalculate
 * @returns {Number}
 */
  calcSelectPersonalWeek(weekToCalculate: 1 | 2 | 3 | 4, opts: SplittedDate): number {
    const monthToCalculate: number = opts.month;
    const yearToCalculate: number = opts.year;
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

  /** ======================Letter Pinnacle Calcs ==================== */

  getA(): number { return this.calcKarma(); }

  getB(): number { return this.calcPersonalNumber(); }

  getC(): number { return this.calcPastLife(); }

  getD(): number { return this.calcPersonalityNumber(); }

  getE(): number { return this.calcLifeStage(1); }

  getF(): number { return this.calcLifeStage(2); }

  getG(): number { return this.calcLifeStage(3); }

  getH(): number { return this.calcLifeStage(4); }

  getI(): number { return this.calcUnconsciousNumber(); }

  getJ(): number { return this.calcSubconsciousNumber(); }

  getK(): number { return this.calcLifeGoal(1); }

  getL(): number { return this.calcLifeGoal(2); }

  getM(): number { return this.calcLifeGoal(3); }

  getN(): number { return this.calcLifeGoal(4); }

  getO(): number { return this.calcNegativeUnconsciousNumber(); }

  getP(): number { return this.calcShadeNumber(); }

  getQ(): number { return this.calcQ(); }

  getR(): number { return this.calcR(); }

  getS(): number { return this.calcS(); }

  getW(): any { return this.calcW(); }

  /** ======================LifeStage Calcs ==================== */

  /**
   *
   * @returns {Boolean}
   * @description check if the person has a double life stage
   *    */
  hasDoubleStage(): boolean {
    const master = [11, 22];
    const D = this.getD();
    const dC = this.getDCheck();

    if ((master.includes(D) || master.includes(dC))) {
      return true;
    }
    return false;
  }

  calcLifeStageDuration(stage: number): number {
    const year = getYear(this.birthDate);
    const month = getMonth(this.birthDate) + 1;
    const day = getDate(this.birthDate);
    const reduced = reduceNumber(year + month + day);
    const stageOneEnd = year + 36 - reduced;
    if (stage === 1) return stageOneEnd;
    if (stage < 8) {
      const stageEnd = stageOneEnd + Math.abs((stage - 1) * 9);
      return stageEnd;
    }

    return 0;
  }

  calcDoubleLifeStageDuration(stage: number): number {
    const year = getYear(this.birthDate);
    const D = this.getD();
    const dC = this.getDCheck();
    let reduced = dC;
    if (D === dC) {
      if (D === 11) {
        reduced = 2;
      }
      if (D === 22) {
        reduced = 4;
      }
    }
    const stageOneEnd = year + 36 - reduced;
    if (stage === 1) return stageOneEnd;

    if (stage < 8) {
      const stageEnd = stageOneEnd + Math.abs((stage - 1) * 9);
      return stageEnd;
    }

    return 0;
  }

  /**
   * calculate current satge number
   * @returns {Number} stage
   */
  /* Función adaptada a Redux */
  getLifeStage(year: number): number {
    const yearToCompare = _.isNil(year) ? getYear(this.NOW) : year;
    const yearBirthDate = getYear(this.birthDate);
    const monthBirthDate = getMonth(this.birthDate) + 1;
    const dayBirthDate = getDate(this.birthDate);

    const reducedYear = reduceNumber(yearBirthDate);
    const reducedMonth = reduceNumber(monthBirthDate);
    const reducedDay = reduceNumber(dayBirthDate);

    const reduceSum = reduceNumberForSub(reducedYear + reducedMonth + reducedDay);

    const stageOne = reduceNumber(reducedMonth + reducedDay);
    const stageOneEnd = yearBirthDate + 36 - reduceSum;
    if (yearBirthDate <= yearToCompare && yearToCompare <= stageOneEnd) {
      return stageOne;
    }

    const stageTwo = reduceNumber(dayBirthDate + yearBirthDate);
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= yearToCompare && yearToCompare <= stageTwoEnd) {
      return stageTwo;
    }

    const stageThr = reduceNumber(stageOne + stageTwo);
    const stageThrEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= yearToCompare && yearToCompare <= stageThrEnd) {
      return stageThr;
    }

    const stageFou = reduceNumber(monthBirthDate + yearBirthDate);
    const stageFouEnd = stageThrEnd + 9;
    if (stageThrEnd <= yearToCompare && yearToCompare <= stageFouEnd) {
      return stageFou;
    }

    if (stageFouEnd <= yearToCompare && yearToCompare <= (stageFouEnd + 9)) {
      return stageThr;
    }
    if ((stageFouEnd + 9) <= yearToCompare && yearToCompare <= (stageFouEnd + 18)) {
      return stageTwo;
    }
    if ((stageFouEnd + 18) <= yearToCompare) {
      return stageOne;
    }
    return 0;
  }

  /**
   * calculate current stage name
   * @returns {Number} stage
   */

  getLifeStageNumber(opts: SplittedDate): number {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate: number = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const yearBirthDate = getYear(this.birthDate);
    const monthBirthDate = getMonth(this.birthDate) + 1;
    const dayBirthDate = getDate(this.birthDate);

    const reduceSum = reduceNumber(dayBirthDate + monthBirthDate + yearBirthDate);
    const stageOneEnd = yearBirthDate + 36 - reduceSum;
    if (yearBirthDate <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      if (yearToCalculate === stageOneEnd && monthBirthDate <= monthToCalculate) {
        return 2;
      }
      return 1;
    }
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      if (yearToCalculate === stageTwoEnd && monthBirthDate <= monthToCalculate) {
        return 3;
      }
      return 2;
    }

    const stageThrEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      if (yearToCalculate === stageThrEnd && monthBirthDate <= monthToCalculate) {
        return 4;
      }
      return 3;
    }
    const stageFouEnd = stageThrEnd + 9;
    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      if (yearToCalculate === stageFouEnd && monthBirthDate <= monthToCalculate) {
        return 5;
      }
      return 4;
    }

    if (stageFouEnd <= yearToCalculate && yearToCalculate <= (stageFouEnd + 9)) {
      if (yearToCalculate === (stageFouEnd + 9) && monthBirthDate <= monthToCalculate) {
        return 6;
      }
      return 5;
    }

    if ((stageFouEnd + 9) <= yearToCalculate && yearToCalculate <= (stageFouEnd + 18)) {
      if (yearToCalculate === (stageFouEnd + 18) && monthBirthDate <= monthToCalculate) {
        return 7;
      }
      return 6;
    }

    if ((stageFouEnd + 18) <= yearToCalculate) {
      return 7;
    }
    return 0;
  }

  getDoubleLifeStageNumber(opts: SplittedDate): number {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const yearBirthDate = getYear(this.birthDate);

    const D = this.getD();
    const dC = this.getDCheck();
    let reduceSum = dC;
    if (D === dC) {
      if (D === 11) {
        reduceSum = 2;
      }
      if (D === 22) {
        reduceSum = 4;
      }
    }

    const stageOneEnd = yearBirthDate + 36 - reduceSum;
    if (yearBirthDate <= yearToCalculate && yearToCalculate <= stageOneEnd) {
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

  annualReturn(opts: SplittedDate): AnnualReturn {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const age = (yearToCalculate - this.getYearOfBirth());
    const a = reduceNumber(yearToCalculate);
    const aK = reduceNumberISK(yearToCalculate);
    const A = `${a}${this.karmic.includes(aK) ? '*' : ''}`;
    const b = this.calcPersonalYear(yearToCalculate);
    const bK = reduceNumberISK(yearToCalculate + getMonth(this.birthDate) + 1 + getDate(this.birthDate));
    const B = `${b}${this.karmic.includes(bK) ? '*' : ''}`;
    const c = reduceNumber(age);
    const cK = reduceNumberISK(age);
    const C = `${c}${this.karmic.includes(cK) ? '*' : ''}`;
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

  nameCount() {
    const full = this.fullName.split(' ').join('');
    return full.length;
  }

  calcNameCycles() {
    return [1, 2, 3, 4, 5, 6].map((i) => this.nameCount() * i);
  }

  calcNameSubCycles() {
    const factor = (this.nameCount() / 2) / 2;
    const subCycles = [];
    let current = factor;
    while (current < 180) {
      subCycles.push(Math.round(current));
      current += factor;
    }

    return subCycles;
  }

  calcOneDigitYearsOld() {
    return reduceNumber(this.getYearsOld(getYear(this.NOW)));
  }

  getUngroupName(name: string = this.fullName): UngroupName[] {
    const letters = name.toLowerCase().replace(/\s/g, '');
    return letters.split('').map((letter) => ({
      v: vowelsValues(letter),
      L: letter.toUpperCase(),
      c: consonantValues(letter),
    }));
  }

  getUngroupNameValues(name: string = this.fullName) {
    const letters = name.toLowerCase().replace(/\s/g, '');
    const words = name.toLowerCase().split(' ');

    // Calcular sumas reducidas de vocales y consonantes por palabra
    const wordsSumVReduce: number = words
      .map((word) => reduceNumber(word.split('').reduce((acc, letter) => acc + vowelsValues(letter), 0)))
      .reduce((acc, sum) => acc + sum, 0);
    const wordsSumCReduce: number = words
      .map((word) => reduceNumber(word.split('').reduce((acc, letter) => acc + consonantValues(letter), 0)))
      .reduce((acc, sum) => acc + sum, 0);

    let unGroupNameV = 0;
    let unGroupNameC = 0;

    for (const letter of letters) {
      unGroupNameV += vowelsValues(letter);
      unGroupNameC += consonantValues(letter);
    }
    return [{
      v: unGroupNameV, L: '', c: unGroupNameC, vA: wordsSumVReduce, cA: wordsSumCReduce,
    }];
  }

  getUngroupNameTotal(name: string = this.fullName) {
    const letters = name.toLowerCase().replace(/\s/g, '');
    let ungroupNameV = 0;
    let ungroupNameC = 0;

    for (const letter of letters) {
      ungroupNameV += vowelsValues(letter);
      ungroupNameC += consonantValues(letter);
    }
    const checkReduced = reduceNumber(reduceNumber(ungroupNameV) + reduceNumber(ungroupNameC));
    return [{
      v: reduceNumber(ungroupNameV),
      L: reduceNumber(ungroupNameV + ungroupNameC),
      c: reduceNumber(ungroupNameC),
      vA: ungroupNameV,
      LA: ungroupNameV + ungroupNameC,
      cA: ungroupNameC,
      checkL: checkReduced,
    }];
  }

  getUngroupNameTotalFull(name: string = this.fullName) {
    const ungroupName = [];
    let ungroupNameV = 0;
    let ungroupNameC = 0;
    name.toLowerCase().split('').forEach((el) => {
      if (el !== ' ') {
        ungroupNameV += vowelsValues(el);
        ungroupNameC += consonantValues(el);
      }
    });
    ungroupName.push({
      v: reduceNumberISK(ungroupNameV),
      L: reduceNumberISK(ungroupNameV + ungroupNameC),
      c: ungroupNameC,
    });
    return ungroupName;
  }

  getNameSetting() {
    const nameSetting: NameSettings[] = [];
    const name = `${this.fullName.toLowerCase()} ${this.fullName.toLowerCase()}`;
    name.split('').forEach((el) => {
      const lValue = inclusionValue(el);
      for (let i = 1; i <= lValue; i++) {
        nameSetting.push({
          pmN: reduceNumber(i),
          pmD: lValue,
          pmC: el.toUpperCase(),
        });
      }
    });

    return nameSetting.slice(0, 186);
  }

  getDestinityTable() {
    const pmLetters = `${this.name.toString().toLowerCase()}`.toLowerCase().split('');

    const pMLetters = `${this.lastName.toString().toLowerCase()}`.toLowerCase().split('');

    const pfLetters = `${this.scdLastName.toString().toLowerCase()}`.toLowerCase().split('');

    const destiny: any = [];
    do {
      pmLetters.forEach((el) => {
        const lValue = letterValue(el);
        for (let i = 1; i <= lValue; i++) {
          destiny.push({
            pmN: reduceNumber(i),
            pmD: lValue,
            pmC: el.toUpperCase(),
          });
        }
      });
    } while (destiny.length < 180);

    let ipMLetters = 0;
    do {
      pMLetters.forEach((el) => {
        const lValue = letterValue(el);
        for (let i = 1; i <= lValue; i++) {
          if (destiny[ipMLetters]) {
            destiny[ipMLetters].pMN = reduceNumber(i);
            destiny[ipMLetters].pMD = lValue;
            destiny[ipMLetters].pMC = el.toUpperCase();
            ipMLetters++;
          }
        }
      });
    } while (ipMLetters < 180);

    let ipfLetters = 0;
    if (this.getSingle()) {
      do {
        pfLetters.forEach((el) => {
          const lValue = letterValue(el);
          for (let i = 1; i <= lValue; i++) {
            if (destiny[ipfLetters]) {
              destiny[ipfLetters].pfN = reduceNumber(i);
              destiny[ipfLetters].pfD = lValue;
              destiny[ipfLetters].pfC = el.toUpperCase();
              ipfLetters++;
            }
          }
        });
      } while (ipfLetters < 180);
    }

    return destiny.slice(0, 182);
  }

  /** ======================Time  Calcs ==================== */

  getCustomMonths(): string[] {
    const months = getAllMonths();
    const startMonth = getMonth(this.birthDate);
    return Array.from({ length: 13 }, (unused, index) => {
      const monthIndex = (startMonth + index) % 12;
      return months[monthIndex];
    });
  }

  /**
   * get nine year cycle
   * @returns {Number} nineYearCycle
   */
  getNineYearCycle(opts: SplittedDate): number[] {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    return Array.from({ length: 9 }, (unused, index) => yearToCalculate - 4 + index);
  }

  /**
   * get nine year cycle
   * @returns {Number} nineYearCycle2
   */
  getNineYearCycleStage(optsYear: number): number[] {
    const yearToCalculate = _.isNil(optsYear) ? getYear(this.NOW) : optsYear;
    let firstYear = 0;

    // Find first year with personal year 9
    for (let i = 0; i <= 9; i++) {
      const personalYear = this.calcPersonalYear(yearToCalculate - i);
      if (personalYear === 9) {
        firstYear = yearToCalculate - i;
        break;
      }
    }

    return Array.from({ length: 10 }, (unused, index) => firstYear + index);
  }

  /**
   * calculate first quarter
   * @returns {Number} quarter one
   */
  getQuarterOne(): number {
    return this.calcPastLife();
  }

  /**
     * calculate second quarter
     * @returns {Number} quarter two
     */
  getQuarterTwo(year: number): number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(yearToCalculate - this.calcPersonalityNumber());
  }

  /**
     * calculate third quarter
     * @returns {Number} quarter three
     */
  getQuarterThree(year: number): number {
    const yearToCalculate: number = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(this.getQuarterOne() + this.getQuarterTwo(yearToCalculate));
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

  /**
   * calculate current quarter
   * @param {Number} yearToCalculate
   * @returns {Number} current quarter
   */
  calcCurrentQuarter(month: number, year: number): number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const listOfMonths = this.getCustomMonths();
    const months = getAllMonths();
    const actualMonth = getMonthName(this.NOW.getMonth() + 1);
    const currentMonth = months.findIndex((i) => i === capitalize(actualMonth));
    const birthDateMonth = getMonthName(this.getMonthOfBirth() + 1);
    const index = listOfMonths.findIndex((i) => i === capitalize(actualMonth));
    // Use birth month index (0-11) instead of searching for 'Enero'
    const indexEnero = this.getMonthOfBirth();
    const shouldAdvanceStage = (currentMonth + 1) >= indexEnero;
    if (index < 5) {
      if (birthDateMonth === actualMonth && getDate(this.birthDate) > 20) {
        return this.getQuarterThree(yearToCalculate - 1);
      }
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

  /** ======================Karmics Calcs ==================== */

  getAISK(): string {
    const A = reduceNumberISK(getMonth(this.birthDate) + 1);
    return this.karmic.includes(A) ? '*' : '';
  }

  getBISK(): string {
    const B = reduceNumberISK(getDate(this.birthDate) + 1);
    return this.karmic.includes(B) ? '*' : '';
  }

  getCISK(): string {
    const C = reduceNumberISK(getYear(this.birthDate));
    return this.karmic.includes(C) ? '*' : '';
  }

  getDISK(): string {
    const D = reduceNumberISK(
      getDate(this.birthDate)
      + getMonth(this.birthDate) + 1
      + getYear(this.birthDate),
    );
    return this.karmic.includes(D) ? '*' : '';
  }

  getDISKCheck(): string {
    const D = reduceNumberISK(
      reduceNumber(getDate(this.birthDate))
      + reduceNumber(getMonth(this.birthDate) + 1)
      + reduceNumber(getYear(this.birthDate)),
    );
    return this.karmic.includes(D) ? '*' : '';
  }

  getEISK(): string {
    const reducedMonth = reduceNumber(getMonth(this.birthDate) + 1);
    const reducedDay = reduceNumber(getDate(this.birthDate));
    const stageOne = reduceNumberISK(reducedMonth + reducedDay);

    return this.karmic.includes(stageOne) ? '*' : '';
  }

  getEISKCheck(): string {
    const reducedMonth = getMonth(this.birthDate) + 1;
    const reducedDay = getDate(this.birthDate);
    const stageOne = reduceNumberISK(reducedMonth + reducedDay);

    return this.karmic.includes(stageOne) ? '*' : '';
  }

  getFISK(): string {
    const reducedDay = reduceNumber(getDate(this.birthDate));
    const reducedYear = reduceNumber(getYear(this.birthDate));
    const stageTwo = reduceNumberISK(reducedDay + reducedYear);

    return this.karmic.includes(stageTwo) ? '*' : '';
  }

  getFISKCheck(): string {
    const reducedDay = getDate(this.birthDate);
    const reducedYear = getYear(this.birthDate);
    const stageTwo = reduceNumberISK(reducedDay + reducedYear);

    return this.karmic.includes(stageTwo) ? '*' : '';
  }

  getGISK(): string {
    const stageThr = reduceNumberISK(this.getE() + this.getF());

    return this.karmic.includes(stageThr) ? '*' : '';
  }

  getHISK(): string {
    const reduceMonth = reduceNumber(getMonth(this.birthDate) + 1);
    const reduceYear = reduceNumber(getYear(this.birthDate));
    const stageFou = reduceNumberISK(reduceMonth + reduceYear);
    return this.karmic.includes(stageFou) ? '*' : '';
  }

  getHISKCheck(): string {
    const reduceMonth = getMonth(this.birthDate) + 1;
    const reduceYear = getYear(this.birthDate);
    const stageFou = reduceNumberISK(reduceMonth + reduceYear);
    return this.karmic.includes(stageFou) ? '*' : '';
  }

  getIISK(): string {
    const unconsciousNumber = reduceNumberISK(
      this.calcLifeStage(1)
      + this.calcLifeStage(2)
      + this.calcLifeStage(3),
    );
    return this.karmic.includes(unconsciousNumber) ? '*' : '';
  }

  getJISK(): string {
    const subconsciousNumber = reduceNumberISK(
      this.calcPersonalityNumber()
      + this.calcLifeStage(4),
    );
    return this.karmic.includes(subconsciousNumber) ? '*' : '';
  }

  calcLifeStageISK(stage: number): string {
    const reducedYear = reduceNumber(getYear(this.birthDate));
    const reducedMonth = reduceNumber(getMonth(this.birthDate) + 1);
    const reducedDay = reduceNumber(getDate(this.birthDate));

    const stageOne = reduceNumberISK(reducedMonth + reducedDay);
    if (stage === 1) return this.karmic.includes(stageOne) ? '*' : '';

    const stageTwo = reduceNumberISK(reducedDay + reducedYear);
    if (stage === 2) return this.karmic.includes(stageTwo) ? '*' : '';

    const stageThr = reduceNumberISK(stageOne + stageTwo);
    if (stage === 3) return this.karmic.includes(stageThr) ? '*' : '';

    const stageFou = reduceNumberISK(getMonth(this.birthDate) + 1 + getYear(this.birthDate));
    if (stage === 4) return this.karmic.includes(stageFou) ? '*' : '';

    if (stage === 5) return this.karmic.includes(stageThr) ? '*' : '';
    if (stage === 6) return this.karmic.includes(stageTwo) ? '*' : '';
    if (stage === 7) return this.karmic.includes(stageOne) ? '*' : '';
    return '';
  }

  calcReactionISK(): string {
    const reaction = reduceNumberISK(
      this.getB() + this.getD(),
    );
    return this.karmic.includes(reaction) ? '*' : '';
  }

  calcSynthesisISK(): string {
    const synthesis = reduceNumberISK(
      this.getA()
      + this.getB()
      + this.getC()
      + this.getD()
      + this.calcReaction(),
    );
    return this.karmic.includes(synthesis) ? '*' : '';
  }

  calcGiftISK(): string {
    let gift = reduceNumberISK(
      Number(getYear(this.birthDate).toString()[2])
      + Number(getYear(this.birthDate).toString()[3]),
    );
    if (gift === 0) {
      gift = Number(getYear(this.birthDate).toString()[1]);
    }
    if (gift === 0) {
      gift = Number(getYear(this.birthDate).toString()[0]);
    }
    return this.karmic.includes(gift) ? '*' : '';
  }

  getNameCheckISK(): string {
    const names = this.fullName.toString().toLowerCase().split(' ');
    let nameValues = 0;
    let named = 0;
    names.forEach((el) => {
      const vowels = el.split('');
      let val = 0;
      let val2 = 0;
      vowels.forEach((element) => {
        val += consonantValues(element);
      });
      vowels.forEach((element) => {
        val2 += vowelsValues(element);
      });
      nameValues += val;
      named += val2;
    });
    const name = reduceNumberISK(nameValues + named);
    return this.karmic.includes(name) ? '*' : '';
  }

  calcNameISK(): string {
    const nameLetters = this.name.toString().toLowerCase().toLowerCase().split('');
    let nameVowelsValues = 0;
    nameLetters.forEach((e) => { nameVowelsValues += vowelsValues(e); });
    let nameConsonantsValue = 0;
    nameLetters.forEach((e) => { nameConsonantsValue += consonantValues(e); });
    const nameValue = reduceNumber(nameVowelsValues + nameConsonantsValue);
    const lastnameLetters = `${this.lastName.toString().toLowerCase()} ${this.scdLastName.toString().toLowerCase()}`.toLowerCase().split('');
    let lastnameVowelsValues = 0;
    lastnameLetters.forEach((e) => { lastnameVowelsValues += vowelsValues(e); });
    let lastnameConsonantsValue = 0;
    lastnameLetters.forEach((e) => { lastnameConsonantsValue += consonantValues(e); });
    const lastnameValue = reduceNumber(lastnameVowelsValues + lastnameConsonantsValue);
    const name = reduceNumberISK(nameValue + lastnameValue);
    if (this.calcName() === 22 || this.calcName() === 11) {
      return '';
    }
    return this.karmic.includes(name) ? '*' : '';
  }

  calcSoulNumberISK(): string {
    const nameLetters = this.name.toString().toLowerCase().toLowerCase().split('');
    let nameVowelsValues = 0;
    nameLetters.forEach((element) => {
      nameVowelsValues += vowelsValues(element);
    });
    const lastnameLetters = `${this.lastName.toString().toLowerCase()} ${this.scdLastName.toString().toLowerCase()}`.toLowerCase().split('');
    let lastnameVowelsValues = 0;
    lastnameLetters.forEach((element) => {
      lastnameVowelsValues += vowelsValues(element);
    });
    const soulNumber = reduceNumberISK(nameVowelsValues + lastnameVowelsValues);
    return this.karmic.includes(soulNumber) ? '*' : '';
  }

  calcSoulExpressionISK(): string {
    const nameConsonants = this.name.toString().toLowerCase().toLowerCase().split('');
    let nameConsonantsValue = 0;
    nameConsonants.forEach((element) => {
      nameConsonantsValue += consonantValues(element);
    });
    const lastnameConsonants = `${this.lastName.toString().toLowerCase()} ${this.scdLastName.toString().toLowerCase()}`.toLowerCase().split('');
    let lastnameConsonantsValue = 0;
    lastnameConsonants.forEach((element) => {
      lastnameConsonantsValue += consonantValues(element);
    });
    const soulExp = reduceNumberISK(nameConsonantsValue + lastnameConsonantsValue);
    return this.karmic.includes(soulExp) ? '*' : '';
  }

  calcMaturityISK(): string {
    const maturity = reduceNumberISK(
      this.getD()
      + this.calcName(),
    );
    return this.karmic.includes(maturity) ? '*' : '';
  }

  calcPersonalYearISK(year: number): string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const personalYear = reduceNumberISK(yearToCalculate + getMonth(this.birthDate) + 1 + getDate(this.birthDate));
    return this.karmic.includes(personalYear) ? '*' : '';
  }

  calcPersonalMonthISK(opts: SplittedDate): string {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate: number = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const personalMonth = reduceNumberISK(this.calcPersonalYear(yearToCalculate) + monthToCalculate);
    return this.karmic.includes(personalMonth) ? '*' : '';
  }

  calcPersonalWeekISK(opts: SplittedDate): string {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate: number = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const dayToCalculate = _.isNil(opts.day) ? getDate(this.NOW) : opts.day;
    const personalYear = this.calcPersonalYear(yearToCalculate);
    const sumPersonalWeekOne = reduceNumberISK(personalYear + monthToCalculate);
    if (dayToCalculate >= 1 && dayToCalculate <= 7) {
      return this.karmic.includes(sumPersonalWeekOne) ? '*' : '';
    }

    const sumPersonalWeekTwo = reduceNumberISK(personalYear + sumPersonalWeekOne);
    if (dayToCalculate >= 8 && dayToCalculate <= 14) {
      return this.karmic.includes(sumPersonalWeekTwo) ? '*' : '';
    }

    const sumPersonalWeekThree = reduceNumberISK(sumPersonalWeekTwo + sumPersonalWeekOne);
    if (dayToCalculate >= 15 && dayToCalculate <= 21) {
      return this.karmic.includes(sumPersonalWeekThree) ? '*' : '';
    }

    const sumPersonalWeekFour = reduceNumberISK(monthToCalculate + sumPersonalWeekOne);
    if (dayToCalculate >= 22) {
      return this.karmic.includes(sumPersonalWeekFour) ? '*' : '';
    }
    return '';
  }

  calcPersonalDayISK(opts: SplittedDate): string {
    const yearToCalculate = _.isNil(opts.year) ? getYear(this.NOW) : opts.year;
    const monthToCalculate: number = _.isNil(opts.month) ? getMonth(this.NOW) + 1 : opts.month;
    const dayToCalculate = _.isNil(opts.day) ? getDate(this.NOW) : opts.day;
    const personalDay = reduceNumberISK(this.calcPersonalYear(yearToCalculate) + dayToCalculate + monthToCalculate);
    return this.karmic.includes(personalDay) ? '*' : '';
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

  getLifeStageISK(year: number): string {
    const yearToCompare = _.isNil(year) ? getYear(this.NOW) : year;
    const yearBirthDate = getYear(this.birthDate);
    const monthBirthDate = getMonth(this.birthDate) + 1;
    const dayBirthDate = getDate(this.birthDate);

    const reducedYear = reduceNumber(yearBirthDate);
    const reducedMonth = reduceNumber(monthBirthDate);
    const reducedDay = reduceNumber(dayBirthDate);

    const reduceSum = reduceNumberForSub(reducedYear + reducedMonth + reducedDay);

    const stageOne = reduceNumberISK(reducedMonth + reducedDay);
    const stageOneEnd = yearBirthDate + 36 - reduceSum;
    if (yearBirthDate <= yearToCompare && yearToCompare <= stageOneEnd) {
      return this.karmic.includes(stageOne) ? '*' : '';
    }

    const stageTwo = reduceNumberISK(dayBirthDate + yearBirthDate);
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= yearToCompare && yearToCompare <= stageTwoEnd) {
      return this.karmic.includes(stageTwo) ? '*' : '';
    }

    const stageThr = reduceNumber(stageOne + stageTwo);
    const stageThrEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= yearToCompare && yearToCompare <= stageThrEnd) {
      return this.karmic.includes(stageThr) ? '*' : '';
    }

    const stageFou = reduceNumber(monthBirthDate + yearBirthDate);
    const stageFouEnd = stageThrEnd + 9;
    if (stageThrEnd <= yearToCompare && yearToCompare <= stageFouEnd) {
      return this.karmic.includes(stageFou) ? '*' : '';
    }

    if (stageFouEnd <= yearToCompare && yearToCompare <= (stageFouEnd + 9)) {
      return this.karmic.includes(stageThr) ? '*' : '';
    }
    if ((stageFouEnd + 9) <= yearToCompare && yearToCompare <= (stageFouEnd + 18)) {
      return this.karmic.includes(stageTwo) ? '*' : '';
    }
    if ((stageFouEnd + 18) <= yearToCompare) {
      return this.karmic.includes(stageOne) ? '*' : '';
    }
    return '';
  }

  getQuarterOneISK(): string {
    const quarterOne = reduceNumberISK(getYear(this.birthDate));
    return this.karmic.includes(quarterOne) ? '*' : '';
  }

  getQuarterTwoISK(year: number): string {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const quarterTwo = reduceNumberISK(yearToCalculate - this.calcPersonalityNumber());
    return this.karmic.includes(quarterTwo) ? '*' : '';
  }

  getQuarterThreeISK(year: number): string {
    const yearToCalculate: number = _.isNil(year) ? getYear(this.NOW) : year;
    const quarterThree = reduceNumberISK(this.getQuarterOne() + this.getQuarterTwo(yearToCalculate));
    return this.karmic.includes(quarterThree) ? '*' : '';
  }

  calcCurrentQuarterISK(month: number, year: number): string {
    const monthToCalculate = _.isNil(month) ? getMonth(this.NOW) + 1 : month;
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    const listOfMonths = this.getCustomMonths();
    const actualMonth = getMonthName(monthToCalculate);
    const birthDateMonth = getMonthName(this.getMonthOfBirth() + 1);
    const index = listOfMonths.findIndex((i) => i === capitalize(actualMonth));
    // Use birth month index (0-11) instead of searching for 'Enero'
    const indexEnero = this.getMonthOfBirth();
    if (index < 5) {
      if (birthDateMonth === actualMonth && getDate(this.birthDate) > 20) {
        return this.getQuarterThreeISK(yearToCalculate - 1);
      }
      return this.getQuarterOneISK();
    }
    if (index > 4 && index < 9) {
      if (indexEnero === 0) {
        return this.getQuarterTwoISK(yearToCalculate);
      }
      if (index >= indexEnero) {
        return this.getQuarterTwoISK(yearToCalculate - 1);
      }
      return this.getQuarterTwoISK(yearToCalculate);
    }
    if (index > 8) {
      if (indexEnero === 0) {
        return this.getQuarterThreeISK(yearToCalculate);
      }
      if (index >= indexEnero) {
        return this.getQuarterThreeISK(yearToCalculate - 1);
      }
      return this.getQuarterThreeISK(yearToCalculate);
    }
    return '';
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

  /** ======================Compatibility Methods ==================== */

  private compatibilityObject(): Record<number, Record<string, number[]>> {
    const table = {
      1: {
        pn: [1, 5, 7, 11], pc: [2, 3, 9], pd: [4, 6, 22], pne: [8],
      },
      2: {
        pn: [2, 4, 8, 22], pc: [1, 3, 6, 9], pd: [5, 7, 11], pne: [],
      },
      3: {
        pn: [3, 6, 9], pc: [1, 2, 5], pd: [4, 7, 8, 11, 22], pne: [],
      },
      4: {
        pn: [2, 4, 8, 22], pc: [6, 7, 11], pd: [1, 3, 5, 9], pne: [],
      },
      5: {
        pn: [1, 5, 7, 11], pc: [3, 9], pd: [2, 4, 6, 22], pne: [8],
      },
      6: {
        pn: [3, 6, 9], pc: [2, 4, 8, 22], pd: [1, 5, 7, 11], pne: [],
      },
      7: {
        pn: [1, 5, 7, 11], pc: [4, 22], pd: [2, 3, 6, 8, 9], pne: [],
      },
      8: {
        pn: [2, 4, 8, 22], pc: [6], pd: [3, 7, 9, 11], pne: [1, 5],
      },
      9: {
        pn: [3, 6, 9], pc: [1, 2, 5], pd: [4, 7, 8, 11, 22], pne: [],
      },
      11: {
        pn: [1, 5, 7, 11], pc: [4, 8, 22], pd: [2, 3, 6, 9], pne: [],
      },
      22: {
        pn: [2, 4, 8, 22], pc: [6, 7, 11], pd: [1, 3, 5, 9], pne: [],
      },
    };
    return table;
  }

  getCompatibility(number: number, partnerN: number): string {
    const table = this.compatibilityObject();
    const tableNumber = table[number];

    if (!tableNumber) {
      return 'NOT FOUND';
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of Object.entries(tableNumber)) {
      if (v.includes(partnerN)) {
        return k.toUpperCase();
      }
    }

    return 'NOT FOUND';
  }
}
export default Person;
