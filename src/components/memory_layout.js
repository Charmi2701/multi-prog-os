import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'

const MemoryLayout = (props) => {
    //const [rowNo, setRowNo] = useState(0);
    console.log(props);
    const { memory } = props.inputs;
    var rowNo = 0
    const Block = ({rn,cn, m}) => {
        var x = 4;
        let block = [];
        for(let i = 0; i < x; i++) {
            block.push(
                <td>
                    {m[rn][cn][i]}
                </td>
            )
        }
        return block;
    }
    const Rowitem = ({rn, m}) => {
        var x = 10;
        let row = [];
        for(let i = 0; i < x; i++) {
            row.push(
                <td>
                    <Block rn={rn} cn={i} m={m}/>
                </td>
            )
        }
        return row;
    }
    const Tablebody = ({memory}) => {
        var x = 10;
        let tablebody = [];
        for (let i = 0; i < x; i++) {
            tablebody.push(
                <tr>
                    <th>{rowNo+i*10}</th>
                    <Rowitem rn={i} m={memory} />
                </tr>
            );
        }
        return (
            <>
            <tr>
                <tr> </tr>
                <th>0</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
            </tr>
            {tablebody}
            </>
        );
    }
        return (
            <>
            <div style={{margin:10, borderStyle:'solid', padding:10, borderColor:'#D9A63F'}}>
                <p style={{fontWeight:'bold'}}>Registers : </p>
                <Table striped bordered hover responsive size="sm">
                   <tbody style={{width:200}}>
                       <tr>
                           <th style={{width:150}}>R</th>
                           <td style={{width:150}}> </td>
                           <td style={{width:150}}> </td>
                           <td style={{width:150}}> </td>
                       </tr>
                   </tbody>
               </Table>
               <Table striped bordered hover responsive size="sm">
                   <tbody>
                       <tr>
                           <th style={{width:150}}>IR</th>
                           <td style={{width:150}}> </td>
                           <td style={{width:150}}> </td>
                           <td style={{width:150}}> </td>
                       </tr>
                   </tbody>
               </Table>
               <Table striped bordered hover responsive size="sm" style={{width:300}}>
                   <tbody>
                       <tr>
                           <th style={{width:150}}>IC</th>
                           <td style={{width:150}}> </td>
                       </tr>
                   </tbody>
                   <tbody>
                       <tr>
                           <th style={{width:150}}>C</th>
                           <td style={{width:150}}> </td>
                       </tr>
                   </tbody>
               </Table>
            </div>
            <div style={{margin:10, borderStyle:'solid', padding:10, borderColor:'#D9A63F'}}>
                <p style={{fontWeight:'bold'}}>Memory : </p>
                <Table striped bordered hover responsive size="sm">
                   <tbody>
                       <Tablebody memory={memory}/>
                   </tbody>
               </Table>
            </div>
            </>
        )
}

const mapStateToProps = (state) => ({
    inputs: state.inputs,
});

export default connect(mapStateToProps)(MemoryLayout);
