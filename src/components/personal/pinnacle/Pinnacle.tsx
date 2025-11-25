import useConsult from '@/hooks/useConsult';

type PinnacleProps = {
  size: 'sm' | 'lg';
  isVerificationActive?: boolean;
};

function Pinnacle({ size, isVerificationActive }: PinnacleProps) {
  const { consultant } = useConsult();

  if (!consultant) return null;

  return (
    <div id="pinnacle" className={`relative !text-${size}`}>

      <img id="pinnacle-img" src="/assets/pinnacle.svg" className="absolute top-0 left-0 right-0 mx-auto" alt="background" />

      <div id="pinnacle-letters" className="relative w-full left-0 right-0 mx-auto">
        <div className="pinnacle-letter" data-letter="A">{consultant.getA()}</div>
        <div className="pinnacle-letter" data-letter="B">
          {consultant.getB()}
          {consultant.getBISK()}
        </div>
        <div className="pinnacle-letter" data-letter="C">
          {consultant.getC()}
          {consultant.getCISK()}
        </div>
        <div className="pinnacle-letter" data-letter="D">
          {(!isVerificationActive) ? `${consultant.getDCheck()}${consultant.getDISKCheck()}` : `${consultant.getD()}${consultant.getDISK()}`}
        </div>

        <div className="pinnacle-letter" data-letter="E">{`${consultant.getE()}${(!isVerificationActive) ? consultant.getEISK() : consultant.getEISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="F">{`${consultant.getF()}${(!isVerificationActive) ? consultant.getFISK() : consultant.getFISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="I">
          {consultant.getI()}
          {consultant.getIISK()}
        </div>

        <div className="pinnacle-letter" data-letter="H">{(!isVerificationActive) ? `${consultant.getHCheck()}${consultant.getHISK()}` : `${consultant.getH()}${consultant.getHISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="G">
          {consultant.getG()}
          {consultant.getGISK()}
        </div>
        <div className="pinnacle-letter" data-letter="J">
          {consultant.getJ()}
          {consultant.getJISK()}
        </div>

        <div className="pinnacle-letter" data-letter="K">{consultant.getK()}</div>
        <div className="pinnacle-letter" data-letter="O">{consultant.getO()}</div>
        <div className="pinnacle-letter" data-letter="L">{consultant.getL()}</div>

        <div className="pinnacle-letter" data-letter="M">{consultant.getM()}</div>

        <div className="pinnacle-letter" data-letter="P">{consultant.getP()}</div>
        <div className="pinnacle-letter" data-letter="N">{consultant.getN()}</div>

        <div className="pinnacle-letter" data-letter="R">{consultant.getR()}</div>
        <div className="pinnacle-letter" data-letter="Q">{consultant.getQ()}</div>
        <div className="pinnacle-letter" data-letter="S">{consultant.getS()}</div>

        <div className="pinnacle-letter" data-letter="W">{consultant.getW()}</div>

        <div className="pinnacle-absents">{consultant.getAbsences()}</div>
      </div>
    </div>
  );
}

Pinnacle.defaultProps = {
  isVerificationActive: false,
};

export default Pinnacle;
