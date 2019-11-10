import React, { FunctionComponent, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text } from 'rebass';
import { Input, Button } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const LoginPage: FunctionComponent<{}> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState<'valid' | 'invalid' | undefined>(undefined);
    const onLoginButtonClick = () => {
        fetch(`${process.env.REACT_APP_BACKEND_API_URL}/auth/login` as string, {
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
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
                console.log(result);
                setStatus('invalid');
            });
    };
    return (
        <PageContentWrapper>
            <b>{process.env.REACT_APP_BACKEND_API_URL}</b>
            <Text fontSize={48}>Login</Text>
            <Input
                size="large"
                placeholder="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
