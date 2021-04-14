import React, { useState } from 'react'
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { addInput, reset } from '../actions/input_actions';

const ProcessorLayout = (props) => {
    console.log(props);
    var commands = [];
    var addresses = [];
    const {inputs} = props;
    const [noOfInstructions, setNoOfInstructions] = useState(0);
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
            console.log(e);
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
                     controlId="inputInstructions"
                     key={i}
                    >
                     <InputGroup className="mb-3" custom>
                        <Form.Control
                         as="select"
                         custom
                         title="Select Instruction"
                         onChange={(e) => handleSelect(e, i)}
                         inline
                         defaultValue="GD"
                         value={inputs.instruction[i]}
                         disabled={i === noOfInstructions ? false : true}
                        >
                            <option>GD</option>
                            <option>PD</option>
                            <option>LR</option>
                            <option>SR</option>
                            <option>CR</option>
                            <option>BT</option>
                            <option>H</option>
                        </Form.Control>
                        <FormControl 
                         aria-describedby="basic-addon1" 
                         onChange={(e) => handleChange(e, i)}
                         placeholder="Address/Location (if applicable)"
                         inline
                         style={{width:175}}
                         defaultValue=""
                         value={inputs.address[i]}
                         disabled={i === noOfInstructions ? false : true}
                        />
                        {noOfInstructions === i ? (
                            <InputGroup.Append>
                                <Button 
                                variant="outline-secondary" 
                                style={{width:60}}
                                onClick={(e) => handleAddSubmit(e, i)}
                                >
                                    Add
                                </Button>
                            </InputGroup.Append>) : (
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
    return (
        <div style={{margin:10, borderStyle:'solid', padding:10, borderColor:'#D9A63F'}}>
            <p style={{fontWeight:'bold'}}>Input : </p>
            <InputFields />
        </div>
    );
}

const mapStateToProps = (state) => ({
    inputs: state.inputs,
});

const mapDispatchToProps = (dispatch) => {
    return {
        addInput : (data) => dispatch(addInput(data)),
        reset : (data) => dispatch(reset(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessorLayout);
