import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import DropZone from 'react-dropzone';

const { textArea } = Input;
const { Title } = Typography;

function videoUploadPage(){

    useStateuseStateuseState


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
                <Input onChange value />

                <br />
                <br />

                <label>설명</label>
                <Input onChange value />

                <br />
                <br />

                <select onChange>
                    <option></option>
                </select>

                <br />
                <br />

                <select onChange>
                    <option></option>
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

export default videoUploadPage