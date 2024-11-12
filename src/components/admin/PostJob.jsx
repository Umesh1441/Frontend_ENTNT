import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl bg-blue-50 border border-blue-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className="text-blue-800">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="border border-blue-300 focus:ring-blue-500 focus:border-blue-500 my-1"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-800">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="border border-blue-300 focus:ring-blue-500 focus:border-blue-500 my-1"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-800">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="border border-blue-300 focus:ring-blue-500 focus:border-blue-500 my-1"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-800">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="border border-blue-300 focus:ring-blue-500 focus:border-blue-500 my-1"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-800">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="border border-blue-300 focus:ring-blue-500 focus:border-blue-500 my-1"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-800">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="border border-blue-300 focus:ring-blue-500 focus:border-blue-500 my-1"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-800">Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="border border-blue-300 focus:ring-blue-500 focus:border-blue-500 my-1"
                            />
                        </div>
                        <div>
                            <Label className="text-blue-800">No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="border border-blue-300 focus:ring-blue-500 focus:border-blue-500 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px] bg-blue-100 border border-blue-300 text-blue-800">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-blue-50 border border-blue-300">
                                        <SelectGroup>
                                            {
                                                companies.map((company) => (
                                                    <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-4 bg-blue-300 text-white">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-blue-700 hover:bg-blue-800 text-white rounded-lg">
                                Post New Job
                            </Button>
                        )
                    }
                    {
                        companies.length === 0 && (
                            <p className='text-xs text-red-600 font-bold text-center my-3'>
                                *Please register a company first, before posting a job
                            </p>
                        )
                    }
                </form>
            </div>
        </div>
    );
};

export default PostJob;
