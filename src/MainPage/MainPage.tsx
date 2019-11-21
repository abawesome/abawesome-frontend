import React, { FunctionComponent } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { MainPage as IMainPage } from './__generated__/MainPage';
import { Button } from 'antd';
import paths from '../paths';
import { Link } from 'react-router-dom';

// @ts-ignore
import video from '../assets/output.webm';
const MAIN_PAGE = gql`
    query MainPage {
        me {
            ...NavBar
        }
    }
    ${NAVBAR_FRAGMENT}
`;

const MainPage: FunctionComponent = () => {
    const { loading, data, error } = useQuery<IMainPage>(MAIN_PAGE);
    return (
        <>
            <NavBar path={[]} {...(data && data.me)} />
            <PageContentWrapper>
                <Flex>
                    <Flex width={1 / 2} style={{ height: '70vh', flexDirection: 'column', justifyContent: 'center' }}>
                        <Text fontSize={30}>
                            Leverage the power of ab testing,
                            <br />
                            even in the simplest of applications.
                        </Text>
                        <Text fontSize={16} fontWeight={600} mt={4}>
                            Abawesome is a complete solution for AB testing in react.js
                            <br />
                            You focus on good UI ideas, we take care of the rest.
                        </Text>
                        <Flex mt={3}>
                            <Link to={paths.dashboard}>
                                <Button style={{ flexGrow: 1, marginRight: 10 }} size="large" type="primary">
                                    Try it out
                                </Button>
                            </Link>
                            <Button size="large" type="default">
                                Read the docs
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex
                        width={1 / 2}
                        style={{
                            height: '70vh',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <video style={{ width: '100%' }} autoPlay loop>
                            <source src={video} type='video/webm;codecs="vp8, vorbis"' />
                        </video>
                        <Box
                            style={{
                                width: '100%',
                                height: 100,
                                marginTop: -100,
                                boxShadow: 'white 0px -20px 20px inset',
                                zIndex: 100,
                            }}
                        ></Box>
                    </Flex>
                </Flex>
            </PageContentWrapper>
        </>
    );
};
export default MainPage;
