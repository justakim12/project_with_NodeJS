import React, { useEffect } from 'react'
import axios from 'axios';
import '../../../App.css';

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    return (
        <div className="landing-page">
            Landing Page
        </div>      
    )
}

export default LandingPage