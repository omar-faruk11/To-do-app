import React from 'react';

const Note = ({ note,handleDeleteItem }) => {
    const { _id, name, description } = note;
    console.log(name, description);
    return (
        <div>
            <div class="card  bg-base-100 shadow-xl border-[1px]">
                <div onClick={()=>handleDeleteItem(_id)} className='btn btn-sm btn-circle absolute btn-white text-red-500 right-2 top-2'>X</div>
                <div class="card-body">
                    <h2 class="card-title">{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Note;