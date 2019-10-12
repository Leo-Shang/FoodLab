import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from "./frontend/pages/Hompage";
import cartReducer from './frontend/component/ItemDetail/reducers/cartReducer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Instruction from "./frontend/pages/Instruction";

const App = () => {
    return(
        <div className="navigation">
            <Homepage />
        </div>    
    );
}

const store = createStore(cartReducer);

ReactDOM.render(<Provider store={store}><App/></Provider>,document.querySelector('#root'))