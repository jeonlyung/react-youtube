import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {
    
    const [SubscribeNumber, setSubscribeNumber] = useState([]);
    const [Subscribed, setSubscribed] = useState([]);

    useEffect(() => {

        //구독자 수 조회
        let variable = { userTo: props.userTo };
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setSubscribeNumber(response.data.subscribeNumber);
                } else {
                    alert('구독자 수 정보를 가져오지 못하였습니다.');
                }
            })

            
        //구독 여부 조회
        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId')};
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setSubscribed(response.data.subscribed);
                } else {
                    alert('정보를 가져오지 못하였습니다.');
                }
            })
    }, []);

    return (
        <div>
            <button style={{
                backgroundColor: `${Subscribe ? '#CC0000' : '#AAAAAA'}`, borderRadius: '4px', color: 'white',
                        padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe