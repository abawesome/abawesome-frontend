import React, { FunctionComponent, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text } from 'rebass';
import { Input, Button } from 'antd';
import camelcaseKeys from 'camelcase-keys';

const Registration: FunctionComponent<{}> = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [errors, setErrors] = useState<undefined | { [field: string]: string[] }>(undefined);

    const [status, setStatus] = useState<'valid' | 'invalid' | undefined>(undefined);

    const onRegisterButtonClick = async () => {
        if (password !== repeatedPassword) {
            setErrors({ repeatedPassword: ['Passwords do not match'] });
        } else {
            setErrors(undefined);
        }
        const postResponse = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        const parsedResponse = camelcaseKeys(await postResponse.json(), { deep: true }) as any;
        console.log(parsedResponse);
        setErrors(parsedResponse.errors);
        localStorage.setItem('access-token', parsedResponse.token);
    };

    return (
        <PageContentWrapper>
            {/* {JSON.stringify(errors)} */}
            <Text fontSize={48}>Register</Text>
            <Input
                size="large"
                placeholder="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            {errors && errors.email && <p>{errors.email[0]}</p>}

            <Input.Password
                size="large"
                placeholder="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            {errors && errors.password && <p>{errors.password[0]}</p>}

            <Input.Password
                size="large"
                placeholder="repeat password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatedPassword(e.target.value)}
            />
            {errors && errors.repeatedPassword && <p>{errors.repeatedPassword[0]}</p>}

            <Button type="primary" size="large" onClick={onRegisterButtonClick}>
                Register
            </Button>
            {status !== 'invalid' ? 'Sorry, please try again' : ''}
        </PageContentWrapper>
    );
};

export default Registration;
