import { Breadcrumb, Menu, Avatar } from 'antd';
import React, { FunctionComponent } from 'react';
import { Box, Image, Flex, Text } from 'rebass';
import styled from 'styled-components';
import theme from '../theme';
import logo from '../assets/logo.png';
import Spacer from './Spacer';
import { Link, useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { NavBar as INavBar } from './__generated__/NavBar';
import StylelessLink from './StylelessLink';
import paths from '../paths';

const NavbarBox = styled(Flex)`
    height: 100px;
    width: 100%;
    flex-direction: row;
    display: flex;
    align-items: center;
`;

export const NAVBAR_FRAGMENT = gql`
    fragment NavBar on UserType {
        userName
        id
    }
`;

interface Props extends Partial<INavBar> {
    path: { label: string; link?: string }[];
}

const Logo = () => <Image height={48} src={logo} />;

const NavBar: FunctionComponent<Props> = ({ path, userName, id }) => {
    const ProjectPath = () => (
        <Breadcrumb separator=">">
            {path.map(pathItem => (
                <Breadcrumb.Item>
                    {pathItem.link ? <Link to={pathItem.link}>{pathItem.label}</Link> : pathItem.label}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
    const history = useHistory();
    return (
        <NavbarBox pr={[10, 25, 50, 50, 50]}>
            <Link to={'/'}>
                <Box width={[80, 100, 100, 200, 200]} pl={[10, 25, 50, 50, 50]}>
                    <Logo />
                </Box>
            </Link>
            <ProjectPath />
            <Spacer />
            <Box mr={3}>
                {path[0] && path[0].link === paths.dashboard ? null : (
                    <StylelessLink to={paths.dashboard}>Dashboard</StylelessLink>
                )}
            </Box>
            {id && (
                <Box mr={3}>
                    <StylelessLink to="">Docs&Tutorial</StylelessLink>
                </Box>
            )}
            {userName && (
                <Box mr={3}>
                    <StylelessLink
                        onClick={() => {
                            localStorage.removeItem('access-token');
                            history.push(paths.login);
                            window.location.reload();
                        }}
                        to={''}
                    >
                        Logout
                    </StylelessLink>
                </Box>
            )}
            {!userName && (
                <Box mr={3}>
                    <StylelessLink to={paths.login}>Login or register</StylelessLink>
                </Box>
            )}
            {userName && <Box mr={3}>{userName}</Box>}
        </NavbarBox>
    );
};
export default NavBar;
