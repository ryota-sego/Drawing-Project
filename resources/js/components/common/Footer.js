import React, { useState, useEffect } from 'react';

export default function Footer(props) {
    
    if(!props.isDrawing){
        return (
            <footer className="bg-green-200 border-b-2 h-8 md:h-15">
                <div className="max-w-full mx-0 px-0">
                    <div className="flex justify-between items-center border-gray-100 md:py-2 md:space-x-10">
                        <p>I'm a basic footer!</p>
                    </div>
                </div>
            </footer>
            );
    }
    
    return(
        <footer className=" bg-green-200 border-b-2">
                <div className="flex justify-center items-center max-w-full mx-0 px-0 h-15 md:h-30">
                    <div className="flex justify-center items-center border-gray-100 md:py-2 md:space-x-10">
                        <p>I'm the drawing footer!</p>
                    </div>
                </div>
            </footer>
        );
}