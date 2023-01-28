import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader/Loader';
import { getSolutions } from '../../store/actions/solutionActions';
import './styles.css';
import Solution from '../Solutions/Solution';
import { Button, Checkbox, Modal, Switch } from '@nextui-org/react';
import DeclareWinnerModal from './DeclareWinnerModal';
import PriceCard from '../PriceCard/PriceCard';

const Shortlisted = ({ getSolutions, solution: { solutions, isLoading, error }, auth: { me }, orgSolution }) => {
  useEffect(() => {
    getSolutions();
  }, []);

  const updateselection = (solution) => {
    if (solution.selected) setSelected(...selected, solution)
    else setSelected(selected.filter(e => e.id !== solution.id))
  }

  solutions = solutions.filter(e => e.message === orgSolution && e.shortlisted);
  const [itemoffset, setItemoffset] = useState(0);
  const selectedSolutions = solutions.filter(e => e.selected);
  const [selectWinner, setSelectWinners] = useState(false);
  const [selected, setSelected] = useState([]);
  const [openWinnerModal, setOpenWinnerModal] = useState(false);
  const itemsperpage = 6;
  const solutionList = [];
  const endooffset = itemoffset + itemsperpage;
  let currentItems = solutions.slice(itemoffset, endooffset)
  const pageCount = solutions.length / itemsperpage;
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % solutions.length
    setItemoffset(newOffset)
  }

  const closeHandler = () => setOpenWinnerModal(false);

  return (
    <div className="message-list">
      {error && <div className="error-center">{error}</div>}
      <div className="list">
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={openWinnerModal}
          onClose={closeHandler}
          width="60vw"
        >
          <DeclareWinnerModal solutions={selected.map(e => (solutions.find(m => m.id === e)))} message={solutions[0]?.message} closeHandler={closeHandler}/>
          {/* <PriceCard /> */}
        </Modal>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Switch checked={selectWinner} onChange={() => setSelectWinners(prev => !prev)} />
                <h2>Select Winners</h2>
              </div>
              {selected.length ? <Button color='success' onPress={() => setOpenWinnerModal(true)}> Declare Winners </Button> : ''}
            </div>
            <div>
              {
                selectWinner ? (
                  <Checkbox.Group
                    orientation='vertical'
                    color='secondary'
                    value={selected}
                    onChange={setSelected}
                    css={{ width: '100%' }}
                  >
                    {currentItems.map((solution, index) => (
                      <Checkbox key={index} value={solution.id}>
                        <Solution solution={solution} shortlist={true} updateselection={updateselection} />
                      </Checkbox>

                    ))}
                  </Checkbox.Group>
                ) : currentItems.map((solution, index) => <Solution key={index} solution={solution} />)
              }

            </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  solution: state.solution,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSolutions })(Shortlisted);
