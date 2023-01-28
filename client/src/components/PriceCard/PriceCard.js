import { Button, Card, Row, Text } from '@nextui-org/react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { connect } from 'react-redux';
import { PriceCardData } from '../../constants'
import { updateUserPreferences } from '../../store/actions/usersActions';

const notify = () => toast.success('Successfully Purchased Premium');

const PriceCard = ({updateUserPreferences, auth: {me}}) => {
    const handlePurchase = () => {
        notify()
        updateUserPreferences(me.id, {slots: 5});
    }
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
                                <Button size="sm" color='success' onPress={handlePurchase}>Buy Now</Button>
                            </Row>
                        </Card.Footer>
                    </Card>
                ))
            }
            <Toaster />
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { updateUserPreferences })(PriceCard);