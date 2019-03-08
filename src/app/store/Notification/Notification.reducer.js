import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './Notification.action';

let notificationId = 0;

const initialState = {
    notifications: {}
};

const NotificationReducer = (state = initialState, action) => {
    const notifications = { ...state.notifications };

    switch (action.type) {
    case SHOW_NOTIFICATION:
        const { msgType, msgText, msgDebug } = action;
        notifications[notificationId++] = { msgType, msgText, msgDebug };

        return {
            ...state,
            notifications
        };

    case HIDE_NOTIFICATION:
        delete notifications[action.id];

        return {
            ...state,
            notifications
        };

    default:
        return state;
    }
};

export default NotificationReducer;
