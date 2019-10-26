import React, { FunctionComponent, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text } from 'rebass';
import { Input, Button } from 'antd';

const LoginPage: FunctionComponent<{}> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState<'valid' | 'invalid' | undefined>(undefined);
    const onLoginButtonClick = () =>
        fetch(`${process.env.BACKEND_API_URL}/auth/Login` as string, {
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(response => response.json())
            .then(result => {
                if (
                    result &&
                    result.data &&
                    result.data.tokenAuth &&
                    result.data.tokenAuth.token &&
                    result.data.tokenAuth.refreshToken
                ) {
                    localStorage.setItem('access-token', result.data.tokenAuth.token);
                    localStorage.setItem('refresh-token', result.data.tokenAuth.refreshToken);
                    setStatus('valid');
                } else {
                    setStatus('invalid');
                }
            })
            .catch(result => {
                setStatus('invalid');
            });
    return (
        <PageContentWrapper>
            <Text fontSize={48}>Login</Text>
            <Input
                size="large"
                placeholder="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
            <Input.Password
                size="large"
                placeholder="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <Button type="primary" size="large" onClick={onLoginButtonClick}>
                Login
            </Button>
            {status}
        </PageContentWrapper>
    );
};
export default LoginPage;
