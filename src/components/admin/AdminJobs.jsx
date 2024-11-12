import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 bg-blue-50 p-6 rounded-lg shadow-lg'>
        <div className='flex items-center justify-between my-5'>
          {/* <Input
            className="w-full max-w-sm border border-blue-300 bg-blue-100 text-blue-800 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          /> */}
          <Button 
            onClick={() => navigate("/admin/jobs/create")} 
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
          >
            Post New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
