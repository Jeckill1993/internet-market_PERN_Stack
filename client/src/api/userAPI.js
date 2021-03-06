import jwtDecode from 'jwt-decode';

import { host, authHost } from './index';

export const registration = async ( { email, password } ) => {
    const { data } = await host.post('api/user/registration', {
        email, password, role: 'ADMIN', firstname: '', lastname: '', phone: '' });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const login = async ( { email, password } ) => {
    const { data } = await host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const checkAuth = async () => {
    const { data } = await authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const updateUser = async ({ email, firstname, lastname, phone, role, password }) => {
    const { data } = await host.put('api/user', { email, firstname, lastname, phone, role, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const deleteUser = async (id) => {
    const { data } = await authHost.delete('api/user/' + id);
    return data;
};