/* eslint-disable react/destructuring-assignment */
function CircleNumber(props: any) {
  const borderWithClass = props.borderwidth ? 'border' : `border-${props.borderwidth}`;
  const radiantClass = props.radiant ? 'inner-shadow-gold' : '';

  const size = () => {
    const sizes = { xx: 7, xs: 8, sm: 10 };
    return sizes[props.size as never] || 10;
  };
  const fontSize = () => {
    const sizes = { xs: 'base', sm: 'xl' };
    return sizes[props.size as never] || 10;
  };
  return (
    <div
      // eslint-disable-next-line max-len
      className={`w-${size()} h-${size()} relative text-${fontSize()} font-black text-black flex justify-center items-center bg-${props.appearance} ${borderWithClass} border-${props.border} rounded-full inner-shadow box-${props.position} z-10 ${radiantClass}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {props.children}
    </div>
  );
}

export default CircleNumber;
