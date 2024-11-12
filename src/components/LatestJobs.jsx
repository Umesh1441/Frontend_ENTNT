import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold text-blue-900'>
            Fresh Out Jobs<span className='text-[#0284C7]'></span>
            </h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? (
                        <span className='text-blue-600'>No Waves of Opportunity Yet</span>
                    ) : (
                        allJobs?.slice(0, 100).map((job) => (
                            <LatestJobCards 
                                key={job._id} 
                                job={job} 
                                cardStyle="bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg shadow-md p-4"
                            />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs;
