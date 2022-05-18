import { signOut } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import auth from './firebase.config';

const Navication = () => {
    return (
        <div className='md:container md:mx-auto'>
            <div class="navbar bg-base-100 ">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabIndex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="round" strokeLinejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        
                        </ul>
                    </div>
                    <Link to='/' class="btn btn-ghost normal-case text-xl">Taskitor</Link>
                </div>
                <div class="navbar-end hidden lg:flex ">
                    <ul class="menu menu-horizontal p-0 ">
                        <div onClick={()=> signOut(auth)} class="btn">Log Out</div>
                    </ul>
                </div>
               
            </div>
        </div>
    );
};

export default Navication;