import * as React from 'react';

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface ResetPasswordCodeEmailProps {
  validationCode?: string;
}

export const ResetPasswordCodeEmail = ({
  validationCode,
}: ResetPasswordCodeEmailProps) => (
  <Html>
    <Head />

    <Preview>Recuperar senha</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={process.env.LOGO_URL}
            width="60"
            height="41"
            alt="VF Club Logo"
          />
        </Section>

        <Heading style={h1}>Recuperação de senha</Heading>
        <Text style={heroText}>
          Seu código de confirmação para trocar sua senha está abaixo - digite-o
          no aplicativo VF Club
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{validationCode}</Text>
        </Section>

        <Text style={text}>
          Se você não solicitou este e-mail, não há nada com que se preocupar -
          você pode ignorá-lo com segurança.
        </Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: '66%' }}>
              <Img
                src={process.env.LOGO_URL}
                width="60"
                height="41"
                alt="VF Club Logo"
              />
            </Column>
            <Column>
              <Row>
                <Column>
                  <Link href="/">
                    <Img
                      src={process.env.FACEBOOK_LOGO}
                      width="32"
                      height="32"
                      alt="Facebook"
                      style={socialMediaIcon}
                    />
                  </Link>
                </Column>
                <Column>
                  <Link href="/">
                    <Img
                      src={process.env.TWITTER_LOGO}
                      width="32"
                      height="32"
                      alt="Twitter"
                      style={socialMediaIcon}
                    />
                  </Link>
                </Column>
              </Row>
            </Column>
          </Row>
        </Section>

        <Section>
          <Text style={footerText}>
            ©2023 VF Club <br />
            <br />
            Todos os direitos reservados.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// styles

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
};

const logoContainer = {
  marginTop: '32px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
};

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginRight: '50px',
  marginBottom: '30px',
  padding: '43px 23px',
};

const confirmationCodeText = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle',
};

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
};

const footerLogos = {
  marginBottom: '32px',
  paddingLeft: '8px',
  paddingRight: '8px',
  width: '100%',
};

const socialMediaIcon = {
  display: 'inline',
  marginLeft: '32px',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};
