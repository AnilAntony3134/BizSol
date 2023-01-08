import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader/Loader';
import Solution from './Solution';

import { getSolutions } from '../../store/actions/solutionActions';
import './styles.css';

const Solutionlist = ({ getSolutions, solution: { solutions, isLoading, error }, auth: { me }, orgSolution }) => {
  useEffect(() => {
    getSolutions();
  }, []);
  if (!me.organisation?.flag) solutions = solutions.filter(e => e.user.id === me.id)
  else if(orgSolution) solutions = solutions.filter(e => e.message === orgSolution)
  const [itemoffset, setItemoffset] = useState(0);
  const itemsperpage = 6;
  const endooffset = itemoffset + itemsperpage;
  let currentItems = solutions.slice(itemoffset, endooffset)
  const pageCount = solutions.length / itemsperpage;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % solutions.length
    setItemoffset(newOffset)
  }
  return (
    <div className="message-list">
      <h2>Solutions:</h2>
      {error && <div className="error-center">{error}</div>}
      <div className="list">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {currentItems.map((solution, index) => <Solution key={index} solution={solution} />)}
            {
              solutions.length >= 6 && (
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
                />
              )
            }
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  solution: state.solution,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSolutions })(Solutionlist);
