import { createSlice } from "@reduxjs/toolkit";


const inboxSlice = createSlice({
    name : 'inbox',
    initialState : {
        mails : {},
        unreadCount : 0,
        selectedEmail : null
    },
    reducers : {
        setMails(state, action){
            state.mails = action.payload 
            state.unreadCount = totUnreadCount(action.payload)
        },
        setSelectedEmail(state, action) {
            state.selectedEmail = action.payload
        },
        setReadToTrue(state){
            const key = localStorage.getItem("key clicked");
            state.mails[key].read = true
            state.unreadCount = totUnreadCount(state.mails)
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
        dispatch(inboxActions.setMails(data))
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
           dispatch(inboxActions.setMails(data));
         } catch (err) {
           console.log(err);
         }
    }
}


export default inboxSlice.reducer
