import React, { useRef } from 'react';
import {
  Card,
  Col,
  Row,
  Image as ImageUrl,
  Table,
  Button,
  Tooltip,
} from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BACKEND_URL_MEDIA } from '../../../actions/types';
import jsPDF from 'jspdf';

const ViewProperty = ({ singleData }) => {
  async function addImageProcess(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }

  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = async (data) => {
    let imageUrls = data.map((ele) => BACKEND_URL_MEDIA + ele.media_link);

    const doc = new jsPDF({
      format: 'a4',
      unit: 'px',
      externals: {
        // only define the dependencies you are NOT using as externals!
        canvg: 'canvg',
        html2canvas: 'html2canvas',
        dompurify: 'dompurify',
        pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' },
      },
    });

    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal');
    const image = await addImageProcess('/img/logo-white.png');
    doc.addImage(image, 'png', 30, 20, 130, 0);
    doc.setTextColor('blue');
    singleData.google_map_link !== null &&
      doc.textWithLink('View on map', 350, 100, {
        url: singleData.google_map_link,
        style: { color: 'blue' },
      });
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        for (const [i, url] of imageUrls.entries()) {
          doc.addPage();
          const image = await addImageProcess(url, i);
          doc.addImage(image, 'png', 30, 30, 340, 0);
        }

        await doc.save('PROPERTY' + singleData.id);
      },
    });
  };

  const columns8 = [
    {
      title: 'File Title',
      dataIndex: 'title',
      key: 'title',
      width: '200px',
    },
    {
      title: 'File Type',
      dataIndex: 'data',
      key: 'data',
    },
  ];

  const history = useHistory();

  const [data8, setdata8] = useState([]);
  useEffect(() => {
    if (Object.keys(singleData).length > 0) {
      setdata8([
        {
          title: <strong className='text-capitalize'>property type</strong>,
          data: singleData.property_type,
        },
        {
          title: <strong className='text-capitalize'>property location</strong>,
          data: singleData.property_location,
        },
        {
          title: <strong className='text-capitalize'>property locality</strong>,
          data: singleData.property_locality,
        },
        {
          title: <strong className='text-capitalize'>property area</strong>,
          data: singleData.property_area,
        },
        {
          title: <strong className='text-capitalize'>property front</strong>,
          data: singleData.property_front,
        },
        {
          title: <strong className='text-capitalize'>property deep</strong>,
          data: singleData.property_deep,
        },
        {
          title: <strong className='text-capitalize'>plot face</strong>,
          data: singleData.plot_face,
        },
        {
          title: <strong className='text-capitalize'>corner plot</strong>,
          data: singleData.corner_plot,
        },
        {
          title: <strong className='text-capitalize'>no of open sides</strong>,
          data: singleData.no_of_open_sides,
        },
        {
          title: <strong className='text-capitalize'>plot boundaries</strong>,
          data: singleData.plot_boundaries,
        },
        {
          title: <strong className='text-capitalize'>facing road width</strong>,
          data: singleData.facing_road_width,
        },
        {
          title: <strong className='text-capitalize'>plot land mark</strong>,
          data: singleData.plot_land_mark,
        },
        {
          title: <strong className='text-capitalize'>near by</strong>,
          data: singleData.near_by,
        },
        {
          title: <strong className='text-capitalize'>expected price</strong>,
          data: singleData.expected_price,
        },
        {
          title: <strong className='text-capitalize'>price per sqft</strong>,
          data: singleData.price_per_sqft,
        },
        {
          title: <strong className='text-capitalize'>Source Name</strong>,
          data: singleData.source_name,
        },
        {
          title: <strong className='text-capitalize'>google map link</strong>,
          data: (
            <a
              href={singleData.google_map_link}
              target='_blank'
              rel='noreferrer'
            >
              View in map
            </a>
          ),
        },
        {
          title: <strong className='text-capitalize'>Added By</strong>,
          data:
            singleData.user !== null
              ? singleData.user.first_name + ' ' + singleData.user.last_name
              : '',
        },
        {
          title: <strong className='text-capitalize'>Status</strong>,
          data: singleData.isActive ? 'Active' : 'Archieved',
        },
      ]);
    } else {
      history.push('/app/property-management');
    }
  }, [singleData, history]);

  const styles = {
    page: {
      marginTop: '80px',
      marginLeft: '30px',
      marginRight: '30px',
      'page-break-after': 'always',
      fontSize: '11px',
    },

    columnLayout: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '3rem 0 5rem 0',
      gap: '2rem',
    },

    column: {
      display: 'flex',
      flexDirection: 'column',
    },

    spacer2: {
      height: '2rem',
    },

    fullWidth: {
      width: '380px',
      color: '#000000',
    },

    color: {
      color: '#000000',
    },

    marginb0: {
      marginBottom: 0,
    },
  };

  return (
    <div>
      <Card>
        <Row>
          <Tooltip title='Download PDF' position='top'>
            <Button
              type='primary'
              size='small'
              style={{
                position: 'absolute',
                right: '100px',
                top: '14px',
                zIndex: '9',
              }}
              danger
              icon={<DownloadOutlined />}
              onClick={(e) => {
                e.preventDefault();
                handleGeneratePdf(
                  singleData.property_media === null
                    ? []
                    : singleData.property_media.filter(
                        (ele) => ele.media_type === 'image'
                      )
                );
              }}
            />
          </Tooltip>

          <div style={{ display: 'none' }}>
            <div ref={reportTemplateRef} style={styles.page}>
              <h4 style={styles.fullWidth}>Property Details: </h4>
              <div style={styles.fullWidth}>
                <table style={styles.fullWidth}>
                  <tbody>
                    {singleData.property_type !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Property Type:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.property_type}
                        </td>
                      </tr>
                    )}
                    {singleData.property_location !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Property Location:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.property_location}
                        </td>
                      </tr>
                    )}
                    {singleData.property_locality !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Property Locality:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.property_locality}
                        </td>
                      </tr>
                    )}
                    {singleData.property_area !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Property Area:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.property_area}
                        </td>
                      </tr>
                    )}
                    {singleData.property_front !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Property Front:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.property_front}
                        </td>
                      </tr>
                    )}
                    {singleData.property_deep !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Property Deep:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.property_deep}
                        </td>
                      </tr>
                    )}
                    {singleData.plot_face !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Plot Face:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.plot_face}
                        </td>
                      </tr>
                    )}
                    {singleData.corner_plot !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Corner Plot:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.corner_plot}
                        </td>
                      </tr>
                    )}
                    {singleData.no_of_open_sides !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          No Of Open Sides:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.no_of_open_sides}
                        </td>
                      </tr>
                    )}
                    {singleData.plot_boundaries !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Plot Boundaries:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.plot_boundaries}
                        </td>
                      </tr>
                    )}
                    {singleData.facing_road_width !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Facing Road Width:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.facing_road_width}
                        </td>
                      </tr>
                    )}
                    {singleData.plot_land_mark !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Plot Land Mark:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.plot_land_mark}
                        </td>
                      </tr>
                    )}
                    {singleData.near_by !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Near By:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.near_by}
                        </td>
                      </tr>
                    )}
                    {singleData.expected_price !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'none',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Expected Price:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.expected_price}
                        </td>
                      </tr>
                    )}
                    {singleData.price_per_sqft !== null && (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'thin solid #DCDCDC',
                          width: '120px',
                        }}
                      >
                        <th
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          Price Per Sqft:
                        </th>
                        <td
                          style={{
                            width: '260px',
                            marginLeft: '10px',
                            padding: '6px',
                          }}
                        >
                          {singleData.price_per_sqft}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='avoidThisRow'></div>
            </div>
          </div>
          <Col lg={24}>
            <h4>
              <span style={{ width: '50%' }}>Overview </span>
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
          {Object.keys(singleData).length > 0 &&
            singleData.property_media !== null &&
            singleData.property_media.filter(
              (ele) => ele.media_type === 'image'
            ).length > 0 && (
              <Col lg={24}>
                <ImageUrl.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  {Object.keys(singleData).length > 0 &&
                    singleData.property_media
                      .filter((ele) => ele.media_type === 'image')
                      .map((ele, index) => (
                        <ImageUrl
                          key={index}
                          width={200}
                          src={BACKEND_URL_MEDIA + ele.media_link}
                        />
                      ))}
                </ImageUrl.PreviewGroup>
              </Col>
            )}
          {Object.keys(singleData).length > 0 &&
            singleData.property_media !== null &&
            singleData.property_media.filter(
              (ele) => ele.media_type === 'video'
            ).length > 0 && (
              <Col lg={24} className='mt-3'>
                <h4>Videos</h4>
                <Table
                  showHeader={false}
                  columns={columns8}
                  dataSource={singleData.property_media
                    .filter((ele) => ele.media_type === 'video')
                    .map((ele) => {
                      return {
                        title: <strong>Link: </strong>,
                        data: (
                          <a
                            href={BACKEND_URL_MEDIA + ele.media_link}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {BACKEND_URL_MEDIA + ele.media_link}
                          </a>
                        ),
                      };
                    })}
                  style={{ fontSize: '12px' }}
                  className='border m-0 p-0 mb-2'
                  pagination={false}
                />
              </Col>
            )}
          <Col lg={24} className='mt-3'>
            <h4>Details</h4>
            <Table
              showHeader={false}
              columns={columns8}
              dataSource={data8}
              style={{ fontSize: '12px' }}
              className='border m-0 p-0 mb-2'
              pagination={false}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

ViewProperty.propTypes = {
  singleData: PropTypes.any,
};
const mapStateToProps = (state) => ({
  singleData: state.property.singleData,
});
export default connect(mapStateToProps, {})(ViewProperty);
