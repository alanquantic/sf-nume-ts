/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import cx from 'classnames';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import CircleNumber from '@/components/CircleNumber';
import { AnnualReturn as AnnualReturnCalc } from '@/resources/Person';

type AnnualReturnProps = {
  size: 'xs' | 'xl';
  annualReturn: AnnualReturnCalc;
  current?: boolean;
  months?: boolean;
  group?: boolean;
  personalYear?: number;
  yearsOld?: number;
  year?: number;
};

function AnnualReturn({
  annualReturn, current, months, group, personalYear, yearsOld, year, size,
}: AnnualReturnProps) {
  const { t } = useTranslation();
  const fontSize = { xs: 'xs', xl: 'xl' };
  // const marginBottom = { xs: '4' };

  // TODO: refactor this
  const calcAge = (age: number, year: number) => {
    const Age = age;
    const Year = year;

    const yearsOld = [age];
    const years = [year];

    while (age - 9 > 0 && yearsOld.length < 9) {
      age -= 9;
      yearsOld.push(age);

      year -= 9;
      years.push(year);
    }
    if (yearsOld.length < 9) {
      age = Age;
      year = Year;
      while (age + 9 > 0 && yearsOld.length < 9) {
        age += 9;
        yearsOld.unshift(age);
        year += 9;
        years.unshift(year);
      }
    }
    yearsOld.reverse();
    years.reverse();
    const table = yearsOld.map((e, i) => [e, years[i]]);
    return Object.entries(table);
  };

  return (
    <div className="relative">
      {months && (
        <div className="m-auto left-0 right-0 grid grid-cols-12 absolute top-12">
          <div className="text-11 border border-blue text-blue text-center">{_.toUpper(t('jan') as string)}</div>
          <div className="text-11 border border-blue text-blue text-center">{_.toUpper(t('feb') as string)}</div>
          <div className="text-11 border border-blue text-blue text-center">{_.toUpper(t('mar') as string)}</div>
          <div className="text-11 border border-blue text-blue text-center">{_.toUpper(t('apr') as string)}</div>
          <div className="text-11 border border-pink text-pink text-center">{_.toUpper(t('may') as string)}</div>
          <div className="text-11 border border-pink text-pink text-center">{_.toUpper(t('jun') as string)}</div>
          <div className="text-11 border border-pink text-pink text-center">{_.toUpper(t('jul') as string)}</div>
          <div className="text-11 border border-pink text-pink text-center">{_.toUpper(t('aug') as string)}</div>
          <div className="text-11 border border-green text-green-table text-center">{_.toUpper(t('sep') as string)}</div>
          <div className="text-11 border border-green text-green-table text-center">{_.toUpper(t('oct') as string)}</div>
          <div className="text-11 border border-green text-green-table text-center">{_.toUpper(t('nov') as string)}</div>
          <div className="text-11 border border-green text-green-table text-center">{_.toUpper(t('dec') as string)}</div>
        </div>
      )}
      <div className={`annual-grid ${group === true ? 'ml-28' : 'm-auto'} relative w-44`}>
        {(group === true && personalYear !== undefined && yearsOld !== undefined && year !== undefined)
          ? (
            <>
              <h2 className="text-xl font-extrabold text-center mt-5">
                {t('pinnacle.annualReturns.personalYear')}
                <br />
                {personalYear}
              </h2>
              <ul className="absolute -left-24 border -top-4 border-gray-300">
                <li className="grid grid-cols-2 text-13 bg-main text-white text-center font-bold">
                  <div className="p-1">{t('pinnacle.annualReturns.year')}</div>
                  <div className="p-1">{t('pinnacle.annualReturns.age')}</div>
                </li>
                {
                  calcAge(yearsOld, year).map((e, i) => (
                    <li
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      className={cx(
                        'grid grid-cols-2 text-13 text-center',
                        `${i % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`,
                        `${year === e[1][1] && current ? 'bg-gold' : ''}`,
                      )}
                    >
                      <div className="p-1 text-gray-600">{e[1][1]}</div>
                      <div className="p-1 text-gray-600">{e[1][0]}</div>
                    </li>
                  ))
                }
              </ul>
            </>
          )
          : (
            <div className="grid grid-cols-3 mb-4">
              <div className={`text-${fontSize[size] || 'xl'} font-bold border border-black border-opacity-50 flex justify-center items-center h-10 rounded-lg`}>
                {annualReturn.yearToCalculate}
              </div>
              <div className="arrow-annual-return" />
              <div className={`text-${fontSize[size] || 'base'} font-bold flex justify-center items-center h-10 rounded-lg`}>
                {annualReturn.age}
                {' '}
                {t('pinnacle.annualReturns.years')}
              </div>
            </div>
          )}
        <div className="grid grid-cols-5 gap-2 relative pt-10">
          <img src="/assets/annual-polygon.svg" className="absolute w-full h-full object-contain top-5" alt="bk" />
          {current && (
            <img src="/assets/annual-polygon-active.svg" className="absolute w-full h-full object-contain top-5" alt="bk" />
          )}

          <CircleNumber size="xs" appearance="white" border="red" position="vf" borderWidth={current ? '4' : '1'}>
            {annualReturn.F}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="red" position="vd">
            {annualReturn.D}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="red" position="vg" borderWidth={current ? '4' : '1'}>
            {annualReturn.G}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="red" position="ve">
            {annualReturn.E}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="purple" position="va">
            {annualReturn.A}
          </CircleNumber>
          <CircleNumber size="xs" appearance="purple-30" border={current ? 'main' : 'purple'} position="vb" borderWidth={current ? '4' : '1'}>
            {annualReturn.B}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="purple" position="vc">
            {annualReturn.C}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="green" position="vh">
            {annualReturn.H}
          </CircleNumber>
        </div>
      </div>
    </div>
  );
}

AnnualReturn.defaultProps = {
  current: false,
  months: false,
  group: false,
  personalYear: undefined,
  yearsOld: undefined,
  year: undefined,
};

export default AnnualReturn;
