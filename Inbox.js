import React from "react";
import { useEffect } from "react";
import { Container, ListGroup, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "./store/InboxSlice";
import { fetchData } from "./store/InboxSlice";
import { updateData } from "./store/InboxSlice";

const Inbox = () => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const email = userEmail.replace(/[@.]/g, "");
  // const [mails, setMails] = useState([]);
  const mails = useSelector((state) => state.inbox.inboxMails);
  console.log(mails)
  const dispatch = useDispatch();
  const unReadMails = useSelector((state) => state.inbox.unreadCount);
  const selectedEmail = useSelector(state => state.inbox.selectedEmail)
  

  useEffect(()=> {
    const reload = () => dispatch(fetchData(email));
    const intervalId = setInterval(reload, 2000)
    return () => clearInterval(intervalId)
  }, [email, dispatch])



  const openMail = (key) => {
    localStorage.setItem('key clicked', key)
      dispatch(inboxActions.setReadToTrue())
      dispatch(inboxActions.setSelectedEmail(mails[key]))
      dispatch(updateData(key, email))
  }
  

  const closeModal = () => {
    dispatch(inboxActions.setSelectedEmail(null))
  }

  const deletehandler = async(key) => {
    dispatch(inboxActions.deleteMail(key))
    try {
      const response = fetch(
      `https://mailbox2-1cc12-default-rtdb.firebaseio.com/${email}/inbox/${key}.json`,{
        method : 'DELETE'
      }
    )
    if (!response.ok) {
              throw new Error("failed to fetch data");
            }

            const data = await response.json();
            return data;
    } catch (err) {
      console.log(err)
    }

  }

console.log(mails)
  return (
    <div>
      <Container className="mt-5">
        <h1 className="">INBOX</h1>
        <h3 className="text-center text-danger">{`Total Number of unread Mails : ${unReadMails}`}</h3>
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
                {!mails[key].read && (
                  <div
                    style={{
                      display: "inline-block",
                      width: "0.5rem",
                      height: "0.5rem",
                      borderRadius: "50%",
                      backgroundColor: "blue",
                      marginRight: "20px",
                    }}
                  />
                )}
                {`${mails[key].from} - ${mails[key].subject} - ${mails[key].content} - ${mails[key].read}`}
              </div>
              <button
                style={{
                  backgroundColor: "lightgray",
                  border: "1px solid gray",
                  borderRadius: "10px",
                  marginLeft: "10%",
                }}
                onClick = {() => deletehandler(key)}
              >
                Delete
              </button>
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
            <strong>From :</strong>
            {selectedEmail && selectedEmail.from}
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
};

export default Inbox;

