import {Link} from 'react-router-dom'
export const About = () => {
    return (
        <div>
            <h4 style={headingStyle}>MS | Version 1.0.0</h4>
            <div style={{ textAlign: 'center' }}>
                <Link to="/" >Go Back</Link>
            </div>
           
        </div>
    )
}

const headingStyle={
    textAlign: 'center'
}

export default About
