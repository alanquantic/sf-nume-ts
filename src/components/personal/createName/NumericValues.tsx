import Person from '@/resources/Person';

type NumericValuesProps = {
  createNameObj: Person;
  checkN: boolean;
};

export default function NumericValues({
  createNameObj,
  checkN,
}: NumericValuesProps) {
  return (
    <div className="pinnacle-wrap px-8 py-8">
      <div className="flex justify-between">
        <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mb-3">Nombre</p>

          <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow">
            {!checkN
              ? `${createNameObj.calcName()}${createNameObj.calcNameISK()}`
              : `${createNameObj.getNameCheck()}${createNameObj.getNameCheckISK()}`}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mb-3">Alma</p>

          <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow-gold">
            {!checkN
              ? `${createNameObj.calcSoulNumber()}${createNameObj.calcSoulNumberISK()}`
              : `${createNameObj.getSoulCheck()}${createNameObj.calcSoulNumberISK()}`}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mb-3">Expresión</p>

          <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow">
            {!checkN
              ? `${createNameObj.calcSoulExpression()}${createNameObj.calcSoulExpressionISK()}`
              : `${createNameObj.getExpressionSoulCheck()}${createNameObj.calcSoulExpressionISK()}`}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mb-3">Madurez</p>

          <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-aguamarina-30 border border-aguamarina rounded-full inner-shadow">
            {!checkN
              ? `${createNameObj.calcMaturity()}${createNameObj.calcMaturityISK()}`
              : `${createNameObj.calcMaturity()}${createNameObj.calcMaturityISK()}`}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
          <p className="text-13 mb-3">Ciclo de letras</p>

          <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-white border border-blue rounded-full inner-shadow">
            {createNameObj.nameCount()}
          </div>
        </div>
      </div>
    </div>
  );
}
