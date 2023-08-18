import React, { useEffect, useState } from 'react'
/*import { FaCode } from "react-icons/fa";*/
import { Card, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([]);

    //useEffect => DOM Road되자마자 무엇을 할것인지 설정(두번째 인자가 비어있을 경우 한번만 실행)
    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setVideo(response.data.videos);
                } else {
                    alert('비디오 데이터를 가져오기 실패하였습니다.');
                }
            })
    }, []);

    const renderCards = Video.map((video, index) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col key={index} lg={6} md={8} xs={24}>
                  <div style={{ position: 'relative' }}>
                    <a href={`/video/${video._id}`}>
                            <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                            <div className="duration">
                                <span>{minutes} : {seconds}</span>
                            </div>
                    </a>
                   </div>
                   <br />

                   <Meta
                        avatar={
                            <Avatar src={video.writer.image} />
                        }
                        title={video.title}
                        description=""
                   />
                   <span>{video.writer.name}</span>
                   <br />
                   <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createAdt).format("MMM Do YY")}</span>
                </Col >
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Video List</Title>
            <hr />

            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
       
    )
}

export default LandingPage
