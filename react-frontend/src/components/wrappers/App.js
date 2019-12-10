import React, {Component} from 'react';
import Main from '../ui/Main';
import StateProvider from './StateProvider';
import KeyStrokeHandler from './KeyStrokeHandler';

class App extends Component {
    render() {
        return (
            <StateProvider>
                <KeyStrokeHandler>
                    <Main/>
                </KeyStrokeHandler>
            </StateProvider>
        );
    }
}

export default App;
