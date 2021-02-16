import React from 'react';
import Image from 'react-bootstrap/Image'

class Dashboard extends React.Component{
    constructor(props) {
        super(props)
    }
    prepareDashboard = () => {
        return  <Image src="../welcome2.png" fluid />
    }
    render() {
        return this.prepareDashboard();
    }
}

export default Dashboard;