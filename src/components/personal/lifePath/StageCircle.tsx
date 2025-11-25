import Person from '@/resources/Person';

export default function StageCircle({
  stage, activeStage, consultant,
}: { stage: number; activeStage: number; consultant: Person }) {
  return (
    <div
      className={`
      relative w-12 h-12 text-xl font-black text-black flex justify-center items-center border border-green rounded-full inner-shadow
      ${activeStage === stage ? 'bg-green path-stage-active' : 'bg-white'}
    `}
    >
      {consultant.calcLifeStage(stage)}
      {consultant.calcLifeStageISK(stage)}
    </div>
  );
}
