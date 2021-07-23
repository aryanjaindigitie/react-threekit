import { useAttribute } from '../../../hooks';

const AttributeWrapper = ({ attribute: attributeName, children }) => {
  const [attribute, setAttribute] = useAttribute(attributeName);

  if (!children) return null;
  if (!attribute || !setAttribute) {
    console.error(`Attribute: ${attributeName} not found`);
    return null;
  }

  return children ? children(attribute, setAttribute) : null;
};

export default AttributeWrapper;
