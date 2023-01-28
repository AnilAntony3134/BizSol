import { Card, Grid, Text, Button, Row, Input } from "@nextui-org/react";
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getSingleMessage, editMessage } from '../../store/actions/messageActions';
import { editSolution } from '../../store/actions/solutionActions';
import { updateUserPreferences } from '../../store/actions/usersActions';

const DeclareWinnerModal = ({ solutions, themessage, message: {messages}, editSolution, editMessage, updateUserPreferences, closeHandler, auth: {me} }) => {
    console.log(messages)
    useEffect(() => {
            getSingleMessage(themessage);
   
    }, [themessage])

    const handlePriceSelection = () => {
        solutions.map(e => {
            editSolution(e.id, { title: e.title, solution: e.solution, message: e.message, organisation: e.organisation, user: e.user.id, shortlisted: e.shortlisted, selected: true });
            const messageOne = messages[0];
            console.log(messageOne, 'messageOne')
            editMessage(messageOne.id, { title: messageOne.title, text: messageOne.text, incentive: messageOne.incentive, category: messageOne.category, public: messageOne.public, difficulty: messageOne.difficulty, winnerDeclared: true });
            updateUserPreferences(e.user.id, {status: 'winner', winnerSolutions: [...(me.winnerSolutions || []), e.id]});
            closeHandler();
        })
    }

    return (
        // <div>hi</div>
        <Grid.Container gap={2} direction='column'>
            <h1>Declare Winners</h1>
            <div sm={12} md={5} css={{ justifyContent: 'center', display: 'grid', alignItems: 'center' }}>
                {
                    solutions.length && solutions?.map((solution, index) => (
                        <Card style={{ 'padding': '0 20%' }} key={index}>
                            <Card.Header>
                                <Text i>{solution.user.name}</Text>
                            </Card.Header>
                            <Card.Divider />
                            <Card.Body css={{ py: "$10" }}>
                                <Text b>
                                    {solution.title}
                                </Text>
                            </Card.Body>
                            <Card.Divider />
                            <Card.Footer>
                                <Row justify="flex-end">
                                    <Button size="sm" color='success'>Rs {messages[0].incentive / solutions.length}</Button>
                                </Row>
                            </Card.Footer>
                        </Card>
                    ))
                }
            </div>
            {solutions.length === 1 ? (
                <h4>The total amount Rs {messages[0].incentive}</h4>
            ) : (
                <h4>The total amount Rs {messages[0].incentive} is split into {solutions.length} ie Rs {messages[0].incentive / solutions.length} each</h4>
            )}
            <Button onPress={() => handlePriceSelection()}>Confirm Selection</Button>
        </Grid.Container>
    );
}

const mapStateToProps = (state) => ({
    message: state.message,
    auth: state.auth,
});

export default
    connect(mapStateToProps, { getSingleMessage, editSolution, editMessage, updateUserPreferences }
    )(DeclareWinnerModal);

