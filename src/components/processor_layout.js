import React, { useState } from 'react'
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { addInput } from '../actions/input_actions';

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
            commands[i] = e.target.value;
            //console.log(e);
        }
        const handleChange = (e, i) => {
            e.preventDefault();
            addresses[i] = e.target.value;
            //console.log(e);
        }
        const handleAddSubmit = (e, i) => {
            e.preventDefault();
            //console.log(e);
            if(e) {
                props.addInput({i: i});
            }
            setNoOfInstructions(noOfInstructions+1);
        }
        const handleChangeSubmit = (e, i) => {
            e.preventDefault();
            //console.log(e);
            if(e) {
                props.addInput({i: i});
            }
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
                                <InputGroup.Append>
                                <Button 
                                variant="outline-secondary" 
                                style={{width:60, fontSize:12}}
                                onClick={(e) => handleChangeSubmit(e, i)}
                                >
                                    Change
                                </Button>
                            </InputGroup.Append>
                            )
                        }
                        </InputGroup>
                    </Form.Group>
            );
        }
        return (
            <Form>
                {fields}
                <Button variant="outline-danger" onClick={() => {setNoOfInstructions(0)}}>Reset</Button>
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
        addInput : (data) => dispatch(addInput(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessorLayout);
