import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import {Box, H2, MessageBox, Text, themeGet,} from '@adminjs/design-system'
import {useTranslation} from '../../hooks'
import {ReduxState} from "../../store";
import {useSelector} from "react-redux";

const GlobalStyle = createGlobalStyle`
    html, body, #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .auth-root {
        height: auto;
        min-height: 100vh;
        background-color: #f8f9fa; /* Replace $off-white with actual color */
        position: relative;
        overflow: hidden;
    }

    .auth-header {
        margin: 40px 32px 0px 32px;
        display: flex;
        justify-content: unset;
        align-items: flex-start;
        width: 100%;
        z-index: 1;
        flex: 0;
    }

    .logo-box {
        position: absolute;
        z-index: 1;
        max-width: 200px;
        left: 40px;
    }

    .auth-box-wrapper {
        position: relative;
        flex: 1;
        width: 100%;
    }

    .auth-box-wrapper.wrapper-fw {
        width: 100%;
        max-width: 100%;
    }

    .auth-box-wrapper .content-box {
        box-sizing: border-box;
        z-index: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .content-header {
        text-align: center;
        margin: 0 auto;
        max-width: 550px;
    }

    @media screen and (max-width: 991px) {
        .content-header {
            margin: 60px auto 0;
        }
    }

    .auth-layout {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        width: 100%;
        max-width: 1140px;
        min-height: 100%;
        margin: 0 auto;
    }

    .box-rotate-fixed {
        position: absolute;
        height: 420px;
        left: 0;
        right: 0;
        top: 50%;
        bottom: 0;
        z-index: 0;
        transform: skewY(-30deg) translateY(-50%);
    }

    @media screen and (max-width: 720px) {
        .box-rotate-fixed {
            top: 120px;
        }
    }

    .box-rotate-fixed .box-strip-bottom-left {
        left: 0;
        max-width: 44%;
        width: 100%;
        border-top: 8px solid #e6f0ff; /* Replace $primary-extra-light-focused */
    }

    .box-rotate-fixed .box-strip-top-right {
        right: 0;
        max-width: 44%;
        width: 100%;
        border-bottom: 8px solid #e6f0ff; /* Replace $primary-extra-light-focused */
    }

    .box-rotate-fixed .box-strip-middle {
        width: 100%;
    }

    .box-rotate-fixed .box-strip {
        position: absolute;
        height: 400px;
        background-color: #f5f5f5;
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
    const branding = useSelector((state: ReduxState) => state.branding)
    const {translateMessage} = useTranslation()

    return (
        <>
            <GlobalStyle/>
            <div className="box-rotate-fixed">
                <div className="box-strip box-strip-middle"/>
                <div className="box-strip box-strip-top-right"/>
                <div className="box-strip box-strip-bottom-left"/>
            </div>
            <div className="auth-layout container">
                <div className="auth-header">
                    <div className="logo-box">
                        {branding.logo && (<StyledLogo
                            src={branding.logo}
                            alt={branding.companyName}
                        />)}
                    </div>
                </div>
                <div className="auth-box-wrapper">
                    <div className="content-box">
                        <Box bg="white" height="300px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
                            <Box
                                bg="primary100"
                                color="white"
                                p="x3"
                                width="380px"
                                flexGrow={0}
                                display={['none', 'none', 'block']}
                                position="relative"
                            >
                                <H2 fontWeight="lighter">Wo-admin</H2>
                                <Text fontWeight="lighter" mt="default">
                                    Wobot's powerful, admin panel.
                                </Text>
                                <Text fontWeight="lighter" mt="default">
                                    it lets you manage all data seamlessly in one centralized interface.
                                </Text>
                            </Box>
                            <Box
                                as="form"
                                action={action}
                                method="POST"
                                p="x3"
                                flexGrow={1}
                                width={['100%', '100%', '480px']}
                                name='loginForm'
                                id='loginForm'
                            >
                                <input type="hidden" name="ssoToken" id="ssoToken" required/>
                                <Text fontWeight="lighter" mt="default" textAlign="center">
                                    {branding.logo && (<svg width="52" height="48" viewBox="0 0 52 48" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                        <rect
                                            width="11.0477"
                                            height="27.8427"
                                            rx="5.52383"
                                            transform="matrix(0.854439 -0.519552 0.510535 0.859857 0.499878 24.0586)"
                                            fill="#3766E8"
                                        />
                                        <rect
                                            width="11.0477"
                                            height="42.3694"
                                            rx="5.52383"
                                            transform="matrix(0.854439 -0.519552 0.510535 0.859857 12.3904 8.65234)"
                                            fill="#3766E8"
                                        />
                                        <rect
                                            width="11.0477"
                                            height="21.5479"
                                            rx="5.52383"
                                            transform="matrix(0.854439 -0.519552 0.510535 0.859857 31.0594 5.73828)"
                                            fill="#3766E8"
                                        />
                                    </svg>)}
                                </Text>

                                {message && (
                                    <MessageBox
                                        my="lg"
                                        message={message.split(' ').length > 1 ? message : translateMessage(message)}
                                        variant="danger"
                                    />
                                )}

                                <Text fontWeight="lighter" mt="default" textAlign="center">
                                    <a href={'https://partner.wobot.ai/'}>Please Login Via Partner Portal</a>
                                </Text>

                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
