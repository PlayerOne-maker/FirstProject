import React from 'react'
import styled from 'styled-components'

export default function Home() {
    const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

    // Create a Wrapper component that'll render a <section> tag with some styles
    const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
    return (
        <div>
            <Wrapper>
                <Title>Home </Title>
            </Wrapper>
        </div>
    )
}
