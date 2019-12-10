import React from 'react';
import Filter from './Filter';
import ButtonWrapper from './ButtonWrapper';

export default function Footer(props) {
    const {model, count, filter, changeFilter} = props;

    return (
        <footer className="clearfix">
            <div className="pull-left buttons">
                <ButtonWrapper {...props}/>
            </div>
            <div className="pull-left">
                {model === "todo" ? `${count} items left` :  `${count} ${model}s`}
            </div>
            <div className="pull-right">
                <Filter {...{model, filter, changeFilter}}/>
            </div>
        </footer>
    );
}
