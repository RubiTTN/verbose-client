import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../styles/GlobalStyles'
import Gatekeeper from '../routes/gatekeeper'

export default () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Gatekeeper />
    </Fragment>
  </ThemeProvider>
)
