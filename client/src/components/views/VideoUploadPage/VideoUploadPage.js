import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import DropZone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    { value : 0, label :  "Private" },
    { value : 1, label :  "Public" }
]

const CategoryOptions = [
    { value: 0, label: "Film & Animation1" },
    { value: 1, label: "Film & Animation2" },
    { value: 2, label: "Film & Animation3" },
    { value: 3, label: "Film & Animation4" }

]

function VideoUploadPage(props){
    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, sePrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange = (e) => {
        sePrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    const onDrop = (files) => {
        let formData = new FormData(); 
        const config = {
            header : {'content-type' : 'multipart/form-data'}
        }

        formData.append("file", files[0]);

        //비디오 업로드
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url);

                    //썸네일 생성
                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                console.log("썸네일 : ", response.data);

                                setDuration(response.data.fileDuration);
                                setThumbnailPath(response.data.url);

                            } else {
                                alert("썸네일 생성에 실패하였습니다.");
                            }
                        })


                } else {
                    console.log(response.data.errorText);
                    if (response.data.errorText !== "") {
                        alert(response.data.errorText);
                    } else {
                        alert("비디오 업로드를 실패하였습니다.");
                    }
                }
            })

    }

    const onSubmit = (e) => {
        //이벤트 방지
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        }

        Axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('업로드를 성공하였습니다.');
                    setTimeout(() => {
                        props.history.push('/');
                    }, 2000);
                } else {
                    alert("비디오 업로드 저장에 실패하였습니다.");
                }
            })

    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={2}>비디오 업로드</Title>
            </div>

            <Form onSubmit={onSubmit} >
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    {/* 드랍존 */}
                    <DropZone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={100000000}
                    >
                   {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray',
                                alignItems: 'center', justifyContent: 'center', display: 'flex', cursor: 'pointer'
                            }} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize:'3rem' }} />
                       </div>

                   )}
                   </DropZone>

                    {/* 썸네일 */}
                    {ThumbnailPath && //ThumbnailPath가 있을 경우에만
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                        </div>
                    }
                </div>

                <br />
                <br />

                <label>제목</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />

                <br />
                <br />

                <label>설명</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />

                <br />
                <br />

                <select onChange={ onPrivateChange }>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label} </option>
                    ))}
                </select>

                <br />
                <br />

                <select onChange={ onCategoryChange }>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label} </option>
                    ))}
                </select>

                <br />
                <br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    저장하기
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage