import React, { useState } from 'react'
import { Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';
import {connect} from 'react-redux';
import { addInput, reset, setDataInMemory } from '../actions/input_actions';

const ProcessorLayout = (props) => {
    console.log(props);
    var commands = [];
    var addresses = [];
    const {inputs} = props;
    const [noOfInstructions, setNoOfInstructions] = useState(0);
    const [show, setShow] = useState(false);
    const AddressAlert = () => {
        if(show) {
            return (
                <Alert variant="danger" onClose={() => {setShow(false); setNoOfInstructions(0); props.reset();}} dismissible>
                    <Alert.Heading>No Address Provided</Alert.Heading>
                    <p>Address not provided for some intructions. Please rewrite the program correctly</p>
                </Alert>
            )
        } else {
            return (<></>)
        }
    }
    const InputDataField = () => {
        const [data, setData] = useState("");
        const handleChange = (e) => {
            e.preventDefault();
            //console.log(e.target.value);
            setData(e.target.value);
        }
        const handleClick = (e) => {
            e.preventDefault();
            console.log(data);
            console.log(data.split("\n"));
            props.setDataInMemory({data: data.split("\n")});
        }
        return(
            <>
                <FormControl
                as="textarea"
                rows="9"
                placeholder="Input data"
                aria-label="Input data"
                onChange={handleChange}
                style={{marginBottom:10}}
                />
                <Button variant="outline-success" onClick={handleClick}>Submit</Button>
            </>
        )
    }
    const InputFields = () => {
        let fields = [];
        const handleSelect = (e, i) => {
            e.preventDefault();
            //commands[i] = e.target.value;
            //console.log(inputs.address[i])
            props.addInput({i: i, command: e.target.value, address: inputs.address[i]});
            //console.log(e);
        }
        const handleChange = (e, i) => {
            e.preventDefault();
            addresses[i] = parseInt(e.target.value);
            if(e.target.value !== "") {
                props.addInput({i: i, address: parseInt(e.target.value), command: inputs.instruction[i]});
            } else {
                props.addInput({i: i, address: "", command: inputs.instruction[i]});
            }
            //console.log(e);
        }
        const handleAddSubmit = (e, i) => {
            e.preventDefault();
            //console.log(e);
            //console.log({i: i, command: commands[i], address: addresses[i]})
            //props.addInput({i: i, command: commands[i], address: addresses[i]});
            //props.addInput({i: i, address: addresses[i], command: inputs.instruction[i]});
            addresses[i+1] = ""
            setNoOfInstructions(noOfInstructions+1);
        }
        const handleChangeSubmit = (e, i) => {
            e.preventDefault();
            //console.log(e);
            //props.addInput({i: i, address: addresses[i], command: inputs.instruction[i]});
        }
        for(let i = 0; i <= noOfInstructions; i++) {
            //console.log("Hello World");
            fields.push(
                <Form.Group 
                 controlId={"inputInstruction"+toString(i)}
                 key={i}
                >
                    <InputGroup className="mb-3" custom>
                        <Form.Control
                         aria-describedby="select-inst"
                         as="select"
                         custom
                         title="Select Instruction"
                         onChange={(e) => handleSelect(e, i)}
                         inline
                         defaultValue="Select"
                         value={inputs.instruction[i]}
                         disabled={i === noOfInstructions ? false : true}
                        >
                            <option>Select</option>
                            <option>GD</option>
                            <option>PD</option>
                            <option>LR</option>
                            <option>SR</option>
                            <option>CR</option>
                            <option>BT</option>
                            <option>H</option>
                        </Form.Control>
                        <FormControl 
                         aria-describedby="enter-address" 
                         onChange={(e) => handleChange(e, i)}
                         placeholder="Address/Location (if applicable)"
                         inline
                         style={{width:175}}
                         defaultValue=""
                         value={inputs.address[i]}
                         disabled={i === noOfInstructions ? false : true}
                        />
                        {noOfInstructions === i ? (
                            <>
                            <InputGroup.Append>
                                <Button 
                                variant="outline-secondary" 
                                style={{width:60}}
                                onClick={(e) => handleAddSubmit(e, i)}
                                >
                                    Add
                                </Button>
                            </InputGroup.Append>
                            <AddressAlert />
                            </>
                            ) : (
                                <span style={{width:60}}> </span>
                            )
                        }
                    </InputGroup>
                </Form.Group>
            );
        }
        return (
            <Form>
                {fields}
                <Button variant="outline-danger" onClick={() => {setNoOfInstructions(0); props.reset();}}>Reset</Button>
                <Button variant="outline-success" style={{marginLeft:10}}>Submit</Button>
            </Form>);
    }
    const handleRun = () => {
        for(let i = 0; i <= noOfInstructions; i++) {
            switch(inputs.instruction[i]){
                case "GD":
                    //console.log(inputs.address[i]);
                    if(inputs.address[i] !== "" && inputs.address[i] !== undefined) {
                        console.log("Run GD")
                    } else {
                        console.log("Address not found")
                        setShow(true);
                    }
                    break;
                case "PD":
                    //console.log(inputs.instruction[i]);
                    if(inputs.address[i] !== "" && inputs.address[i] !== undefined) {
                        console.log("Run PD")
                    } else {
                        console.log("Address not found")
                        setShow(true);
                    }
                    break;
                case "LR":
                    //console.log(inputs.instruction[i]);
                    if(inputs.address[i] !== "" && inputs.address[i] !== undefined) {
                        console.log("Run LR")
                    } else {
                        console.log("Address not found")
                        setShow(true);
                    }
                    break;
                case "SR":
                    //console.log(inputs.instruction[i]);
                    if(inputs.address[i] !== "" && inputs.address[i] !== undefined) {
                        console.log("Run SR")
                    } else {
                        console.log("Address not found")
                        setShow(true);
                    }
                    break;
                case "CR":
                    //console.log(inputs.instruction[i]);
                    if(inputs.address[i] !== "" && inputs.address[i] !== undefined) {
                        console.log("Run CR")
                    } else {
                        console.log("Address not found")
                        setShow(true);
                    }
                    break;
                case "BT":
                    //console.log(inputs.instruction[i]);
                    if(inputs.address[i] !== "" && inputs.address[i] !== undefined) {
                        console.log("Run BT")
                    } else {
                        console.log("Address not found")
                        setShow(true);
                    }
                    break;
                case "H":
                    console.log("Halt program");
                    break;
                default:
                    if(i == noOfInstructions)
                        console.log("End of Program");
                    else
                        console.log("Error in Program execution");
            }
        }
    }
    
    return (
        <>
        <div style={{margin:10, borderStyle:'solid', padding:10, borderColor:'#D9A63F'}}>
            <p style={{fontWeight:'bold'}}>Input Instructions: </p>
            <InputFields />
        </div>
        <div style={{margin:10, borderStyle:'solid', padding:10, borderColor:'#D9A63F'}}>
            <p style={{fontWeight:'bold'}}>Input Data: </p>
            <InputDataField />
        </div>
        <div style={{margin:10, padding:10}}>
            <Button variant="outline-success" onClick={handleRun}>Run</Button>
        </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    inputs: state.inputs,
});

const mapDispatchToProps = (dispatch) => {
    return {
        addInput : (data) => dispatch(addInput(data)),
        reset : (data) => dispatch(reset(data)),
        setDataInMemory: (data) => dispatch(setDataInMemory(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessorLayout);
