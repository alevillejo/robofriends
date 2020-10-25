import React, {Component} from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/searchbox';
import Scroll from '../Components/scroll';
import ErrorBoundry from '../Components/ErrorBoundry'



class App  extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users=> {this.setState({robots: users})})

    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }
    render() {
        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        return !this.state.robots.length ?
        <h1>Loading</h1>:
             (
                <div className='tc'>
                  <h1>Robofriends</h1>
                  <SearchBox searchChange={this.onSearchChange} />
                  <Scroll>
                      <ErrorBoundry>
                      <CardList robots={filteredRobots}/>
                      </ErrorBoundry>                     
                  </Scroll>

                </div>
        
            )       
    }

}

export default App;