import useConsult from '@/hooks/useConsult';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';
import CurrentQuarterFont from './CurrentQuarterFont';

export default function QuarterPerYear({ isGroup, isSynastry }: { isGroup: boolean, isSynastry: boolean }) {
  const { consultant, calculationDate } = useConsult();
  const { t } = useTranslation();
  if (!consultant) return null;
  const listOfMonths = consultant.getCustomMonths();
  // Use birth month index (0-11) instead of searching for 'Enero'
  const indexOfMonth = listOfMonths.findIndex((i) => i === capitalize(t('months.january') as string));
  const nineYearCycle = consultant.getNineYearCycle(calculationDate);
  const bornFirst = consultant.getDayOfBirth();
  const newDate = calculationDate;

  return (
    <div
      id="destinityTable"
      className="flex overflow-x-auto w-full"
    >
      <div className="grid grid-cols-11 grid-rows-14 w-full mx-4 my-8 ">
        <div className="col-start-1 col-end-3 row-start-1  flex justify-start items-center bg-main p-1 text-white font-bold border border-gray-500">
          {t('headers.calendarYear')}
        </div>
        <div className="col-start-1 col-end-3  row-start-2 flex justify-start items-center p-1 bg-purple-30 font-bold border border-gray-500">
          {t('headers.personalYear')}
        </div>
        <CurrentQuarterFont isGroup={isGroup} isSynastry={isSynastry} />
        {listOfMonths.map((data, index) => (
          <>
            {data === capitalize(t('months.january') as string) && index < 12 ? (
              <div
                className={`${
                  index === 0 ? 'row-start-14 ' : `row-start-${index + 2} `
                }  col-start-1 border-b-4 border-yellow-300 col-span-12`}
              />
            ) : (
              ''
            )}
            <div
              key={data}
              className={`${
                index % 2 === 0 ? 'bg-gray-300 ' : 'bg-gray-100 '
              } col-start-1 col-end-3 row-start-${
                index + 3
              }  flex justify-start items-center border border-gray-500 p-1 `}
            >
              {data}
            </div>
            {/* (index===0&&data ==='Enero')?<div className={`row-start-${index+4} col-start-7 flex justify-center text-gray-500`}>2022</div>:'' */}
          </>
        ))}
        {nineYearCycle.map((year, i) => (
          <>
            <div
              className={` ${
                newDate.year === year ? 'text-yellow-500 ' : ''
              } col-start-${
                i + 3
              } row-start-1 flex justify-center items-center  bg-main text-white font-bold border border-gray-500`}
            >
              {year}
            </div>
            <div
              className={` ${
                newDate.year === year ? 'font-bold ' : ''
              }col-start-${
                i + 3
              } row-start-2 flex justify-center items-center p-1 bg-purple-30 border border-gray-500`}
            >
              {consultant.calcPersonalYear(year)}
              {consultant.calcPersonalYearISK(year)}
            </div>
            <div
              className={`
        ${
          (year === newDate.year || year === newDate.year - 1)
          && indexOfMonth >= 1
          && indexOfMonth <= 4
            ? 'font-bold '
            : ''
        }
        ${
          year === newDate.year && indexOfMonth >= 5 && indexOfMonth <= 8
            ? 'font-bold '
            : ''
        }
        ${indexOfMonth === 0 && year === newDate.year ? 'font-bold ' : ''}
        ${
          indexOfMonth >= 9 && indexOfMonth <= 11 && year === newDate.year
            ? 'font-bold '
            : ''
        }
        col-start-${i + 3}  row-start-3 ${
          bornFirst === 1 ? 'row-span-4' : 'row-span-5'
        }  text-5xl flex justify-center items-center border border-gray-500 text-gray-500 `}
            >
              {consultant.getQuarterOne()}
              {consultant.getQuarterOneISK()}
            </div>
            <div
              className={`
        ${
          year === newDate.year - 1 && indexOfMonth >= 1 && indexOfMonth <= 4
            ? 'font-bold '
            : ''
        }
        ${indexOfMonth === 0 && year === newDate.year ? 'font-bold ' : ''}
        ${
          (year === newDate.year - 1 || year === newDate.year)
          && indexOfMonth > 5
          && indexOfMonth <= 8
            ? 'font-bold '
            : ''
        }
        ${indexOfMonth === 9 && year === newDate.year - 1 ? 'font-bold ' : ''}
        ${indexOfMonth === 5 && year === newDate.year - 1 ? 'font-bold ' : ''}
        ${
          indexOfMonth >= 9 && indexOfMonth <= 11 && year === newDate.year
            ? 'font-bold '
            : ''
        }
        ${year !== newDate.year ? 'text-gray-500' : ''}
        col-start-${i + 3} ${
          bornFirst === 1 ? 'row-start-7' : 'row-start-8'
        }  row-span-4  text-5xl flex justify-center items-center border border-gray-500 text-gray-500`}
            >
              {consultant.getQuarterTwo(year)}
              {consultant.getQuarterTwoISK(year)}
            </div>
            <div
              className={`
      ${indexOfMonth === 0 && year === newDate.year ? ' font-bold' : ''}
      ${indexOfMonth === 0 && year === newDate.year - 1 ? ' font-bold ' : ''}
      ${
        indexOfMonth > 9
        && indexOfMonth <= 11
        && (year === newDate.year || year === newDate.year - 1)
          ? ' font-bold '
          : ''
      }
      ${indexOfMonth === 9 && year === newDate.year - 1 ? ' font-bold ' : ''}
      ${
        year === newDate.year - 1 && indexOfMonth >= 5 && indexOfMonth <= 8
          ? ' font-bold '
          : ''
      }
      ${
        year === newDate.year - 1 && indexOfMonth >= 1 && indexOfMonth <= 4
          ? ' font-bold '
          : ''
      }
      ${year !== newDate.year ? 'text-gray-500' : ''}
      col-start-${i + 3} ${
        bornFirst === 1 ? 'row-start-11' : 'row-start-12'
      }  row-span-4  text-5xl flex justify-center items-center border border-gray-500 text-gray-500 `}
            >
              {consultant.getQuarterThree(year)}
              {consultant.getQuarterThreeISK(year)}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
