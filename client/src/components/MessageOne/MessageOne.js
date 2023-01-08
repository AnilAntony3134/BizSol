import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Message from '../Message/Message';
import Loader from '../Loader/Loader';

import { getMessages } from '../../store/actions/messageActions';
import './styles.css';

const MessageList = ({ getMessages, message: { messages, isLoading, error }, auth: { me } }) => {
  useEffect(() => {
    getMessages();
  }, []);
  if (me.organisation?.flag) messages = messages.filter(e => e.user.id === me.id)

  const [itemoffset, setItemoffset] = useState(0);
  const itemsperpage = 6;
  const endooffset = itemoffset + itemsperpage;
  let currentItems = messages.slice(itemoffset, endooffset)
  const pageCount = messages.length/ itemsperpage;

  const handlePageClick = (event) => {
    const newOffset= (event.selected * 6) % messages.length
    setItemoffset(newOffset)
}
  return (
    <p>hi</p>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMessages })(MessageList);
