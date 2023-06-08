import { Form, Container, Button } from 'react-bootstrap'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useRef } from 'react'


const ComposeMail = () => {
    const [editorState, setEditorState] = useState()
    const toInputRef = useRef()
    const subjectInputref = useRef()


    const onEditorStateChange = (newEditor) => {
        setEditorState(newEditor)
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        const enteredTo = toInputRef.current.value
        const enteredSuject = subjectInputref.current.value

        const mail = {
            to: enteredTo,
            sub: enteredSuject,
            content: editorState.getCurrentContent().getPlainText()
        }

        const response = await fetch('https://mailbox2-1cc12-default-rtdb.firebaseio.com//mails.json',
            {
                method: "POST",
                body: JSON.stringify(mail)
            })

        const data = await response.json()
        console.log(data)
        toInputRef.current.value = ""
        subjectInputref.current.value = ""
        setEditorState("")
    }



    return (
        <Container>
            <Form onSubmit={submitHandler}>
                <h2 style={{ textAlign: "center", margin: "1rem" }}>
                    Compose Your Mail
                </h2>

                <Form.Group>
                    <Form.Label>To:</Form.Label>
                    <Form.Control type='email' required ref={toInputRef}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Subject:</Form.Label>
                    <Form.Control type='text' required ref={subjectInputref} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Content:</Form.Label>
                    <div style={{ backgroundColor: 'lightgray' }}>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                        />
                    </div>
                </Form.Group>
                <Button type="submit" className='mt-3'>Send</Button>
            </Form>
        </Container>

    )

}
export default ComposeMail;