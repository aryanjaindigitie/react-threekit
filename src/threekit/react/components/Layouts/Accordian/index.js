import React, { useState } from 'react';
import { Wrapper } from './accordian.styles';
import { DownOutlined } from '@ant-design/icons';

const AccordianItem = (props) => {
  const { selected, handleClick, label, children } = props;
  return (
    <Wrapper selected={selected}>
      <div onClick={handleClick}>
        <div>{label}</div>
        <div></div>
        <div>
          <DownOutlined
            style={{
              transition: `all 0.3s`,
              transform: selected ? 'rotate(180deg)' : 'rotate(0)',
            }}
          />
        </div>
      </div>
      <div>
        <div>{children}</div>
      </div>
    </Wrapper>
  );
};

export const Accordian = ({ children }) => {
  const [selected, setSelected] = useState(undefined);

  const handleSelect = (idx) => setSelected(idx === selected ? undefined : idx);

  if (!children) return null;

  return React.Children.map(children, (child, idx) => {
    if (child.type !== AccordianItem) return null;
    return React.cloneElement(child, {
      selected: selected === idx,
      handleClick: () => handleSelect(idx),
    });
  });
};

Accordian.AccordianItem = AccordianItem;

export default Accordian;
