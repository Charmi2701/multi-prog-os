import React from 'react';
import { connect } from 'react-redux';

const Block = (props) => {
    //console.log(props);
    const mem = Object.assign({}, props.memory, { modalOpen: true });
    var x = 4;
    let block = [];
    for(let i = 0; i < x; i++) {
        block.push(
            <td>
                {mem[props.rn][props.cn][i]}
            </td>
        )
    }
    return block;
}

const mapStateToProps = (state) => ({
    memory: {...state.inputs.memory, modalOpen:true},
});

export default connect(mapStateToProps)(Block);