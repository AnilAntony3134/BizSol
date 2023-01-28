import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Message from '../Message/Message';
import Loader from '../Loader/Loader';

import { getMessages } from '../../store/actions/messageActions';
import './styles.css';

const MessageList = ({ getMessages, message: { messages, isLoading, error }, auth: { me }, individual, uId }) => {
  useEffect(() => {
    getMessages();
  }, []);
  if (me.organisation?.flag) messages = messages.filter(e => e.user.id === me.id)
  if (uId) messages = messages.filter(e => e.user.id === uId)
  const [itemoffset, setItemoffset] = useState(0);
  const itemsperpage = 6;
  const endooffset = itemoffset + itemsperpage;
  const currentItems = messages.slice(itemoffset, endooffset);
  const pageCount = messages.length / itemsperpage;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % messages.length
    setItemoffset(newOffset)
  }
  const handleSelect = (e) => {
    messages = messages.filter(f => f.category === e)
  }

  return (
    <div className="message-list">
      {error && <div className="error-center">{error}</div>}
      <div className="list">
        {
          !me.organisation.flag && (
            <form onSubmit={(e) => handleSelect(e.target.value)}>
              <span style={{ marginTop: '20px', marginRight: '10px' }}>Filters</span>
              <select
                style={{ margin: '5px', fontSize: '1.2rem', border: 'none' }}
              >
                <option value="" label="select">Select</option>
                <option label="technical" value="technical">Technical</option>
                <option label="management" value="management">Management</option>
                <option label="writing" value="writing">Writing</option>
                <option label="creativethinking" value="creativethinking">Creative thinking</option>
                <option label="supplychain" value="supplychain">Supply chain</option>
                <option label="resources" value="resources">Resources</option>
                <option label="networking" value="networking">Networking</option>
                <option label="other" value="other">Other</option>
              </select>
              <button type='submit' style={{ backgroundColor: 'grey', padding: '5px', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}>Apply</button>
            </form>
          )
        }

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {currentItems.map((message, index) => {
              return <Message key={index} message={message} />;
            })}
          </>
        )}
      </div>
      {messages.length >= 6 && (
        <ReactPaginate
          className='paginate'
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          activeLinkClassName='activeLink'
        />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMessages })(MessageList);
