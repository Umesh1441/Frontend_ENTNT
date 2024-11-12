import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-2xl my-5 p-8 shadow-lg'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24 border-2 border-blue-300">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl text-blue-900'>{user?.fullname}</h1>
                            <p className="text-blue-700">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setOpen(true)} 
                        className="text-right border-blue-300 text-blue-700 hover:bg-blue-200" 
                        variant="outline"
                    >
                        <Pen />
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2 text-blue-800'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-blue-800'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className="text-blue-900 font-bold">Skills</h1>
                    <div className='flex items-center gap-2'>
                        {
                            user?.profile?.skills.length !== 0 
                                ? user?.profile?.skills.map((item, index) => (
                                    <Badge 
                                        key={index} 
                                        className="bg-blue-100 text-blue-700 border border-blue-300"
                                    >
                                        {item}
                                    </Badge>
                                )) 
                                : <span className="text-blue-700">NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-blue-900 font-bold">Resume</Label>
                    {
                        isResume 
                            ? <a 
                                target='_blank' 
                                href={user?.profile?.resume} 
                                className='text-blue-500 hover:underline cursor-pointer'
                              >
                                {user?.profile?.resumeOriginalName}
                              </a> 
                            : <span className="text-blue-700">NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-2xl p-4 shadow-lg'>
                <h1 className='font-bold text-lg text-blue-900 my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;
