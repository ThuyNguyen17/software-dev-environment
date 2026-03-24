import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    PerformanceContainer,
    SidebarContainer,
    Content,
    PerformanceHeader,
    PerformanceInfo,
    PerformanceGraphContainer,
    TotalMarks
} from "../../styles/PerformanceStyles";

const PerformanceSection = () =>{

    const [isOpen, setIsOpen] = useState(true);

    const performanceData = {
        months: ['January', 'February', 'March', 'April', 'May'],
        marks: [85, 90, 78, 92, 88],
        totalMarks: 450
    };

    const linerGraphData = {
        labels: performanceData.months,
        datasets: [
            {
                label: 'Performance Trends',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                data: performanceData.marks
            }
        ]
    };

    return(
        <PerformanceContainer>
            <SidebarContainer>
                <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            </SidebarContainer>
            <Content isOpen={isOpen}>
                <PerformanceHeader>Performance</PerformanceHeader>
                <PerformanceInfo>
                    <PerformanceGraphContainer>
                        <Line 
                            data={linerGraphData}
                            options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                        }
                                    }]
                                }
                            }}
                        />
                    </PerformanceGraphContainer>
                    <TotalMarks>Total Marks: {performanceData.totalMarks}</TotalMarks>
                </PerformanceInfo>
            </Content>
        </PerformanceContainer>
    )
}

export default PerformanceSection