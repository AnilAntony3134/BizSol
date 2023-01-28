import { Button, Card, Row, Text } from '@nextui-org/react'
import React from 'react'
import { PriceCardData } from '../../constants'

const PriceCard = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {
                PriceCardData.map((e, index) => (
                    <Card key={index} css={{ display: 'flex', justifyContent: 'center', margin: '10px', alignItems: 'center', backgroundColor: e.title === 'Premium Plan' ? 'var(--main)' : '', color: e.title === 'Premium Plan' ? 'var(--bg)' : 'black', border: e.title === 'Premium Plan' ? '' : '1px solid var(--main)' }}>
                        <Card.Header css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h2 b>{e.title}</h2>
                        </Card.Header>
                        <Card.Divider />
                        <Card.Body css={{ py: "$10" }}>
                            <h1>Rs {e.price}</h1>
                            <hr width='60%'/>
                            {e.attributes.map((m, ind) => (
                                <>
                                    <h4 key={ind}>{m}</h4>
                                    <hr width='60%'/>
                                </>
                            ))}
                        </Card.Body>
                        <Card.Divider />
                        <Card.Footer>
                            <Row justify="center">
                                <Button size="sm" color='success'>Buy Now</Button>
                            </Row>
                        </Card.Footer>
                    </Card>
                ))
            }
        </div>
    )
}

export default PriceCard