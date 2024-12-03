import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
    textAlign: 'center',
  },
}));

const LinkGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <FooterSection>
          <Box>
            <Typography variant="body2" color="text.secondary">
              © {year} CRM Dashboard. All rights reserved.
            </Typography>
          </Box>
          <LinkGroup>
            <Link
              href="#"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Contact Support
            </Link>
          </LinkGroup>
        </FooterSection>
      </Container>
    </StyledFooter>
  );
};

export default Footer; 