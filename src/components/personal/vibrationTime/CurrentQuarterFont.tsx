/* eslint-disable max-len */
import useConsult from '@/hooks/useConsult';
import { capitalize } from '@/utils/numbers';
import { useTranslation } from 'react-i18next';

function CurrentQuarterFont({ isGroup, isSynastry }: { isGroup: boolean, isSynastry: boolean }) {
  const { consultant, calculationDate } = useConsult();
  const { t } = useTranslation();
  if (!consultant) return null;
  const listOfMonths = consultant.getCustomMonths();
  const indexOfMonth = listOfMonths.findIndex((i) => i === capitalize(t('months.january')));
  const nineYearCycle = consultant.getNineYearCycle(calculationDate);
  const bornFirst = consultant.getDayOfBirth();

  if (indexOfMonth === 0) {
    if (isGroup || isSynastry) {
      return (
        <>
          <div className="col-start-7 row-span-4 row-start-8 bg-active-radial" />
          <div className="col-start-7 row-span-3 row-start-12 bg-active-radial" />
          <div className="col-start-7 row-span-5 row-start-3 bg-active-radial" />
          {nineYearCycle.map((d, i) => (
            <div
              key={d}
              className={`row-start-3 col-start-${
                i + 3
              } flex justify-center text-gray-500`}
            >
              {d}
            </div>
          ))}
        </>
      );
    }
    return (
      <>
        <div className="col-start-7 row-span-4 row-start-8 bg-active-radial" />
        <div className="col-start-7 row-span-3 row-start-12 bg-active-radial" />
        <div className="col-start-7 row-span-5 row-start-3 bg-active-radial" />
        {consultant.getDayOfBirth() > 1 ? (
          <div className="col-start-6 row-span-1 row-start-15 bg-active-radial" />
        ) : null}
        {nineYearCycle.map((d, i) => (
          <>
            <div
              key={d}
              className={`${
                bornFirst !== 1 ? 'row-start-12' : 'row-start-3'
              }  col-start-${i + 3} flex justify-center text-gray-500`}
            >
              {d}
            </div>
            {bornFirst !== 1 ? (
              <div
                className={`row-start-15 col-start-${
                  i + 3
                } flex justify-center text-gray-500`}
              >
                {d + 1}
              </div>
            ) : null}
          </>
        ))}
      </>
    );
  }
  if (indexOfMonth !== 0 && indexOfMonth < 5) {
    return (
      <>
        {bornFirst === 1 && indexOfMonth === 4 ? (
          ''
        ) : (
          <div
            className={`col-start-6 row-span-${
              bornFirst === 1 ? 4 - indexOfMonth : 5 - indexOfMonth
            } row-start-${3 + indexOfMonth} bg-active-radial`}
          />
        )}
        <div
          className={`col-start-7 row-span-${indexOfMonth} row-start-3 bg-active-radial`}
        />
        <div
          className={`col-start-6 row-span-4 ${
            bornFirst === 1 ? 'row-start-7' : 'row-start-8'
          } bg-active-radial`}
        />
        <div
          className={`col-start-6 row-span-4 ${
            bornFirst === 1 ? 'row-start-11' : 'row-start-12'
          } bg-active-radial`}
        />
        {nineYearCycle.map((data, i) => (
          <>
            <div
              className={`row-start-3 col-start-${
                i + 3
              } flex justify-center text-gray-500`}
            >
              {data}
            </div>
            <div
              className={`${
                bornFirst === 1 ? 'row-start-6' : 'row-start-7'
              } col-start-${i + 3} flex justify-center text-gray-500`}
            >
              {data + 1}
            </div>
          </>
        ))}
      </>
    );
  }
  if (indexOfMonth > 4 && indexOfMonth < 9) {
    return (
      <>
        {indexOfMonth === 8 && bornFirst === 1 ? (
          ''
        ) : (
          <div
            className={`col-start-6 row-span-${
              bornFirst === 1 ? 8 - indexOfMonth : 9 - indexOfMonth
            } row-start-${3 + indexOfMonth} bg-active-radial`}
          />
        )}
        {indexOfMonth === 5 && bornFirst !== 1 ? (
          ''
        ) : (
          <div
            className={`${
              bornFirst === 1 ? 'row-start-7' : 'row-start-8'
            }  col-start-7 row-span-${
              bornFirst === 1
                ? 4 - (8 - indexOfMonth)
                : 4 - (9 - indexOfMonth)
            } bg-active-radial`}
          />
        )}
        <div
          className={`col-start-7 ${
            bornFirst === 1 ? 'row-span-4' : 'row-span-5'
          } row-start-3 bg-active-radial`}
        />
        <div
          className={`col-start-6 row-span-4 ${
            bornFirst === 1 ? 'row-start-11' : 'row-start-12'
          } bg-active-radial `}
        />
        {nineYearCycle.map((data, i) => (
          <>
            <div
              className={`${
                bornFirst === 1 ? 'row-start-7' : 'row-start-8'
              }  col-start-${i + 3} flex justify-center text-gray-500`}
            >
              {data}
            </div>
            <div
              className={`${
                bornFirst === 1 ? 'row-start-10' : 'row-start-11'
              } col-start-${i + 3} flex justify-center text-gray-500`}
            >
              {data + 1}
            </div>
          </>
        ))}
      </>
    );
  }
  if (indexOfMonth > 8 && indexOfMonth < 12) {
    return (
      <>
        <div
          className={`col-start-6 row-span-${
            bornFirst === 1 ? 12 - indexOfMonth : 13 - indexOfMonth
          } row-start-${3 + indexOfMonth} bg-active-radial`}
        />
        {indexOfMonth === 9 && bornFirst !== 1 ? (
          ''
        ) : (
          <div
            className={`${
              bornFirst === 1 ? 'row-start-11' : 'row-start-12'
            }  col-start-7 row-span-${
              bornFirst === 1
                ? 4 - (12 - indexOfMonth)
                : 4 - (13 - indexOfMonth)
            }  bg-active-radial`}
          />
        )}
        <div
          className={`col-start-7 ${
            bornFirst === 1 ? 'row-span-4' : 'row-span-5'
          }  row-start-3 bg-active-radial`}
        />
        <div
          className={`col-start-7 ${
            bornFirst === 1 ? 'row-start-7' : 'row-start-8'
          }   row-span-4 bg-active-radial`}
        />
        {nineYearCycle.map((data, i) => (
          <>
            <div
              className={`${
                bornFirst === 1 ? 'row-start-11' : 'row-start-12'
              } col-start-${i + 3} flex justify-center text-gray-500`}
            >
              {data}
            </div>
            <div
              className={`${
                bornFirst === 1 ? 'row-start-14' : 'row-start-15'
              } col-start-${i + 3} flex justify-center text-gray-500`}
            >
              {data + 1}
            </div>
          </>
        ))}
      </>
    );
  }
  return null;
}

export default CurrentQuarterFont;
