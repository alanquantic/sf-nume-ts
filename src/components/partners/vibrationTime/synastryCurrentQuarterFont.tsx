/* eslint-disable max-len */
import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';
import Synastry from '@/resources/Synastry';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

function SynastryCurrentQuarterFont({ synastry }: { synastry: Synastry | Group }) {
  const { calculationDate } = useConsult();
  const { t } = useTranslation();
  if (!synastry) return null;
  const listOfMonths = synastry.getCustomMonths();
  const indexOfMonth = listOfMonths.findIndex((i) => i === capitalize(t('months.january') as string));
  const nineYearCycle = synastry.getNineYearCycle(calculationDate.year);

  if (indexOfMonth === 0) {
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
  if (indexOfMonth !== 0 && indexOfMonth < 5) {
    return (
      <>
        {indexOfMonth === 4 ? (
          ''
        ) : (
          <div
            className={`col-start-6 row-span-${5 - indexOfMonth} row-start-${3 + indexOfMonth} bg-active-radial`}
          />
        )}
        <div
          className={`col-start-7 row-span-${indexOfMonth} row-start-3 bg-active-radial`}
        />
        <div
          className="col-start-6 row-span-4 row-start-8 bg-active-radial"
        />
        <div
          className="col-start-6 row-span-4 row-start-12 bg-active-radial"
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
              className={`row-start-7 col-start-${i + 3} flex justify-center text-gray-500`}
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
        {indexOfMonth === 8 ? (
          ''
        ) : (
          <div
            className={`col-start-6 row-span-${9 - indexOfMonth} row-start-${3 + indexOfMonth} bg-active-radial`}
          />
        )}
        {indexOfMonth === 5 ? (
          ''
        ) : (
          <div
            className={`row-start-8 col-start-7 row-span-${4 - (9 - indexOfMonth)} bg-active-radial`}
          />
        )}
        <div
          className="col-start-7 row-span-5 row-start-3 bg-active-radial"
        />
        <div
          className="col-start-6 row-span-4 row-start-12 bg-active-radial"
        />
        {nineYearCycle.map((data, i) => (
          <>
            <div
              className={`row-start-8 col-start-${i + 3} flex justify-center text-gray-500`}
            >
              {data}
            </div>
            <div
              className={`row-start-11 col-start-${i + 3} flex justify-center text-gray-500`}
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
          className={`col-start-6 row-span-${13 - indexOfMonth} row-start-${3 + indexOfMonth} bg-active-radial`}
        />
        {indexOfMonth === 9 ? (
          ''
        ) : (
          <div
            className={`row-start-12 col-start-7 row-span-${4 - (13 - indexOfMonth)}  bg-active-radial`}
          />
        )}
        <div
          className="col-start-7 row-span-5 row-start-3 bg-active-radial"
        />
        <div
          className="col-start-7 row-start-8 row-span-4 bg-active-radial"
        />
        {nineYearCycle.map((data, i) => (
          <>
            <div
              className={`row-start-12 col-start-${i + 3} flex justify-center text-gray-500`}
            >
              {data}
            </div>
            <div
              className={`row-start-15 col-start-${i + 3} flex justify-center text-gray-500`}
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

export default SynastryCurrentQuarterFont;
