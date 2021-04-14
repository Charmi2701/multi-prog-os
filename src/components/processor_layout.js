import React, { useState } from 'react'
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { addInput } from '../actions/input_actions';

const ProcessorLayout = (props) => {
    console.log(props);
    const [noOfInstructions, setNoOfInstructions] = useState(0);
    var inputInstruction = [];
    var inputAddress = [];
    const InputFields = () => {
        let fields = [];
        const handleSelect = (e, i) => {
            e.preventDefault();
            //console.log(i);
            inputInstruction[i] = e.target.value;
            console.log(i);
            console.log(inputInstruction[i]);
        }
        const handleChange = (e) => {
            e.preventDefault();
            //console.log(e);
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            //console.log(e);
            if(e) {
                props.addInput({value: 0});
            }
            setNoOfInstructions(noOfInstructions+1);
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
                         value={inputInstruction[i]}
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
                         onChange={handleChange}
                         placeholder="Address/Location (if applicable)"
                         inline
                         style={{width:175}}
                        />
                        {noOfInstructions === i ? (
                            <InputGroup.Append>
                                <Button 
                                variant="outline-secondary" 
                                style={{width:60}}
                                onClick={handleSubmit}
                                >
                                    Add
                                </Button>
                            </InputGroup.Append>) : (
                                <span style={{width:60}}>{}</span>
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
