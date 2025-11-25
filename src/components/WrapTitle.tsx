import { TiPlus } from 'react-icons/ti';
import check from '../assets/icons/check.svg';

type WrapTitleProps = {
  title: string;
  color: string;
  button?: {
    handle: () => void;
    state: boolean;
    text: string;
  };
};

export default function WrapTitle({ title, color, button }: WrapTitleProps) {
  return (
    <div className="bg-black text-white text-xs font-bold h-8 flex justify-between items-center rounded-t-lg">
      <div className="flex items-center">
        <div className={`w-9 h-9 flex justify-center items-center rounded-full -ml-2 p-1 ${color || 'bg-main'}`}>
          <TiPlus />
        </div>
        {title}
      </div>
      {button && (
        <button
          type="button"
          onClick={button.handle}
          className={`float-right ${(button.state) ? 'bg-gold' : 'bg-yellow'} font-bold h-6 mb-1 rounded-tl-3xl rounded-bl-3xl flex justify-center items-center ${button.text ? 'px-3' : 'w-6'}`}
        >
          <img src={check} alt="comprobacion" className={`${button.text ? 'w-4' : 'w-3'}`} />
          {button.text}
        </button>
      )}
    </div>
  );
}

WrapTitle.defaultProps = {
  button: undefined,
};
