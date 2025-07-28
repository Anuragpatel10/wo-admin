import React from 'react'
import styled from 'styled-components'
import {Box, cssClass, Link, Text} from '@adminjs/design-system'

import {VersionProps} from '../../../adminjs-options.interface'
import {useTranslation} from '../../hooks'
import allowOverride from '../../hoc/allow-override'

export type Props = {
    versions: VersionProps;
}

const VersionItem = styled(Text)`
    padding: 12px 24px 12px 0;
`

VersionItem.defaultProps = {
    display: ['none', 'block'],
    color: 'grey100',
}

const Version: React.FC<Props> = (props) => {
    const {versions} = props
    const {admin, app} = versions

    const {translateLabel} = useTranslation()

    return (
        <Box flex flexGrow={1} py="default" px="xxl">
            <Link href="/">
                <svg width="52" height="48" viewBox="0 0 52 48" fill="none"
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
                </svg>
            </Link>
        </Box>
    )
}

const OverridableVersion = allowOverride(Version, 'Version')

export {
    OverridableVersion as default,
    OverridableVersion as Version,
}
