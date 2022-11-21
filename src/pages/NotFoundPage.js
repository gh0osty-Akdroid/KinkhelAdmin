import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NotFoundPage = () => {
    return (
        <>
            <Page>
                <Content>
                    <H1>404</H1>
                    <H2>Page not found</H2>
                    <P>I tried to catch some fog, but i mist</P>
                    <Links to={'/'}>back to home</Links>
                </Content>
            </Page>


        </>
    )
}

export default NotFoundPage

const Content = styled.div`
text-align: center;
padding-top: 118px;
color: #CDD4DE;
`;

const Page = styled.div`
  height: 100vh;
  z-index: 1;
  font-family: Roboto, sans-serif;
  background: #0D0C1E;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
`;




const P = styled.p`
font-weight: 300;
font-size: 14px;
opacity: 0.7;
margin-bottom: 140px;
`;
const H1 = styled.h1`
font-weight: 900;
    font-size: 165px;
    line-height: 1;
    margin-bottom: -10px;
    opacity: 0.6;
`;
const H2 = styled.h2`
font-weight: 700;
font-size: 34px;
margin-bottom: 6px;
opacity: 0.9;
`;

const Links = styled(Link)`
display: inline-block;
    font-weight: 300;
    font-size: 12px;
    text-transform: uppercase;
    border: 1px solid #CDD4DE;
    padding: 8px 14px;
    border-radius: 4px;
    opacity: 0.4;
    cursor: pointer;
`;
