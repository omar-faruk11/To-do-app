import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../Components/firebase.config';
import Loading from '../../Components/Loading';
import Navication from '../../Components/Navication';
import Note from '../../Components/Note';

const Home = () => {
    const [user, loading, eerror] = useAuthState(auth);
    const email = user.email;


    const { isLoading, data, refetch } = useQuery("notes", async () => {
        return await axios.get(`http://localhost:5000/notes?email=${email}`)
    })
    if (isLoading) {
        return <Loading />
    };


    const handletaskSubmit = event => {
        event.preventDefault();
        const name = event.target.taskName.value;
        const description = event.target.description.value;
        const notesData = { name, description, email };
        (async () => {
            const { data } = await axios.post('http://localhost:5000/notes', { notesData })
            if (data.insertedId) {
                refetch();
                event.target.reset()
                toast.success('task added', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })()

    };
    const handleDeleteItem = (id) => {
        const confram = window.confirm('Are you sure?');
        if (confram) {
            (async () => {
                const { data } = await axios.delete(`http://localhost:5000/notes/${id}`)
                if (data) {
                    refetch();
                    toast.success('task Deleted', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }
            })();
        }
    }

    return (
        <div>
            <Navication />
            <h2 className='text-center text-2xl text-rose-500 font-bold '> Welcome to Taskitor.</h2>
            <div className=' flex justify-center'>
                <div class="divider w-56 mb-2"></div>
            </div>
            <div className=' flex justify-center'>
                <label htmlFor="my-modal-6" class="btn px-16 mt-0 modal-button">Add task</label>
            </div>

            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="my-modal-6" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handletaskSubmit}>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Task Name</span>
                            </label>
                            <input type="text" placeholder="Your task name" name='taskName' required class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Task description</span>
                            </label>
                            <textarea type="text" placeholder="Your task description" name='description' required class="textarea textarea-bordered" />
                        </div>
                        <div className="flex justify-center">
                            <button class="modal-action btn w-1/2 ">
                                <label type='submit' className=' w-full' htmlFor="my-modal-6">Complete</label>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            {
                (!data.data.length === 0) ? <>
                    <div className=" mx-5 md:mx-28 mt-10">
                        <h2 className='text-center text-4xl text-rose-500 mb-10'> Your tasks</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {
                                data.data.map(note => <Note key={note._id} note={note} handleDeleteItem={handleDeleteItem} />)
                            }
                        </div>
                    </div>
                </> : <>
                    <h4 className=" ml-10 text-2xl md:text-4xl font-bold text-gray-300 md:ml-40 mt-10"> No task found ?</h4>
                </>

            }
        </div >
    );
};

export default Home;