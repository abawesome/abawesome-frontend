import React, { FunctionComponent, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Box } from 'rebass';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router';
import paths from '../paths';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Card from '../components/Card';

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
                if (result && result.token) {
                    localStorage.setItem('access-token', result.token);
                    // localStorage.setItem('refresh-token', result.tokenAuth.refreshToken);
                    setStatus('valid');
                } else {
                    setStatus('invalid');
                }
            })
            .catch(result => {
                setStatus('invalid');
            });
    };

    if (status == 'valid') {
        return (
            <>
                Loading stuff
                <Redirect to={paths.dashboard} />
            </>
        );
    }

    return (
        <>
            <NavBar path={[]} />
            <PageContentWrapper thin>
                <Text fontSize={48} mb={2}>
                    Login to your account
                </Text>
                <Card cardProps={{ p: 4 }}>
                    <Input
                        size="large"
                        placeholder="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <Box mt={2}>
                        <Input.Password
                            size="large"
                            placeholder="password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Box mt={2} mb={4}>
                        <Button type="primary" size="large" onClick={onLoginButtonClick}>
                            Login
                        </Button>
                        <Box>{status === 'invalid' ? 'Sorry, please try again' : ''}</Box>
                    </Box>
                    <Link to={paths.register}>
                        <Button type="default">Create an account instead</Button>
                    </Link>
                </Card>
            </PageContentWrapper>
        </>
    );
};
export default LoginPage;
