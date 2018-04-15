import React, {Component} from 'react';

import { Row, Col, InputGroup} from 'reactstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

import './AddStudentAns.css';

class AddStudentAns extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentAnsImage: '',
            studentAnsName: '',
        }
    }

    handleChange = (content) => {

        this.props.updateStudentAns(content);

    };

    render() {
        const modules = {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline'],
                    ['blockquote', 'code'],

                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],

                    [{ 'size': ['small', false, 'large', 'huge'] }],

                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ['image', 'video'],
                ],
            },
        };

        const formats = [
            'bold', 'italic', 'underline',
            'blockquote', 'code',
            'list', 'bullet',
            'size',
            'color', 'background', 'font', 'align',
            'image', 'video',
        ];

        return (
            <div>
                <Row>
                    <Col xs='12'>
                        <InputGroup className='txt'>
                            <div className='wrapper'>
                                <div id="toolbar">
                                </div>
                                <ReactQuill
                                    className='text-area'
                                    onChange={this.handleChange}
                                    placeholder={this.props.text}
                                    modules={modules}
                                    formats={formats}
                                    theme={"snow"} />
                            </div>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default AddStudentAns;