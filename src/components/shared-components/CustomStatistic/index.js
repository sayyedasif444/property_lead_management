import React from 'react';
import PropTypes from 'prop-types';

const Value = (props) => {
  let value;
  switch (props.size) {
    case 'lg':
      value = props.isDark ? (
        <h1 className='mb-0 text-white'>{props.value}</h1>
      ) : (
        <h5 className='mb-0 text-black-50' style={{ fontSize: '16px' }}>
          {props.value}
        </h5>
      );
      break;
    case 'md':
      value = props.isDark ? (
        <h1 className='mb-0 text-white'>{props.value}</h1>
      ) : (
        <h5 className='mb-0 text-black-50' style={{ fontSize: '16px' }}>
          {props.value}
        </h5>
      );
      break;
    case 'sm':
      value = props.isDark ? (
        <h1 className='mb-0 text-white'>{props.value}</h1>
      ) : (
        <h5 className='mb-0 text-black-50' style={{ fontSize: '16px' }}>
          {props.value}
        </h5>
      );
      break;
    default:
      value = props.isDark ? (
        <h1 className='mb-0 text-white'>{props.value}</h1>
      ) : (
        <h5 className='mb-0 text-black-50' style={{ fontSize: '16px' }}>
          {props.value}
        </h5>
      );
  }
  return value;
};

export const CustomStatistic = (props) => {
  const { size, value, title, isDark, disabledbg } = props;
  return (
    <div>
      <Value value={value} size={size} isDark={isDark} />
      <p
        className={'mb-0 ' + (disabledbg ? 'text-white' : 'text-muted')}
        style={{ fontSize: '15px' }}
      >
        {title}
      </p>
    </div>
  );
};

CustomStatistic.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CustomStatistic.defaultProps = {
  size: 'md',
};

export default CustomStatistic;
