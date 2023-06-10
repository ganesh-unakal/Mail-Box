import { Modal } from "react-bootstrap";
import React from "react";
import { useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { outboxActions } from "../store/outboxSlice";
import { requestOutboxData } from "./store/InboxSlice";
import { inboxActions } from "./store/InboxSlice";


const Sent = () => {
    const mails = useSelector((state) => state.inbox.outboxMails);
    const selectedEmail = useSelector((state) => state.inbox.selectedEmail);
    const userEmail = localStorage.getItem('email')
    const email = userEmail.replace(/[@.]/g, "");
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(requestOutboxData(email))
    },[email,dispatch])


    const openMail = key => {
         dispatch(inboxActions.setSelectedEmail(mails[key]));
    }

    const closeModal = () => {
        dispatch(inboxActions.setSelectedEmail(null))
    }


    return (
      <div>
        <Container className="mt-5">
          <h1 className="">OUTBOX</h1>

          <ListGroup>
            {Object.keys(mails).map((key) => (
              <ListGroup.Item
                key={key}
                className="m-2"
                style={{
                  backgroundColor: "aquamarine",
                  border: "1px solid blue",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div onClick={() => openMail(key)}>

                  {`${mails[key].to} - ${mails[key].sub} - ${mails[key].content} `}
                </div>

              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
        <Modal show={selectedEmail !== null} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Email details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>To : </strong>
              {selectedEmail && selectedEmail.to}
            </p>
            <p>
              <strong>subject : </strong>
              {selectedEmail && selectedEmail.subject}
            </p>
            <p>
              <strong>Content :</strong>
              {selectedEmail && selectedEmail.content}
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
}

export default Sent