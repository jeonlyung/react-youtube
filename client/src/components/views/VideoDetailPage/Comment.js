import React, {  useState } from 'react'
import Axios from 'axios'
//react-redux에서 정보 가져오기
import { useSelector } from 'react-redux'

function Comment(props) {
    //props ==> 부모에서 데이터 가져오기
    const videoId = props.postId;
    //redux에서 user정보 가져오기
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        //화면 리플레쉬 안하도록 설정
        event.preventDefault();

        const variable = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result);
                } else {
                    alert("111");
                }
            })
        
        
    }

    return (
        <div>
            <br />
            <p> Replices</p>
            <hr />

            {/*Comment List*/}

            {/*Root Comment Form*/}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요."
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>

            </form>

        </div>
    )
}

export default Comment