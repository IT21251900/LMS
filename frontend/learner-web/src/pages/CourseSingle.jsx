import React from 'react';
import { useParams } from 'react-router-dom';

const CourseSingle = () => {
    const { id } = useParams();

    // Your code here

    return (
        <div>
            <h1>Course Single Page</h1>
            <p>Course ID: {id}</p>
        </div>
    );
};

export default CourseSingle;