import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';

type PinnacleProps = {
  entity: Person | Synastry;
  size: 'sm' | 'lg';
  isVerificationActive?: boolean;
};

function Pinnacle({ entity, size, isVerificationActive = false }: PinnacleProps) {
  return (
    <div id="pinnacle" className={`relative ${size}`}>
      <img id="pinnacle-img" src="/assets/pinnacle.svg" className="absolute top-0 left-0 right-0 mx-auto" alt="background" />

      <div id="pinnacle-letters" className="relative w-full left-0 right-0 mx-auto">
        <div className="pinnacle-letter" data-letter="A">{entity.getA()}</div>
        <div className="pinnacle-letter" data-letter="B">
          {entity.getB()}
          {entity.getBISK()}
        </div>
        <div className="pinnacle-letter" data-letter="C">
          {entity.getC()}
          {entity.getCISK()}
        </div>
        <div className="pinnacle-letter" data-letter="D">
          {(!isVerificationActive) ? `${entity.getDCheck()}${entity.getDISKCheck()}` : `${entity.getD()}${entity.getDISK()}`}
        </div>

        <div className="pinnacle-letter" data-letter="E">{`${entity.getE()}${(!isVerificationActive) ? entity.getEISK() : entity.getEISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="F">{`${entity.getF()}${(!isVerificationActive) ? entity.getFISK() : entity.getFISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="I">
          {entity.getI()}
          {entity.getIISK()}
        </div>

        <div className="pinnacle-letter" data-letter="H">{(!isVerificationActive) ? `${entity.getHCheck()}${entity.getHISK()}` : `${entity.getH()}${entity.getHISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="G">
          {entity.getG()}
          {entity.getGISK()}
        </div>
        <div className="pinnacle-letter" data-letter="J">
          {entity.getJ()}
          {entity.getJISK()}
        </div>

        <div className="pinnacle-letter" data-letter="K">{entity.getK()}</div>
        <div className="pinnacle-letter" data-letter="O">{entity.getO()}</div>
        <div className="pinnacle-letter" data-letter="L">{entity.getL()}</div>

        <div className="pinnacle-letter" data-letter="M">{entity.getM()}</div>

        <div className="pinnacle-letter" data-letter="P">{entity.getP()}</div>
        <div className="pinnacle-letter" data-letter="N">{entity.getN()}</div>

        <div className="pinnacle-letter" data-letter="R">{entity.getR()}</div>
        <div className="pinnacle-letter" data-letter="Q">{entity.getQ()}</div>
        <div className="pinnacle-letter" data-letter="S">{entity.getS()}</div>

        <div className="pinnacle-letter" data-letter="W">{entity.getW()}</div>

        <div className="pinnacle-absents">{entity.getAbsences()}</div>
      </div>
    </div>
  );
}

Pinnacle.defaultProps = {
  isVerificationActive: false,
};

export default Pinnacle;
