import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob)); // Helps real-time UI updates
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Sync state with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl text-blue-900'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold bg-blue-100 border border-blue-300'} variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className={'text-[#F83002] font-bold bg-red-100 border border-red-300'} variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className={'text-[#7209b7] font-bold bg-purple-100 border border-purple-300'} variant="ghost">
                            {singleJob?.salary}LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${
                        isApplied ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'
                    }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-blue-300 font-medium py-4 text-blue-800'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1 text-blue-900'>Role: <span className='pl-4 font-normal text-blue-700'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1 text-blue-900'>Location: <span className='pl-4 font-normal text-blue-700'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1 text-blue-900'>Description: <span className='pl-4 font-normal text-blue-700'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1 text-blue-900'>Experience: <span className='pl-4 font-normal text-blue-700'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1 text-blue-900'>Salary: <span className='pl-4 font-normal text-blue-700'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1 text-blue-900'>Total Applicants: <span className='pl-4 font-normal text-blue-700'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1 text-blue-900'>Posted Date: <span className='pl-4 font-normal text-blue-700'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    );
};

export default JobDescription;
