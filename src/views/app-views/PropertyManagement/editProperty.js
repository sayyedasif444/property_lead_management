import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Select,
  Tabs,
  Upload,
} from 'antd';
import {
  ArrowLeftOutlined,
  InboxOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {
  editProperty,
  deletePropertyFile,
} from '../../../apis/dashboard/Property';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { BACKEND_URL_MEDIA } from '../../../actions/types';
const { Option } = Select;
const { TabPane } = Tabs;
const { Dragger } = Upload;

const AddProperty = ({
  editProperty,
  errMessage,
  isError,
  isErrorType,
  singleData,
  deletePropertyFile,
}) => {
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(singleData).length > 0) {
      form.setFieldsValue({
        property_type:
          singleData.property_type !== null ? singleData.property_type : '',
        property_location:
          singleData.property_location !== null
            ? singleData.property_location
            : '',
        property_locality:
          singleData.property_locality !== null
            ? singleData.property_locality
            : '',
        property_area:
          singleData.property_area !== null ? singleData.property_area : '',
        property_front:
          singleData.property_front !== null ? singleData.property_front : '',
        property_deep:
          singleData.property_deep !== null ? singleData.property_deep : '',
        plot_face: singleData.plot_face !== null ? singleData.plot_face : '',
        corner_plot:
          singleData.corner_plot !== null ? singleData.corner_plot : '',
        no_of_open_sides:
          singleData.no_of_open_sides !== null
            ? singleData.no_of_open_sides
            : '',
        plot_boundaries:
          singleData.plot_boundaries !== null ? singleData.plot_boundaries : '',
        facing_road_width:
          singleData.facing_road_width !== null
            ? singleData.facing_road_width
            : '',
        plot_land_mark:
          singleData.plot_land_mark !== null ? singleData.plot_land_mark : '',
        source_name:
          singleData.source_name !== null ? singleData.source_name : '',
        near_by: singleData.near_by !== null ? singleData.near_by : '',
        expected_price:
          singleData.expected_price !== null ? singleData.expected_price : '',
        price_per_sqft:
          singleData.price_per_sqft !== null ? singleData.price_per_sqft : '',
        google_map_link:
          singleData.google_map_link !== null ? singleData.google_map_link : '',
      });
    } else {
      history.push('/app/property-management');
    }
  }, [singleData, form, history]);

  const onSubmit = (values) => {
    values.id = singleData.id;
    editProperty(values, fileData, fileData2);
    setreload(true);
    setreload2(true);
    setfileData([]);
    setfileData2([]);
    setTimeout(() => {
      setreload(false);
      setreload2(false);
    }, 100);
  };

  const [fileData, setfileData] = useState([]);
  const [fileData2, setfileData2] = useState([]);
  const [reload, setreload] = useState(false);
  const [reload2, setreload2] = useState(false);

  const props = {
    multiple: true,
    onRemove: (file, fileList) => {
      const newFileList = fileData.filter((ele) => ele.uid !== file.uid);
      setfileData(newFileList);
    },
    beforeUpload: (file, fileList) => {
      var flag = false;
      var data = [...fileData];
      fileList.forEach((ele) => {
        if (ele.type.split('/')[0] !== 'image') {
          flag = true;
          message.error('Invalid Image!');
          setreload(true);
          setTimeout(() => {
            setfileData([]);
            setreload(false);
          }, 100);
          return false;
        } else {
          data.push(ele);
        }
      });
      if (!flag) setfileData(data);
      return false;
    },
    fileData,
  };

  const props2 = {
    multiple: true,
    onRemove: (file, fileList) => {
      const newFileList = fileData.filter((ele) => ele.uid !== file.uid);
      setfileData2(newFileList);
    },
    beforeUpload: (file, fileList) => {
      var flag = false;
      var data = [...fileData];
      fileList.forEach((ele) => {
        if (file.type.split('/')[0] !== 'video') {
          flag = true;
          message.error('Invalid video!');
          setreload2(true);
          setTimeout(() => {
            setfileData2([]);
            setreload2(false);
          }, 100);
          return false;
        } else {
          data.push(ele);
        }
      });
      if (!flag) setfileData2(data);
      return false;
    },
    fileData2,
  };

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage, form, history]);

  return (
    <div>
      <Card>
        <Row>
          <Col lg={24}>
            <h4>
              Please fill the below details{' '}
              <span className='float-right'>
                <Link
                  className='btn btn-primary'
                  style={{ fontSize: '80%' }}
                  to='/app/property-management'
                >
                  <ArrowLeftOutlined /> Go Back
                </Link>
              </span>
            </h4>
            <hr className='mb-3' />
          </Col>
          <Col lg={24}>
            <Form
              form={form}
              layout='vertical'
              name='new-compliance'
              preserve={false}
              onFinish={onSubmit}
              style={{ fontSize: '14px' }}
            >
              <Tabs defaultActiveKey='1'>
                <TabPane tab='Details' key='1' className='pl-2 pb-2 pr-2'>
                  <Row gutter={16}>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='property_type'
                        label={<span>Property Type</span>}
                        rules={[
                          {
                            required: true,
                            message: 'Please provide value',
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          style={{ width: '100%' }}
                          placeholder='Select Type'
                          optionFilterProp='children'
                          onChange={(e) => {}}
                          onFocus={() => {}}
                          onBlur={() => {}}
                          onSearch={() => {}}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value='Residential'>Residential</Option>
                          <Option value='Investment'>Investment</Option>
                          <Option value='Commercial'>Commercial</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='property_location'
                        label={<span>Plot location </span>}
                        rules={[
                          {
                            required: true,
                            message: 'Please provide value',
                          },
                        ]}
                      >
                        <Input placeholder='Plot location' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='property_locality'
                        label={<span>Plot Locality </span>}
                      >
                        <Input placeholder='Plot Locality' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='property_area'
                        label={<span>Area </span>}
                      >
                        <Input placeholder='Area' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='property_front'
                        label={<span>Front </span>}
                      >
                        <Input placeholder='Front' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='property_deep'
                        label={<span>Deep </span>}
                      >
                        <Input placeholder='Deep' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='plot_face'
                        label={<span>Plot Face </span>}
                      >
                        <Input placeholder='Plot Face' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='corner_plot'
                        label={<span>Corner Plot </span>}
                      >
                        <Input placeholder='Corner Plot' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='no_of_open_sides'
                        label={<span>No. of open sides</span>}
                      >
                        <Select
                          showSearch
                          style={{ width: '100%' }}
                          placeholder='Select Type'
                          optionFilterProp='children'
                          onChange={(e) => {}}
                          onFocus={() => {}}
                          onBlur={() => {}}
                          onSearch={() => {}}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value='1'>1</Option>
                          <Option value='2'>2</Option>
                          <Option value='3'>3</Option>
                          <Option value='4'>4</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='plot_boundaries'
                        label={<span>Plot Boundary</span>}
                      >
                        <Select
                          showSearch
                          style={{ width: '100%' }}
                          placeholder='Select Type'
                          optionFilterProp='children'
                          onChange={(e) => {}}
                          onFocus={() => {}}
                          onBlur={() => {}}
                          onSearch={() => {}}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value='Yes'>Yes</Option>
                          <Option value='No'>No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='facing_road_width'
                        label={<span>Facing Road Width </span>}
                      >
                        <Input placeholder='Facing Road Width' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='plot_land_mark'
                        label={<span>Plot Land Mark </span>}
                      >
                        <Input placeholder='Plot Land Mark' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='near_by'
                        label={<span>Near by </span>}
                      >
                        <Input placeholder='Near by' />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='expected_price'
                        label={<span>Expected Price </span>}
                        rules={[
                          {
                            required: true,
                            message: 'Please provide value',
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          placeholder='Expected Price'
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='price_per_sqft'
                        label={<span>Price Per sqft </span>}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          placeholder='Price Per sqft'
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        className='mb-3'
                        name='source_name'
                        label={<span>Source Name </span>}
                      >
                        <Input
                          style={{ width: '100%' }}
                          placeholder='Source Name'
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={16}>
                      <Form.Item
                        className='mb-3'
                        name='google_map_link'
                        label={<span>Google Map Link </span>}
                      >
                        <Input placeholder='Google Map Link' />
                      </Form.Item>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab='File Uploads' key='2' className='pl-2 pb-2 pr-2'>
                  <Row>
                    {!reload && (
                      <Col lg={12} className='pr-1 mb-3 mt-0'>
                        <h4>Image Upload</h4>
                        <Col lg={24}>
                          <Dragger {...props}>
                            <p className='ant-upload-drag-icon'>
                              <InboxOutlined />
                            </p>
                            <p className='ant-upload-text'>
                              Click or drag images to upload
                            </p>
                          </Dragger>
                        </Col>
                      </Col>
                    )}
                    {!reload2 && (
                      <Col lg={12} className='pl-1  mb-3 mt-0'>
                        <h4>Video Upload</h4>
                        <Col lg={24}>
                          <Dragger {...props2}>
                            <p className='ant-upload-drag-icon'>
                              <InboxOutlined />
                            </p>
                            <p className='ant-upload-text'>
                              Click or drag images to upload
                            </p>
                          </Dragger>
                        </Col>
                      </Col>
                    )}
                    <Col lg={24} className='mt-2 overflow-auto border-bottom'>
                      <h5>Image List</h5>
                      {singleData !== null &&
                        singleData.hasOwnProperty('property_media') &&
                        singleData.property_media !== null &&
                        singleData.property_media
                          .filter((ele) => ele.media_type === 'image')
                          .map((ele, index) => (
                            <div
                              style={{
                                width: '140px',
                                height: '100px',
                                float: 'left',
                                padding: '3px',
                                position: 'relative',
                              }}
                              key={index}
                            >
                              <Popconfirm
                                title='Are you sure?'
                                onConfirm={(e) => {
                                  deletePropertyFile({
                                    id: ele.id,
                                    link: ele.media_link,
                                    property: singleData.id,
                                  });
                                }}
                              >
                                <Button
                                  size='small'
                                  type='primary'
                                  danger
                                  style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                  }}
                                >
                                  <DeleteOutlined />
                                </Button>
                              </Popconfirm>
                              <img
                                src={BACKEND_URL_MEDIA + ele.media_link}
                                alt=''
                                className='border'
                                style={{ width: '100%', height: '100%' }}
                              />
                            </div>
                          ))}
                    </Col>
                    <Col lg={24} className='mt-2 overflow-auto '>
                      <h5>Video List</h5>
                      {singleData !== null &&
                        singleData.hasOwnProperty('property_media') &&
                        singleData.property_media !== null &&
                        singleData.property_media
                          .filter((ele) => ele.media_type === 'video')
                          .map((ele, index) => (
                            <div
                              className='w-100 overflow-auto mt-2 pb-2 border-bottom'
                              key={index}
                            >
                              <a
                                href={BACKEND_URL_MEDIA + ele.media_link}
                                target='_blank'
                                rel='noreferrer'
                              >
                                {ele.media_link}
                              </a>
                              <Popconfirm
                                title='Are you sure?'
                                onConfirm={(e) => {
                                  deletePropertyFile({
                                    id: ele.id,
                                    link: ele.media_link,
                                    property: singleData.id,
                                  });
                                }}
                              >
                                <span
                                  size='small'
                                  type='primary'
                                  danger
                                  style={{
                                    float: 'right',
                                    cursor: 'pointer',
                                    zIndex: '9',
                                  }}
                                >
                                  <DeleteOutlined className='text-danger' />
                                </span>
                              </Popconfirm>
                            </div>
                          ))}
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
              <hr />
              <Form.Item className='text-left mb-2'>
                <Button type='primary' htmlType='submit'>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

AddProperty.propTypes = {
  editProperty: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
  deletePropertyFile: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.property.isError,
  errMessage: state.property.errMessage,
  isErrorType: state.property.isErrorType,
  singleData: state.property.singleData,
});
export default connect(mapStateToProps, { editProperty, deletePropertyFile })(
  AddProperty
);
