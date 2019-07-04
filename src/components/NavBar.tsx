import { Breadcrumb, Menu, Avatar } from 'antd';
import * as React from 'react';
import { Box, Image, Flex, Link, Text } from 'rebass';
import styled from 'styled-components';
import theme from '../theme';
import logo from '../assets/logo.png';
import Spacer from './Spacer';

const NavbarBox = styled(Flex)`
    height: 100px;
    width: 100%;
    flex-direction: row;
    display: flex;
    align-items: center;
`;

const Logo = () => <Image height={48} src={logo} />;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                General
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                Layout
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                Navigation
            </a>
        </Menu.Item>
    </Menu>
);

const ProjectPath = () => (
    <Breadcrumb separator=">">
        <Breadcrumb.Item>
            <Link href="">Your Projects</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
            <Link href="">My awesome project</Link>
        </Breadcrumb.Item>
    </Breadcrumb>
);

export default () => (
    <NavbarBox pr={[10, 25, 50, 50, 50]}>
        <Box width={[80, 100, 100, 200, 200]} pl={[10, 25, 50, 50, 50]}>
            <Logo />
        </Box>
        <ProjectPath />
        <Spacer />
        <Link mr={3} color="text.black">
            Docs&Tutorial
        </Link>
        <Link mr={3} color="text.black">
            Settings
        </Link>
        <Text mr={2} fontWeight={300}>
            Hi Natasha!
        </Text>

        <Avatar size={48} src="https://picsum.photos/id/1027/100/100" />
    </NavbarBox>
);
