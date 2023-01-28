import React, { useEffect } from 'react'
import Loader from '../Loader/Loader'
import Solution from '../Solutions/Solution';

const WinnersModal = ({solutions, message}) => {
  const selected = solutions.filter(e=> e.selected && message === e.message);
  return (
    <div className="message-list">
    <div className="list" style={{padding: '0 15%'}}>
        <>
          {selected.map((solution, index) => <Solution key={index} solution={solution} winnerList={true}/>)}
        </>
    </div>
  </div>
  )
}

export default WinnersModal