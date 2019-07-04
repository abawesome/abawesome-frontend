import React, { FunctionComponent, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text } from 'rebass';
import { Input, Button } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { login } from './__generated__/login';

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
            refreshToken
        }
    }
`;

const LoginPage: FunctionComponent<{}> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState<'valid' | 'invalid' | undefined>(undefined);
    const [login, { error, data }] = useMutation<login>(LOGIN, {
        variables: { username, password },
    });
    const onLoginButtonClick = () =>
        login()
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
