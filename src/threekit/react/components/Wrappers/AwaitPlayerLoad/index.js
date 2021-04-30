import { useThreekitInitStatus } from '../../../hooks';

const AwaitPlayerLoadWrapper = ({ children }) => {
  const isLoaded = useThreekitInitStatus();
  if (!isLoaded) return null;
  return children;
};

export default AwaitPlayerLoadWrapper;
