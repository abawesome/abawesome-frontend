import { Breadcrumb, Menu, Avatar } from 'antd';
import React, { FunctionComponent } from 'react';
import { Box, Image, Flex, Text } from 'rebass';
import styled from 'styled-components';
import theme from '../theme';
import logo from '../assets/logo.png';
import Spacer from './Spacer';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { NavBar as INavBar } from './__generated__/NavBar';
import StylelessLink from './StylelessLink';

const NavbarBox = styled(Flex)`
    height: 100px;
    width: 100%;
    flex-direction: row;
    display: flex;
    align-items: center;
`;

export const NAVBAR_FRAGMENT = gql`
    fragment NavBar on UserType {
        name
        id
    }
`;

interface Props extends INavBar {
    path: { label: string; link?: string }[];
}

const Logo = () => <Image height={48} src={logo} />;

const NavBar: FunctionComponent<Props> = ({ path, name }) => {
    const ProjectPath = () => (
        <Breadcrumb separator=">">
            {path.map(pathItem => (
                <Breadcrumb.Item>
                    {pathItem.link ? <Link to={pathItem.link}>{pathItem.label}</Link> : pathItem.label}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
    return (
        <NavbarBox pr={[10, 25, 50, 50, 50]}>
            <Box width={[80, 100, 100, 200, 200]} pl={[10, 25, 50, 50, 50]}>
                <Logo />
            </Box>
            <ProjectPath />
            <Spacer />
            <Box mr={3}>
                <StylelessLink to="">Docs&Tutorial</StylelessLink>
            </Box>
            <Box mr={3}>
                <StylelessLink to="">Settings</StylelessLink>
            </Box>
            <Box mr={3}>
                <StylelessLink to="">Hi {name}!</StylelessLink>
            </Box>

            <Avatar size={48} src="https://picsum.photos/id/1027/100/100" />
        </NavbarBox>
    );
};
export default NavBar;
