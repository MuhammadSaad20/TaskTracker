import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation} from 'react-router-dom'

/*const Header = ({title}) => {
    return (
        
        <header>
            <h1 style={headingStyle}>{title}</h1>
        </header>
    )
}*/
const Header = ({title, onAdd, showAdd}) => {
    /*const onClick = () =>{
        console.log('Click')
    }*/

    const location=useLocation()
    return (

        <header className="header">
            {location.pathname === '/about' ? <h1 style={{ margin: '0px 115px' }}>{title}</h1> : <h1>{title}</h1> }
            {location.pathname==='/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>}
        </header>
    )
}
Header.defaultProps={
title: 'Task Tracker',
}

Header.propTypes={
    title:PropTypes.string,
}

//Add css in recat js
/*const headingStyle={
    color:'red',
    backgroundColor:'black'
}*/

export default Header