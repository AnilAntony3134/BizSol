import React, { useEffect } from 'react'
import Loader from '../Loader/Loader'
import Solution from '../Solutions/Solution';

const WinnersModal = ({solutions}) => {
    console.log(solutions,'this coool')
    const selected = solutions.filter(e=> e.selected);
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