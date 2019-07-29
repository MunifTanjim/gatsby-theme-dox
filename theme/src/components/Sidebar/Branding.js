/** @jsx jsx */
import { graphql, useStaticQuery } from 'gatsby'
import { jsx } from 'theme-ui'
import Link from '../Link'
import ScreenReader from '../ScreenReader'

function Branding({ logo, title }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const Title = logo ? ScreenReader : 'span'

  return (
    <div sx={{ variant: 'layout.container', px: 0 }}>
      <h3 sx={{ fontSize: 'inherit', m: 0 }}>
        <Link
          to="/"
          sx={{
            variant: 'linkStyles.nav',
            ':hover': { color: 'inherit', textDecoration: 'none' },
            '&.active': { color: 'inherit' }
          }}
        >
          {logo && (
            <img
              src={logo}
              alt={`${site.siteMetadata.title} Logo`}
              aria-hidden="true"
              sx={{ display: 'block', height: '1.5em' }}
            />
          )}
          <Title>{title || site.siteMetadata.title}</Title>
        </Link>
      </h3>
    </div>
  )
}

export default Branding
