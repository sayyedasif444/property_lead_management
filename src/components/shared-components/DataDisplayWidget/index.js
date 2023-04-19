import React from 'react';
import { Card, Avatar } from 'antd';
import Flex from '../Flex';
import CustomStatistic from '../CustomStatistic';

const DataDisplayWidget = (props) => {
  const {
    size,
    value,
    title,
    icon,
    color,
    avatarSize,
    hideIcon,
    vertical,
    disabled,
    isDark,
    disabledbg,
    disabledbgc,
  } = props;
  const customStatisticProps = {
    size,
    value,
    title,
    isDark,
    disabledbg,
    disabledbgc,
  };
  return (
    <Card
      style={{
        background: disabled ? 'rgba(0,0,0,0.05)' : disabledbg && disabledbgc,
      }}
    >
      <Flex alignItems='center' flexDirection={vertical ? 'column' : 'row'}>
        {hideIcon ? (
          ''
        ) : (
          <Avatar
            size={avatarSize}
            shape='square'
            icon={icon}
            className={!disabledbg && `ant-avatar-${color}`}
            style={{
              color: disabledbg && 'white',
              background: disabledbg && 'rgba(255,255,255,0.2)',
            }}
          />
        )}
        <div className={vertical ? 'mt-1 text-center' : 'ml-3'}>
          <CustomStatistic {...customStatisticProps} />
        </div>
      </Flex>
    </Card>
  );
};

DataDisplayWidget.defaultProps = {
  avatarSize: 50,
  vertical: false,
};

export default DataDisplayWidget;
