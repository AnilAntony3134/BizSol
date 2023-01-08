import React from 'react'
import './styles.css';
import { FcIdea } from 'react-icons/fc';
import { IoIosPeople } from 'react-icons/io';
import { MdComputer } from 'react-icons/md';
import { AiOutlineShop } from 'react-icons/ai';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';



const LandingPage = () => {
    return (
        <>
            <div className='container'>
                <div className='title-wrapper'>
                    {/* <h1>BizSol</h1> */}
                    <h2>Find Solution for any of your business problems</h2>
                    <h3>Get help from a community of problem solvers from different domains all over the world</h3>
                    <button><Link to='/register'><span>Start now</span><BsFillArrowRightCircleFill /></Link></button>
                </div>
                <div className='image-wrapper'>
                    <img src='/assets/workingboy.png' />

                </div>
            </div>
            <div className='container'>
                <div className='knowledge-wrapper'>
                    <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>A blog written by Failure in 2022 say 18% of startups fail due to lack of knowledge in</p>
                    <div className='knowledge-cards-wrapper'>
                        <div className='knowledge-cards'>
                            <FcIdea />
                            <p>Domain</p> 
                        </div>
                        <div className='knowledge-cards'>
                            <IoIosPeople />
                            <p>Marketing </p>
                        </div>
                        <div className='knowledge-cards'>
                            <MdComputer />
                            <p>Technical </p>
                        </div>
                        <div className='knowledge-cards'>
                            <AiOutlineShop />
                            <p>Business </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='container' style={{marginTop: '100px'}}>
            <div className='design-wrapper'>
                    <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '600' }}>Why struggle in the information Era</p>
                    <div className='design-list' style={{ maxWidth:'400px'}}>
                        <ul style={{listStyle:'none'}}>
                            <li>Chat gpt cannot solve business level queries</li>
                            <li>No proper Access for finding solutions</li>
                            <li>Problem solvers not properly incentivized</li>
                            <li>Social Medias not being the most effecient solution providers</li>
                        </ul>
                    </div>

                </div>
                <div className='image-wrapper'>
                    {/* <span className='solution-button'> <p>solution</p></span> */}
                    
                    <img src='/assets/whyinfo.png' />
                    {/* <img src='/assets/maindraw.png' /> */}

                </div>
            </div>
           
            <div className='container' style={{backgroundColor: '#4040d4', padding: '20px'}}>
                <div className='niche-wrapper'>
                    <video  src='/assets/main.mp4' autoPlay loop></video>
                    <div className='solution-button'>
                         <h4 style={{textAlign: 'center'}}>Upload your problem in 3 simple clicks</h4>
                         <p>Simple and intuative UI</p>
                    </div>

                </div>
            </div>
            <div className='container'>
                <div className='niche-wrapper'>
                    <div className='solution-button'>
                         <h4>Ask problems in various niches</h4>
                         <p>Find unique solutions to your ploblems</p>
                    </div>
                    <div className='niche-list'>
                        <div className='niche-list-item'>
                            <span className='bg-pink'>Copywriting</span>
                            <span className='bg-def'>Campaign Ideas</span>
                            <span className='bg-yellow'>Social Media Campaigns</span>
                        </div>
                        <div className='niche-list-item'>
                            <span className='bg-def'>Event planning ideas</span>
                            <span className='bg-pink'>Techincal Problems</span>
                        </div>
                        <div className='niche-list-item'>
                            <span className='bg-def'>Production problems</span>
                            <span className='bg-yellow'>Supply chain issues</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className='container'>
                <div className='image-wrapper'>
                    <img style={{width: '800px'}} src='/assets/maindra.png' />
                </div>
                <div className='design-wrapper'>
                    {/* <span className='solution-button'> <p>solution BizSol</p></span> */}
                    <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '600' }}>How it works</p>
                    <div className='design-list' style={{ maxWidth:'400px'}}>
                        <ul style={{listStyle:'none'}}>
                            <li>Business gets into a problem</li>
                            <li>Posts it online</li>
                            <li>People suggest their solution or ideas</li>
                            <li>Find the best solution and reward the candidate</li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LandingPage