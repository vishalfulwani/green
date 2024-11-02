

import * as React from 'react';
import { Html, Button, Head, Font, Preview, Section, Row, Heading, Text } from "@react-email/components";



interface verififcationEmailProps {
  userName: string;
  otp:string;
}

export default function VerificationEmail({userName,otp}:verififcationEmailProps){
  
    return(

        <Html lang="en">
            
            <Head>
                <title>Email Verification</title>
                <Font
                    fontFamily='Roboto'
                    fallbackFontFamily="Verdana"
                />
            </Head>
            <Preview>Here&aposls your verification code : {otp}</Preview>
            <Section>
                <Row>
                    <Heading>Hello {userName}</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering with us! To complete
                    </Text>
                    <Row>
                        <Text>{otp}</Text>
                    </Row>
                    <Row>
                        <Text>Please do not share this code with anyone. If you did not request this code, please ignore</Text>
                    </Row>
                </Row>
            </Section>
        </Html>
    )
};
