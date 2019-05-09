import { Cookies } from 'react-cookie';
import {  BROWSER_STORAGE } from '../constants/common';
const cookies = new Cookies();

export const getUserStorage = () => {
    return cookies.get(BROWSER_STORAGE.ACCESS_TOKEN);
};

export const removeUserStorage = () => {
    cookies.set(
        BROWSER_STORAGE.ACCESS_TOKEN, '',
        { maxAge: 0 }
    );
    cookies.remove(BROWSER_STORAGE.ACCESS_TOKEN);
};
