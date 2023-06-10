import { createSlice } from "@reduxjs/toolkit";


const inboxSlice = createSlice({
    name : 'inbox',
    initialState : {
        mails : {},
        unreadCount : 0,
        selectedEmail : null,
        inboxMails: {},
        outboxMails: {}
    },
    reducers : {
        setInboxMails(state, action){
            state.inboxMails = action.payload 
            state.unreadCount = totUnreadCount(action.payload)
        },
        setOutboxMails(state, action){
            state.outboxMails = action.payload
        },
        setSelectedEmail(state, action) {
            state.selectedEmail = action.payload
        },
        setReadToTrue(state){
            const key = localStorage.getItem("key clicked");
            state.mails[key].read = true
            state.unreadCount = totUnreadCount(state.mails)
        },
        deleteMail(state,action) {
            const mails = state.mails
            const key = action.payload
            delete mails[key]
            state.unreadCount = totUnreadCount(mails)

        }

    }
    
})
    

export const inboxActions = inboxSlice.actions


const totUnreadCount = (mails) => {
    return Object.values(mails).reduce((count , message) => {
        if (!message.read){
            return count + 1
        }
        return count
    }, 0)
}


export const fetchData = (mail) =>{
    const email = mail.replace(/[@.]/g,'')
    return async(dispatch) => {
        const fetchMails = async() => {
           const response = await fetch(
          `https://mailbox2-1cc12-default-rtdb.firebaseio.com/${email}/inbox.json`
        );

        if(!response.ok){
            throw new Error('failed to fetch data')
        }

        const data = await response.json()
        return data
        }
        
     try {
        const data = await fetchMails()
        dispatch(inboxActions.setInboxMails(data))
     } catch(err) {
        alert(err)
     }

    }
}

export const updateData = (key, mail) => {
    const email = mail.replace(/[@.]/g,'')
    return async(dispatch) => {
        
        const getData = async() => {
            const response = fetch(
              `https://mailbox2-1cc12-default-rtdb.firebaseio.com/${email}/inbox/${key}.json`,{
                method : 'PATCH',
                body : JSON.stringify({read : true})
              }
            )
            if (!response.ok) {
              throw new Error("failed to fetch data");
            }

            const data = await response.json();
            return data;
        }

         try {
           const data = await getData();
           dispatch(inboxActions.setInboxMails(data));
         } catch (err) {
           console.log(err);
         }
    }
}

export const requestOutboxData = (mail) => {
    const email = mail.replace(/[@.]/g, "");
    return async (dispatch) => {
      const fetchOutboxMails = async () => {
        const response = await fetch(
          `https://mailbox2-1cc12-default-rtdb.firebaseio.com/${email}/outbox.json`
        );
  
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }
  
        const data = await response.json();
        return data;
      };
  
      try {
        const data = await fetchOutboxMails();
        if (data) {
          dispatch(inboxActions.setOutboxMails(data));
        }
      } catch (err) {
        alert(err);
      }
    };
  };
  


export default inboxSlice.reducer
