/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Axios from 'axios'


function SideVideo() {

    const [sideVideos, setSideVideos] = useState([]);

    const renderSideVideo = sideVideos.map((video, index) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return (
            <div key={index} style={{ display: 'flex', marginBottom: "1rem", padding: '0 2rem' }}>
                <div style={{ width: '40%', marginRight: "1rem" }}>
                    <a>
                        <img style={{ width: '100%', height:'100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt={''} />
                    </a>
                </div>

                <div style={{ width: '50%', height:'100%' }}>
                    <a href="true" style={{ color: 'gray' }}>
                        <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                        <span>{video.writer.name}</span><br />
                        <span>{video.views} views</span><br />
                        <span>{minutes} : {seconds}</span><br />
                    </a>
                </div>

            </div>
        )
    });

    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setSideVideos(response.data.videos);
                } else {
                    alert('비디오 데이터를 가져오기 실패하였습니다.');
                }
            })
    }, []);

    return (
        <React.Fragment>
            <div style={{marginTop:'3rem'} } />

            {renderSideVideo }
        </React.Fragment>
    )
}

export default SideVideo