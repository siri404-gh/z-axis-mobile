import { Permissions, Notifications } from 'expo';

export const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    console.log('finalstatus', finalStatus);
    if (finalStatus !== 'granted') return;
    let token;
    try {
    token = await Notifications.getExpoPushTokenAsync();
    } catch (e) {
        console.log(e);
    }
    return token;
};