import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-5 rounded-md shadow-xl bg-blue-50 border border-blue-200 cursor-pointer hover:shadow-2xl transition-shadow duration-300'
        >
            <div>
                <h1 className='font-medium text-lg text-blue-900'>{job?.company?.name}</h1>
                <p className='text-sm text-blue-600'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 text-blue-800'>{job?.title}</h1>
                <p className='text-sm text-blue-700'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold bg-blue-100 border border-blue-300'} variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className={'text-[#F83002] font-bold bg-red-100 border border-red-300'} variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className={'text-[#7209b7] font-bold bg-purple-100 border border-purple-300'} variant="ghost">
                    {job?.salary}LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards;
