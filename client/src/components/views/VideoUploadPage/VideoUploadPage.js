import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import DropZone from 'react-dropzone';

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

function VideoUploadPage(){

    const [VideoTitle, setVideoTitle] = useState("");
    const [Discription, seDiscription] = useState("");
    const [Private, sePrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        seDiscription(e.currentTarget.value)
    }
    const onPrivateChange = (e) => {
        sePrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={2}>비디오 업로드</Title>
            </div>

            <Form onSubmit>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    {/* 드랍존 */}
                    <DropZone
                    onDrop
                    multiple
                    maxSize
                    >
                   {({ getRootProps, getInputProps }) => (
                       <div style={{ width:'300px', height:'240px', border:'1px solid lightgray',
                                     alignItems:'center', justifyContent:'center' }} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize:'3rem', textAlign:'center' }} />
                       </div>

                   )}
                   </DropZone>


                    {/* 썸네일 */}
                    <div>
                        <img src alt />
                    </div>
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
                    onChange={ onDescriptionChange}
                    value={Discription}
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

                <select onChange={  onCategoryChange }>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label} </option>
                    ))}
                </select>

                <br />
                <br />

                <Button type="primary" size="large" onClick>
                    저장하기
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage