const overlay = {
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  padding: '40px 0',
  overflowX: 'hidden',
  overflowY: 'scroll',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
};
export const modalStylesSmall = {
  overlay,
  content: {
    maxWidth: '80%',
    width: '375px',
    padding: '20px 16px 16px 16px',
    border: '0px solid #E5E7EB',
    gap: '20px',
    boxShadow: '0px 0px 12px 0px #0000000D',
    borderRadius: '12px',
    margin: '0 auto',
    height: 'fit-content',
    position: 'relative',
    inset: '0',
  },
};

export const modalStylesLarge = {
  overlay,
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    width: '1200px',
  },
};
