import { Button, Checkbox, Input, Modal, Row, Spacer, Text} from '@nextui-org/react';
import React from 'react'
import MessageForm from '../../components/MessageForm/MessageForm';

const ModalForm = ({closeHandler, isEdit, currMessage}) => {
    return (
        <div>
            <div>
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            <span>Create a new </span> 
                            <Text b size={18} style={{color: 'var(--text'}}>
                                Thread
                            </Text>
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <MessageForm closeHandler={closeHandler} isEdit={isEdit} currMessage={currMessage}/>
                    </Modal.Body>
          
            </div>
        </div>
    )
}

export default ModalForm