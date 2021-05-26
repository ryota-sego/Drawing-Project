import { useState } from 'react'

export default function Footer(props) {
    
    return(
        <footer className="hidden sm:block bottom-0 w-full wrap-color-blue">
                <div className="flex justify-center items-center md:space-x-10 h-8 md:h-15">
                    <p className="text-white">I'm the footer!</p>
                </div>
        </footer>
    );
}

