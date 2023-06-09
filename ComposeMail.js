import { Form, Container, Button } from 'react-bootstrap'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';


const ComposeMail = () => {
    const [editorState, setEditorState] = useState()
    const toInputRef = useRef()
    const subjectInputref = useRef()
    const userEmail = useSelector(state => state.authentication.userEmail)
    const senderEmail = userEmail.replace(/[@.]/g, '')

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
        };

        const receiveMail = enteredTo
        const receiverEmail = receiveMail.replace(/[@.]/g, '')
        console.log(receiverEmail)

        //sending to my outbox
        try {
            const response = await fetch(`https://mailbox2-1cc12-default-rtdb.firebaseio.com/${senderEmail}/outbox.json`,
                {
                    method: "POST",
                    body: JSON.stringify(mail)
                })


            if (response.ok) {
                const data = await response.json();
                console.log(data)
            } else {
                const data = await response.json()
                console.log(data)
            }

        } catch (err) {
            alert('compose', err);
        }
        //sending to user inbox

        try {
            const response = await fetch(
                `https://mailbox2-1cc12-default-rtdb.firebaseio.com/${receiverEmail}/inbox.json`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        from: enteredTo,
                        subject: enteredSuject,
                        content: editorState.getCurrentContent().getPlainText(),
                    }),
                })
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            }
            else {
                const data = await response.json();
                console.log(data)
            }


        } catch (err) {
            alert(err)
            console.log(err)
        }
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