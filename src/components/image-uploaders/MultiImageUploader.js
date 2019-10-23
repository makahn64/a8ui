/*********************************

 File:       MultiImageUploader.js
 Function:   Drag and Drop Image Uploader
 Copyright:  AppDelegates LLC
 Date:       8/26/2018
 Author:     MAK


 **********************************/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {compact} from 'lodash';
import ImageUploader from "./ImageUploader";


class MultiImageUploader extends Component {

    constructor(props) {
        super(props);

        this.state = ({ imageMediaArray: []});

    }

    componentDidMount = () => {
        const ima = this.props.initialMediaArray ? [...compact(this.props.initialMediaArray)] : [];
        this.setState({imageMediaArray: ima});
    }

    imgChanged = (file, position) => {

        //console.log('breakhere');
        const newArray = [...this.state.imageMediaArray];

        if (!file) {
            //console.log(`Removing img element at ${position}`);
            newArray.splice(position, 1);
            this.setState({imageMediaArray: [] }, () =>
                {
                    this.setState({ imageMediaArray: newArray})
                });

        } else {
            //console.log(`Adding/replacing img element at ${position}`);
            newArray[position] = file;
            this.setState({imageMediaArray: newArray});

        }

        if (this.props.onChange) this.props.onChange(newArray);

    }

    addEntry = () => {
        if (this.props.maxCount === this.state.imageMediaArray.length) return; // too many
        const newArray = [...this.state.imageMediaArray];
        newArray.push('');
        this.setState({imageMediaArray: newArray});
    }


    render() {

        const downProps = {...this.props, onChange: this.imgChanged}

        const imgInputs = this.state.imageMediaArray.map((item, index) => (
            <ImageUploader {...downProps}
                               fieldName={`${index}`}
                               initialImgMedia={item}
                               key={index}
                               label={`Image ${index + 1}`}
                               instructions=""
                               style={{marginTop: 10}}/>));

        // const debugBullets = this.state.imageMediaArray.map((id, index) =>
        //     <li key={id}>{`${id} at index ${index}`}&nbsp;
        //         <span onClick={() => this.imgChanged(null, index)}>[DELETE]</span></li>);

        return (
            <div style={{border: '1px solid #e0e0e0', backgroundColor: 'white', padding: 10}}>
                <div>
                    <h4 style={{marginTop: 0}}>{this.props.label}<Button onClick={this.addEntry} className="float-right">ADD IMAGE</Button></h4>
                    <p className="text-muted">{this.props.instructions}</p>
                    {/*<ul>{debugBullets}</ul>*/}
                </div>
                <div>
                    {imgInputs}
                </div>
            </div>

        );
    }
}

MultiImageUploader.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    initialMediaArray: PropTypes.array,
    validate: PropTypes.string,
    aspectDeltaLimit: PropTypes.number,
    onChange: PropTypes.func,
    label: PropTypes.string,
    instructions: PropTypes.string,
    fieldName: PropTypes.string,
    maxCount: PropTypes.number
};


MultiImageUploader.defaultProps = {
    maxCount: 4,
};

export default MultiImageUploader;


