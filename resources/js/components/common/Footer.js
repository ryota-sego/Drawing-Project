import React, { useState, useEffect } from 'react';

export default function Footer(props) {
    return(
        <footer className="block absolute bottom-0 w-full h-100 bg-green-200 border-b-2">
            <div className="mx-0 px-0">
                <div className="flex justify-center items-center border-gray-100 md:space-x-10 h-8 md:h-15">
                    <p className="my-2">I'm the footer!</p>
                </div>
            </div>
        </footer>
    );
}