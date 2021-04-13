import React, { Component } from 'react'
import MOSNavbar from './navbar';
import '../styles/phase1.css';
import ProcessorLayout from './processor_layout.js';
import MemoryLayout from './memory_layout.js';

export class Phase1 extends Component {
    render() {
        return (
            <div>
                <MOSNavbar/>
                <div className="split-screen">
                    <div className="processor">
                        <ProcessorLayout />
                    </div>
                    <div className="memory">
                        <MemoryLayout />
                    </div>
                </div>
            </div>
        )
    }
}

export default Phase1;
