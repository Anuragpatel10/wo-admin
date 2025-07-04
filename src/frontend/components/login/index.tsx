import React, {useEffect} from 'react'
import styled, {createGlobalStyle} from 'styled-components'

import {useSelector} from 'react-redux'
import {Box, H5, MadeWithLove, MessageBox, themeGet,} from '@adminjs/design-system'
import {useTranslation} from '../../hooks'
import {ReduxState} from '../../store/store'

const GlobalStyle = createGlobalStyle`
    html, body, #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
`

const Wrapper = styled(Box)`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`

const StyledLogo = styled.img`
    max-width: 200px;
    margin: ${themeGet('space', 'md')} 0;
`

export type LoginProps = {
    message?: string;
    action: string;
}

export const Login: React.FC<LoginProps> = (props) => {
    const {action, message} = props
    const {translateMessage} = useTranslation()
    const branding = useSelector((state: ReduxState) => state.branding)

    useEffect(() => {
        console.log(action, "action")
    }, []);

    return (
        <>
            <GlobalStyle/>
            <Wrapper flex variant="grey">
                <Box bg="white" height="440px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
                    <Box
                        as="form"
                        action={action}
                        method="POST"
                        p="x3"
                        flexGrow={1}
                        width={['100%', '100%', '480px']}
                    >
                        <H5 marginBottom="xxl">
                            {branding.logo ? (
                                <StyledLogo
                                    src={branding.logo}
                                    alt={branding.companyName}
                                />
                            ) : branding.companyName}
                        </H5>
                        {message && (
                            <MessageBox
                                my="lg"
                                message={message.split(' ').length > 1 ? message : translateMessage(message)}
                                variant="danger"
                            />
                        )}
                        <link href={'https://partner.wobot.ai/'} title={'Please Login Via Partner Portal'} style={{display: 'block'}}/>
                    </Box>
                </Box>
                {branding.withMadeWithLove ? (<Box mt="xxl"><MadeWithLove/></Box>) : null}
            </Wrapper>
        </>
    )
}

export default Login
