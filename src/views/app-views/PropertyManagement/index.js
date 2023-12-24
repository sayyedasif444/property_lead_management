import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Slider,
  Spin,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProperty, listProperty } from '../../../apis/dashboard/Property';
import { BACKEND_URL_MEDIA, SET_SIGNLE_PROPERTY } from '../../../actions/types';
import store from '../../../redux/store';
const { Meta } = Card;

const Index = ({
  data,
  loading,
  listProperty,
  errMessage,
  isError,
  isErrorType,
  deleteProperty,
  isAuthenticated,
}) => {
  const [dataz, setdataz] = useState([]);
  useEffect(() => {
    setdataz(
      data.map((ele) => {
        return {
          ...ele,
          expected_price: ele.expected_price !== null ? ele.expected_price : 0,
        };
      })
    );
  }, [data]);

  const [mainData, setmainData] = useState([]);
  const [search, setsearch] = useState('');
  const [dataSet, setdataSet] = useState([]);

  useEffect(() => {
    setdataSet(
      dataz
        .filter((ele) => ele.isActive)
        .map((ele, index) => {
          return {
            ...ele,
            propert_id: 'PROPERTY' + (index + 1),
            expected_price:
              ele.expected_price !== null ? parseInt(ele.expected_price) : 0,
          };
        })
    );
    setmaxPrice(
      Math.max(
        ...dataz.map((ele) =>
          ele.expected_price !== null ? parseInt(ele.expected_price) : 0
        )
      ) / 100000
    );
  }, [dataz]);
  const [slider, setslider] = useState([0, 0]);

  useEffect(() => {
    var result = [];
    if (slider[1] === 0) {
      result = dataSet;
    } else {
      result = dataSet.filter(
        (ele) =>
          parseInt(ele.expected_price) >= slider[0] * 100000 &&
          parseInt(ele.expected_price) <= slider[1] * 100000
      );
    }
    if (search !== '' && search !== null && dataSet !== null) {
      result = dataSet.filter(
        (item) =>
          (item.property_type !== null
            ? item.property_type.toLowerCase().indexOf(search.toLowerCase()) >
              -1
            : false) ||
          (item.property_location !== null
            ? item.property_location
                .toLowerCase()
                .indexOf(search.toLowerCase()) > -1
            : false) ||
          (item.propert_id !== null
            ? item.propert_id.toLowerCase().indexOf(search.toLowerCase()) > -1
            : false) ||
          (item.property_locality !== null
            ? item.property_locality
                .toLowerCase()
                .indexOf(search.toLowerCase()) > -1
            : false) ||
          (item.property_area !== null
            ? item.property_area.toLowerCase().indexOf(search.toLowerCase()) >
              -1
            : false)
      );
    }
    setmainData(result);
  }, [dataSet, search, slider]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     listProperty();
  //   }
  // }, [listProperty, isAuthenticated]);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);

  const [maxPrice, setmaxPrice] = useState(null);

  useEffect(() => {
    if (maxPrice !== null) {
      setslider([0, maxPrice]);
    } else {
      setslider([0, 0]);
    }
  }, [maxPrice]);

  const history = useHistory();
  return (
    <div>
      <Row>
        <Col sm={24} className='border-bottom mb-3'>
          <Row>
            <Col sm={8} md={6} lg={5} className='text-left mb-3'>
              <Input
                placeholder='Search'
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
            </Col>
            {dataSet.length > 0 && maxPrice !== null ? (
              <Col sm={8} md={6} lg={5} className='text-left mb-3 pl-3'>
                <span>
                  Price: {slider[0]} to {slider[1]}L{' '}
                </span>
                <Slider
                  range
                  min={0}
                  max={maxPrice}
                  value={slider}
                  onChange={(e) => {
                    setslider(e);
                  }}
                />
              </Col>
            ) : (
              <Col sm={8} md={6} lg={5} className='text-left mb-3 pl-3'></Col>
            )}
            <Col sm={8} md={12} lg={14} className='text-right mb-3'>
              <Button
                type='primary '
                icon={<PlusCircleOutlined />}
                onClick={(e) => {
                  history.push('/app/add-property');
                }}
              >
                Add Property
              </Button>
            </Col>
          </Row>
        </Col>
        {loading ? (
          <div className='spin-loader'>
            <Spin tip='Loading...' size='large' />
          </div>
        ) : (
          mainData.map((ele, index) => (
            <Col sm={24} md={12} lg={8} className='pr-3' key={index}>
              <Card
                style={{
                  width: '100%',
                }}
                cover={
                  <img
                    alt='example'
                    src={
                      ele.property_media === null
                        ? '/img/noimage.jpg'
                        : ele.property_media.filter(
                            (ele) => ele.media_type === 'image'
                          ).length > 0
                        ? BACKEND_URL_MEDIA +
                          ele.property_media.filter(
                            (ele) => ele.media_type === 'image'
                          )[0].media_link
                        : '/img/noimage.jpg'
                    }
                    style={{
                      width: '100%',
                      height: '190px',
                      objectFit: 'cover',
                    }}
                  />
                }
                actions={[
                  <Popconfirm
                    title='Are you sure?'
                    onConfirm={(e) => {
                      deleteProperty({ id: ele.id, isActive: !ele.isActive });
                    }}
                  >
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      to='#!'
                    >
                      <DeleteOutlined className='text-danger' key='Delete' />
                    </Link>
                  </Popconfirm>,
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      store.dispatch({
                        type: SET_SIGNLE_PROPERTY,
                        payload: ele,
                      });
                      history.push('/app/edit-property');
                    }}
                    to='#!'
                  >
                    <EditOutlined className='text-success' key='edit' />
                  </Link>,
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      store.dispatch({
                        type: SET_SIGNLE_PROPERTY,
                        payload: ele,
                      });
                      history.push('/app/view-property');
                    }}
                    to='#!'
                  >
                    <EyeOutlined className='text-primary' key='Download' />
                  </Link>,
                ]}
              >
                <Meta
                  title={
                    <>
                      <span>{'#' + ele.propert_id}</span>
                      <small className='float-right'>
                        {ele.createdAt
                          .substr(0, 10)
                          .split('-')
                          .reverse()
                          .join('-')}
                      </small>
                    </>
                  }
                  description={
                    <>
                      <p className='float-left mb-0 pb-0 w-100 text-capitalize'>
                        {ele.property_location}
                      </p>
                      <div style={{ width: '60%', float: 'left' }}>
                        {ele.user !== null
                          ? ele.user.first_name + ' ' + ele.user.last_name
                          : ''}
                      </div>
                      <div
                        className='text-right'
                        style={{ width: '40%', float: 'left' }}
                      >
                        Price:{' '}
                        {ele.expected_price !== null ? ele.expected_price : ''}
                      </div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

Index.propTypes = {
  listProperty: PropTypes.func,
  deleteProperty: PropTypes.func,
  data: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
};
const mapStateToProps = (state) => ({
  data: state.property.data,
  loading: state.property.loading,
  isError: state.property.isError,
  errMessage: state.property.errMessage,
  isErrorType: state.property.isErrorType,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { listProperty, deleteProperty })(
  Index
);
