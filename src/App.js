import React from 'react';
import SearchNavBar from "./components/navigation/SearchNavBar";
import {
    BrowserRouter as Router
} from 'react-router-dom'
import RootRoute from "./routes/RootRoute";
import {CssBaseline} from "@material-ui/core";
import MiniDrawerContainer from "./components/navigation/MiniDrawerContainer";


class DebugRouter extends Router {
    constructor(props) {
        super(props);
        console.log('initial history is: ', JSON.stringify(this.history, null, 2))
        this.history.listen((location, action) => {
            console.log(
                `The current URL is ${location.pathname}${location.search}${location.hash}`
            )
            console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
        });
    }
}

function App() {
    return (
        <CssBaseline>
            <DebugRouter>
                <MiniDrawerContainer>
                    <RootRoute account={{yo: 'dude'}}/>
                </MiniDrawerContainer>
            </DebugRouter>
        </CssBaseline>

    );
}

export default App;
