import LoadingOverlay from 'react-loading-overlay';

export default function Loader({ text, isActive, children }) {
  return (
    <LoadingOverlay active={isActive} spinner text={text}>
      {children}
    </LoadingOverlay>
  );
}
