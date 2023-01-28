import React, { useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { editUser, deleteUser } from '../../store/actions/userActions';
import { loadMe } from '../../store/actions/authActions';
import Layout from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import { winnerSolutions } from '../../store/actions/solutionActions';
import requireAuth from '../../hoc/requireAuth';
import ReactMarkdown from 'react-markdown'

import './styles.css';
import Solutionlist from '../../components/Solutions/Solutionlist';
import { getSingleMessage } from '../../store/actions/messageActions';
import { Avatar, Badge, Button, Grid, Modal, Text } from '@nextui-org/react';
import Shortlisted from '../../components/Shortlisted/Shortlisted';
import { BsFillBackspaceFill } from 'react-icons/bs';
import SolutionForm from '../../components/MessageForm/SolutionForm';
import WinnersModal from '../../components/WinnersModal/WinnersModal';

const MessageOne = ({
    getSingleMessage,
    message: { messages, isLoading=true },
    solution: { solutions },
    winnerSolutions,
    auth: { me },
    match,
}) => {
    console.log(solutions);
    console.log(messages,'messa')
    const [tab, setTab] = useState(0);
    const [openWinnersModal, setOpenWinnersModal] = useState(false);
    const matchMessageId = match.params.id;
    const closeHandler = () => setOpenWinnersModal(false);
    useEffect(() => {
        getSingleMessage(matchMessageId);
        winnerSolutions(matchMessageId);
    }, [matchMessageId]);

    return (
        <Layout style={{ margin: '0px' }}>
               {isLoading ? (
          <Loader />
        ) : (
            <div className="profile" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Link to='/'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BsFillBackspaceFill />
                        <span style={{ marginLeft: '5px' }}> Back</span>
                    </div>
                </Link>
                <h1>{messages?.[0]?.title}</h1>
                <div style={{ display: 'flex', marginTop: '-25px', justifyContent: 'space-between' }}>
                    <Grid css={{ display: 'flex' }}>
                        <Grid css={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                size="xl"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                color="primary"
                                bordered
                                squared
                            />

                        </Grid>
                        <Grid>
                            <p color='primary' size='$xl' weight="bold" style={{
                                color: 'var(--main)', fontWeight: '600', fontSize: '1.2rem', marginLeft: '10px', padding: '0'
                            }}>{messages?.[0]?.user?.name}</p>
                            <p color='primary' style={{ marginLeft: '10px', padding: '0', marginTop: '-15px' }}>{moment(messages?.[0]?.createdAt).fromNow()}</p>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Text>Difficulty: <Badge css={{ border: 'none' }} color={messages?.[0]?.difficulty === 'easy' ? 'success' : 'warning'}>{messages?.[0]?.difficulty.toUpperCase()}</Badge> </Text>
                    </Grid>
                </div>
                {console.log(typeof(messages[0]?.winnerDeclared),'sheda')}
                {
                    messages[0]?.winnerDeclared == 'true' && (
                        <div style={{ width: '100%', backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center', borderRadius: '10px', margin: '10px' }}>
                        <span>Winners has already been declared, see the results</span> <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setOpenWinnersModal(true)}>here</span>
                    </div>
                    )
                }
                <Modal
                    closeButton
                    aria-labelledby="modal-title"
                    open={openWinnersModal}
                    onClose={closeHandler}
                    width="60vw"
                >
                    {solutions.length && (
                        <WinnersModal solutions={solutions} message={matchMessageId}/>
                    )}
                </Modal>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', backgroundColor: 'white', padding: '10px 20px', margin: '20px 0px', borderRadius: '10px', cursor: 'pointer' }}>
                        <div className={`tabs-messageOne-ind ${tab === 0 ? 'active-one' : ''}`} onClick={() => setTab(0)}>Overview</div>
                        <div className={`tabs-messageOne-ind ${tab === 1 ? 'active-one' : ''}`} onClick={() => setTab(1)}>{me?.organisation?.flag ? 'All Solutions' : 'Solution'}</div>
                        <div className={`tabs-messageOne-ind ${tab === 2 ? 'active-one' : ''}`} onClick={() => setTab(2)} disabled={true}>{me?.organisation?.flag ? 'Shortlisted' : 'Give Solution'}</div>
                    </div>
                </div>
                {
                    tab === 0 && (
                        <ReactMarkdown>
                            {messages?.[0]?.text}
                        </ReactMarkdown>
                    )
                }
                {
                    tab === 1 && (
                        <Solutionlist orgSolution={messages?.[0]?.id} />
                    )
                }     {
                    tab === 2 && me?.organisation?.flag && (
                        <Shortlisted orgSolution={messages?.[0]?.id} />
                    )}
                {
                    tab === 2 && !me?.organisation?.flag && (
                        <SolutionForm messageId={messages?.[0]?.id} setTab={setTab} />
                    )

                }
            </div>
        )}
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth,
    message: state.message,
    solution: state.solution,
});

export default compose(
    requireAuth,
    withRouter,
    connect(mapStateToProps, { getSingleMessage, editUser, deleteUser, loadMe, winnerSolutions }),
)(MessageOne);
