import { createSlice } from "@reduxjs/toolkit"
const realTimeNotificationsSlice = createSlice({
    name: 'realTimeNotification',
    initialState: {
        likeNotification: []
    },
    reducers: {
        setLikeNotification: (state, action) => {
            if (action.payload.type === 'like') {
                state.likeNotification.push(action.payload)
            } else if(action.payload.type==='unlike'){
                state.likeNotification=state.likeNotification.filter((item)=>item.userId !==action.payload.userId)
            }
        }
    }
})
export const { setLikeNotification } = realTimeNotificationsSlice.actions
export default realTimeNotificationsSlice.reducer