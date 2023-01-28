import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MessageList from '../../components/MessageList/MessageList';
import { MdOutlineEmojiFlags } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi'
import { BsShieldFillCheck } from 'react-icons/bs'
import { Button, Modal } from '@nextui-org/react';
import ModalForm from '../Modal/Modal';
import PreferencesModal from '../Modals/PreferencesModal';
import AdditionalInfo from '../Modals/AdditionalInfo';
import PriceCard from '../PriceCard/PriceCard';
import { loadMe } from '../../store/actions/authActions';

const Dashboard = ({ auth }) => {
    const [isaddMessage, setIsAddMessage] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [addpref, setaAdpref] = useState({form1: false, form2: false});
    console.log(auth);
    const [displayForm, setDisplayForm] = useState({ form1: auth.me?.preferences?.length ? false : true, form2: Object.keys(auth.me?.additionalInfo || {}).length !== 0 ? false : true })
    console.log(displayForm,'displayform')
    const closeHandler = () => setIsAddMessage(false);
    const closePreferences = () => setaAdpref({...addpref, form1: false});
    const closeAdditionalInfo = () => setaAdpref({...addpref, form2: false});

    useEffect(() => {
        if (!auth.appLoaded && !auth.isLoading && auth.token && !auth.isAuthenticated) {
          loadMe();
        }
      }, [addpref]);

    return (
        <>
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Dash<span style={{ color: '#4040d4' }}>Board</span></h1>
                    {
                        auth.me.organisation?.flag && (
                            <Button className='bg-indigo-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' style={{ width: '200px', backgroundColor: '#4040d4' }} onClick={() => auth.me.slots !== 1 ? setIsAddMessage(true) : setShowPrice(true)}>{isaddMessage ? 'Hide Write Message' : 'New Issue'}</Button>
                        )
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        Welcome <span className="name">{auth.me.name}</span>!
                    </div>
                </div>
            </>
            {
                !displayForm.form1 && displayForm.form2 && !auth.me.organisation.flag && (
                    <div style={{ border: '1px solid var(--main)', borderRadius: '10px', padding: '10px', margin: '20px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h5>Hey there,</h5>
                            <h4>Complete your profile & get shortlisted 50% faster</h4>
                        </div>
                        <div>
                            <Button css={{ backgroundColor: 'var(--main)' }} onPress={() => setaAdpref({...addpref, form2: true})}>
                                Complete Profile
                            </Button>
                        </div>
                    </div>
                )}
            {
                displayForm.form1 && !auth.me.organisation.flag && (
                    <div style={{ border: '1px solid var(--main)', borderRadius: '10px', padding: '10px', margin: '20px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h5>Hey there,</h5>
                            <h4>Select you expertise for better optimized experience</h4>
                        </div>
                        <div>
                            <Button css={{ backgroundColor: 'var(--main)' }} onPress={() => setaAdpref({...addpref, form1: true})}>
                                Select Preferences
                            </Button>
                        </div>
                    </div>

                )
            }
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={addpref.form1}
                onClose={closePreferences}
                width="40vw"
            >
                <PreferencesModal closeHandler={closePreferences} setDisplayForm={setDisplayForm} display={displayForm} />
            </Modal>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={addpref.form2}
                onClose={closeAdditionalInfo}
                width="40vw"
            >
                <AdditionalInfo setDisplayForm={setDisplayForm} display={displayForm}/>
            </Modal>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={isaddMessage}
                onClose={closeHandler}
                width="40vw"
            >
                <ModalForm closeHandler={closeHandler}/>
            </Modal>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={showPrice}
                onClose={() => setShowPrice(false)}
                width="60vw"
            >
                <PriceCard />
            </Modal>
            <div style={{ display: 'flex', width: '100%', color: 'var(--bg)', justifyContent: 'space-between' }}>
                <div className='card_intro_wrapper' style={{ backgroundColor: 'rgb(83, 1, 190)' }}>
                    <div style={{ fontSize: '2.1rem' }}><MdOutlineEmojiFlags width="20px" /></div>
                    <p>Current Issues</p>
                    <h2>21</h2>
                </div>
                <div className='card_intro_wrapper' style={{ backgroundColor: 'rgb(141, 10, 141)' }}>
                    <div style={{ fontSize: '2.1rem' }}>
                        <BsShieldFillCheck />
                    </div>
                    <p>Solved Issues</p>
                    <h2>30</h2>
                </div>
                <div className='card_intro_wrapper'>
                    <div style={{ fontSize: '2.1rem' }}>
                        <HiUsers />
                    </div>
                    <p>Total Users</p>
                    <h2>12</h2>
                </div>
            </div>
            <h1 style={{ marginTop: '100px' }}><span style={{ color: '#4040d4' }}>Avaialble</span> Problems</h1>
            <MessageList />
        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {loadMe})(Dashboard);

