import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './styles.css'

const WinnerModal = ({auth : {me}}) => (
  <Card css={{ w: "100%", h: "500px" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 7}}>
      
      <Col style={{paddingTop:'-10px' }}>
      <Text size={24} weight="bold" transform="uppercase" color="white">
          Wohoo congrats {me.name}
        </Text>
        <Text h3 color="yellow" size={56} className='hacknitrText'>
          Your Answer 
        </Text> 
        <Text h3 color="yellow" size={56} className='hacknitrText'>
          Has been Selected
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src="https://www.pixelstalk.net/wp-content/uploads/images7/Cool-Star-Wars-Desktop-Wallpaper.jpg"
        objectFit="cover"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#0f111466",
        borderTop: "$borderWeights$light solid $gray800",
        bottom: 0,
        zIndex: 1,
      }}
    >
      {/* <Row>
        <Col>
          <Row>
            <Col span={3}>
              <Card.Image
                src="https://nextui.org/images/breathing-app-icon.jpeg"
                css={{ bg: "black", br: "50%" }}
                height={40}
                width={40}
                alt="Breathing app icon"
              />
            </Col>
            <Col>
              <Text color="#d1d1d1" size={12}>
                Breathing App
              </Text>
              <Text color="#d1d1d1" size={12}>
                Get a good night's sleep.
              </Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button
              flat
              auto
              rounded
              css={{ color: "#94f9f0", bg: "#94f9f026" }}
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                Get App
              </Text>
            </Button>
          </Row>
        </Col>
      </Row> */}
    </Card.Footer>
  </Card>
);

const mapStateToProps = (state) => ({
    message: state.message,
    auth: state.auth,
  });
  
  export default connect(mapStateToProps)(WinnerModal);
  