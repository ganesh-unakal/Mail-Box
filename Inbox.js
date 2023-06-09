import { useEffect } from "react";
import { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const Inbox = () => {

    const userEmail = useSelector(state => state.authentication.userEmail);
    const email = userEmail.replace(/[@.]/g, "")
    const [mails, setMails] = useState([]);

    useEffect(() => {
        const fetchMails = async () => {
            try {
                const response = await fetch(`
                https://mailbox2-1cc12-default-rtdb.firebaseio.com/${email}/inbox.json`)
                if (response.ok) {
                    const data = await response.json();
                    setMails(data)
                } else {
                    throw new Error('somthing went wrong')
                }
            } catch (err) {
                alert("something went wrong")
            }
        }
        fetchMails()
    }, [])

    console.log(mails)

    return (
        <Container className="mt-5">
            <h1 className="">INBOX</h1>
            <ListGroup>
                {Object.keys(mails).map((key) => (
                    <ListGroup.Item
                        key={key}
                        className="m-2"
                        style={{

                        }}
                    >
                        {`${mails[key].from} - ${mails[key].subject} - ${mails[key].content}`}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}

export default Inbox;