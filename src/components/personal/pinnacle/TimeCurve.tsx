/* eslint-disable max-len */
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';

function TimeCurve({ isPartner, isVerificationActive }: { isPartner: boolean, isVerificationActive: boolean }) {
  const { consultant, calculationDate } = useConsult();
  const { t } = useTranslation();

  if (!consultant) return null;

  let activeStage;
  if (isPartner) {
    activeStage = consultant.getLifeStageNumber(calculationDate);
  } else {
    activeStage = consultant.getLifeStageNumber({ ...calculationDate, month: calculationDate.month + 1 });
  }
  const activeSecondStage = consultant.getDoubleLifeStageNumber(calculationDate);
  const doubleStage = consultant.hasDoubleStage();

  return (
    <>
      <div id="lifePath" className="grid grid-cols-19 w-full border-l border-b border-gray-400 relative">
        <div className={cx(
          'col-start-1 col-end-7 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
          { 'bg-active': activeStage === 1 },
        )}
        />
        <div className={cx(
          'col-start-7 col-end-9 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
          { 'bg-active': activeStage === 2 },
        )}
        />
        <div className={cx(
          'col-start-9 col-end-11 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
          { 'bg-active': activeStage === 3 },
        )}
        />
        <div className={cx(
          'col-start-11 col-end-13 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
          { 'bg-active': activeStage === 4 },
        )}
        />
        <div className={cx(
          'col-start-13 col-end-15 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
          { 'bg-active': activeStage === 5 },
        )}
        />
        <div className={cx(
          'col-start-15 col-end-17 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
          { 'bg-active': activeStage === 6 },
        )}
        />
        <div className={cx(
          'col-start-17 col-end-21 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
          { 'bg-active': activeStage === 7 },
        )}
        />
        {(doubleStage && !isPartner)
          ? (
            <>
              <div className={cx(
                'col-start-1 col-end-7 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
                { 'bg-active': activeSecondStage === 1 },
              )}
              />
              <div className={cx(
                'col-start-7 col-end-9 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
                { 'bg-active': activeSecondStage === 2 },
              )}
              />
              <div className={cx(
                'col-start-9 col-end-11 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
                { 'bg-active': activeSecondStage === 3 },
              )}
              />
              <div className={cx(
                'col-start-11 col-end-13 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
                { 'bg-active': activeSecondStage === 4 },
              )}
              />
              <div className={cx(
                'col-start-13 col-end-15 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
                { 'bg-active': activeSecondStage === 5 },
              )}
              />
              <div className={cx(
                'col-start-15 col-end-17 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
                { 'bg-active': activeSecondStage === 6 },
              )}
              />
              <div className={cx(
                'col-start-17 col-end-21 row-start-1 row-end-14 border-dashed border-l-2 border-r-2 border-gray-400',
                { 'bg-active': activeSecondStage === 7 },
              )}
              />
            </>
          ) : ''}

        <div className="col-start-1 col-end-7 row-start-7 text-center text-13 h-6 border-b-3 border-purple-35 lifePathDuration flex items-end justify-center">
          {(!isPartner)
            ? t('pinnacle.timeCurve.fromBirthToX', {
              age: consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth(),
            })
            : `${consultant.getYearTimeCurve()} - ${consultant.calcLifeStageDuration(1)}`}
        </div>
        {(!isPartner && doubleStage)
          ? (
            <div className="col-start-1 col-end-7 row-start-8 text-center text-13 h-6  flex items-end justify-center">
              {t('pinnacle.timeCurve.fromBirthToX', {
                age: consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth(),
              })}
            </div>
          ) : ''}
        <div className="col-start-1 col-end-7 row-start-9 text-center text-13 h-6 flex items-start justify-center z-20 text-gray font-bold">
          E
        </div>
        <div className="m-auto col-start-1 col-end-7 row-start-10 relative w-full h-full">
          <div className="absolute z-10 centered-axis-x">
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-green border border-green rounded-full inner-shadow">
              {consultant.calcLifeStage(1)}
              {consultant.calcLifeStageISK(1)}
            </div>
          </div>
        </div>
        <div className="col-start-1 col-end-7 row-start-13 m-auto">{consultant.getK()}</div>

        <div className="col-start-7 col-end-9 row-start-5 text-center text-13 h-6 border-b-3 border-purple-35 lifePathDuration flex items-end justify-center">
          {(!isPartner) ? `${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth()} - ${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 9}` : `${consultant.calcLifeStageDuration(1)} - ${consultant.calcLifeStageDuration(2)}`}
        </div>

        {(!isPartner && doubleStage)
          ? (
            <div className="col-start-7 col-end-9 row-start-6 text-center text-13 h-6  flex items-end justify-center">
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth()}
              {' - '}
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 9}
            </div>
          ) : ''}
        <div className="col-start-7 col-end-9 row-start-7 text-center text-13 h-6 text-gray font-bold">
          F
        </div>
        <div className="m-auto col-start-7 col-end-9 row-start-8 relative w-full h-full">
          <div className="absolute z-10 centered-axis-x">
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-green border border-green rounded-full inner-shadow">
              {consultant.calcLifeStage(2)}
              {consultant.calcLifeStageISK(2)}
            </div>
          </div>
        </div>
        <div className="col-start-7 col-end-9 row-start-11 m-auto">{consultant.getL()}</div>

        <div className="col-start-9 col-end-11 row-start-2 text-center text-13 h-6 border-b-3 border-purple-35 lifePathDuration flex items-end justify-center">
          {(!isPartner) ? ` ${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 9} - ${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 18}` : `${consultant.calcLifeStageDuration(2)} - ${consultant.calcLifeStageDuration(3)}`}
        </div>
        {(!isPartner && doubleStage)
          ? (
            <div className="col-start-9 col-end-11 row-start-3 text-center text-13 h-6  flex items-end justify-center">
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 9}
              {' - '}
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 18}
            </div>
          ) : ''}
        <div className="col-start-9 col-end-11 row-start-4 text-center text-13 h-6 font-bold text-gray">
          G
        </div>
        <div className="m-auto col-start-9 col-end-11 row-start-5 relative w-full h-full">
          <div className="absolute z-10 centered-axis-x">
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-green border border-green rounded-full inner-shadow">
              {consultant.calcLifeStage(3)}
              {consultant.calcLifeStageISK(3)}
            </div>
          </div>
        </div>
        <div className="col-start-9 col-end-11 row-start-8 m-auto">{consultant.getM()}</div>

        <div className="col-start-11 col-end-13 row-start-1 row-end-13 border-dashed border-l-2 border-r-2 border-gray-400" />
        <div className="col-start-11 col-end-13 row-start-1 text-center text-13 h-6 border-b-3 border-purple-35 lifePathDuration flex items-end justify-center">
          {(!isPartner) ? `${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 18} - ${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 27}` : `${consultant.calcLifeStageDuration(3)} - ${consultant.calcLifeStageDuration(4)}`}
        </div>
        {(!isPartner && doubleStage)
          ? (
            <div className="col-start-11 col-end-13 row-start-2 text-center text-13 h-6  flex items-end justify-center">
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 18}
              {' - '}
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 27}
            </div>
          ) : ''}
        <div className="col-start-11 col-end-13 row-start-3 text-center text-13 h-6 font-bold text-gray">
          H
        </div>
        <div className="m-auto col-start-11 col-end-13 row-start-4 relative w-full h-full">
          <div className="absolute z-10 centered-axis-x">
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-green border border-green rounded-full inner-shadow">
              {(!isVerificationActive) ? `${consultant.calcLifeStage(4)}${consultant.calcLifeStageISK(4)}` : `${consultant.getHCheck()}${consultant.getHISK()}`}
            </div>
          </div>
        </div>
        <div className="col-start-11 col-end-13 row-start-6 m-auto">{consultant.getN()}</div>

        <div className="col-start-13 col-end-15 row-start-2 text-center text-13 h-6 border-b-3 border-purple-35 lifePathDuration flex items-end justify-center">
          {(!isPartner) ? `${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 27} - ${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 36}` : `${consultant.calcLifeStageDuration(4)} - ${consultant.calcLifeStageDuration(5)}`}
        </div>
        {(!isPartner && doubleStage)
          ? (
            <div className="col-start-13 col-end-15 row-start-3 text-center text-13 h-6  flex items-end justify-center">
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 27}
              {' - '}
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 36}
            </div>
          ) : ''}
        <div className="col-start-13 col-end-15 row-start-4 text-center text-13 h-6 text-gray font-bold">
          G
        </div>
        <div className="m-auto col-start-13 col-end-15 row-start-5 relative w-full h-full">
          <div className="absolute z-10 centered-axis-x">
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-green border border-green rounded-full inner-shadow">
              {consultant.calcLifeStage(3)}
              {consultant.calcLifeStageISK(3)}
            </div>
          </div>
        </div>
        <div className="col-start-13 col-end-15 row-start-8 m-auto">{consultant.getM()}</div>

        <div className="col-start-15 col-end-17 row-start-5 text-center text-13 h-6 border-b-3 border-purple-35 lifePathDuration flex items-end justify-center">
          {(!isPartner) ? `${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 36} - ${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 45}` : `${consultant.calcLifeStageDuration(5)} - ${consultant.calcLifeStageDuration(6)}`}
        </div>
        {(!isPartner && doubleStage)
          ? (
            <div className="col-start-15 col-end-17 row-start-6 text-center text-13 h-6  flex items-end justify-center">
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 36}
              {' - '}
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 45}
            </div>
          ) : ''}
        <div className="col-start-15 col-end-17 row-start-7 text-center text-13 h-6 text-gray font-bold">
          F
        </div>
        <div className="m-auto col-start-15 col-end-17 row-start-8 relative w-full h-full">
          <div className="absolute z-10 centered-axis-x">
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-green border border-green rounded-full inner-shadow">
              {consultant.calcLifeStage(2)}
              {consultant.calcLifeStageISK(2)}
            </div>
          </div>
        </div>
        <div className="col-start-15 col-end-17 row-start-11 m-auto">{consultant.getL()}</div>

        <div className="col-start-17 col-end-21 row-start-7 text-center text-13 h-6 border-b-3 border-purple-35 lifePathDuration flex items-end justify-center">
          {(!isPartner) ? `${consultant.calcLifeStageDuration(1) - consultant.getYearOfBirth() + 45} - ...` : `${consultant.calcLifeStageDuration(6)} - ...`}
        </div>
        {(!isPartner && doubleStage)
          ? (
            <div className="col-start-17 col-end-21 row-start-8 text-center text-13 h-6  flex items-end justify-center">
              {consultant.calcDoubleLifeStageDuration(1) - consultant.getYearOfBirth() + 45}
              {' '}
              - ...
            </div>
          ) : ''}
        <div className="col-start-17 col-end-21 row-start-9 text-center text-13 h-6 text-gray font-bold">
          E
        </div>
        <div className="m-auto col-start-17 col-end-21 row-start-10 relative w-full h-full">
          <div className="absolute z-10 centered-axis-x">
            <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-green border border-green rounded-full inner-shadow">
              {consultant.calcLifeStage(1)}
              {consultant.calcLifeStageISK(1)}
            </div>
          </div>
        </div>
        <div className="col-start-17 col-end-21 row-start-13 m-auto">
          {consultant.getK()}
        </div>
        <img src="/assets/time-curve.svg" alt="time curve" className="absolute bottom-0 left-0 w-full" />
        <div className="col-start-1 col-end-7 row-start-5 h-6" />
        <div className="col-start-1 col-end-7 row-start-8 h-6" />
        <div className="col-start-1 col-end-7 row-start-9 h-6" />
        <div className="col-start-1 col-end-7 row-start-10 h-6" />
        <div className="col-start-1 col-end-7 row-start-11 h-6" />
        <div className="col-start-1 col-end-7 row-start-12 h-6" />
      </div>
      <div id="lifePathYears" className="grid grid-cols-19 w-full -ml-3 mt-3">
        <div className="col-start-1 col-end-7 text-13 row-start-1">
          {consultant.getYearTimeCurve()}
        </div>
        <div className="col-start-7 col-end-9 text-13 row-start-1">
          {consultant.calcLifeStageDuration(1)}
        </div>
        <div className="col-start-9 col-end-11 text-13 row-start-1">
          {consultant.calcLifeStageDuration(2)}
        </div>
        <div className="col-start-11 col-end-13 text-13 row-start-1">
          {consultant.calcLifeStageDuration(3)}
        </div>
        <div className="col-start-13 col-end-15 text-13 row-start-1">
          {consultant.calcLifeStageDuration(4)}
        </div>
        <div className="col-start-15 col-end-17 text-13 row-start-1">
          {consultant.calcLifeStageDuration(5)}
        </div>
        <div className="col-start-17 col-end-18 text-13 row-start-1">
          {consultant.calcLifeStageDuration(6)}
        </div>
        <div className="col-start-18 col-end-20 text-13 row-start-1">
          {t('pinnacle.timeCurve.fromNowOn')}
          ...
        </div>
      </div>
    </>
  );
}

export default TimeCurve;
