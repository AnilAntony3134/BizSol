import { Button, Checkbox, Modal } from '@nextui-org/react';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Categories } from '../../constants';
import { updateUserPreferences } from '../../store/actions/usersActions';
const PreferencesModal = ({updateUserPreferences, auth: {me}, closeHandler, setDisplayForm, displayForm}) => {
  const [selected, setSelected] = useState([]);
  const handleCategories = () => {
    updateUserPreferences(me.id, {preferences: selected});
    setDisplayForm({...displayForm, form1: false})
    closeHandler()
  }
  return (
    <div style={{ height: '100%' }}>
      <Modal.Header>
        <h1>Select your preferred Fields</h1>
      </Modal.Header>
      <Modal.Body>
        <Checkbox.Group
          label="Fields"
          color="secondary"
          value={selected}
          onChange={setSelected}
        >
          {Categories.map(e => (
            <Checkbox key={e.id} value={e.value}>{e.name}</Checkbox>
          ))}
        </Checkbox.Group>
        <Button onPress={handleCategories}>Submit</Button>
      </Modal.Body>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {updateUserPreferences})(PreferencesModal);
