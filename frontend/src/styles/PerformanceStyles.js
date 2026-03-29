import styled from 'styled-components';

export const PerformanceContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
`;

export const PerformanceContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const PerformanceHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const PerformanceGraphs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const PerformanceGraph = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
`;

export const PerformanceInfo = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Backward-compatible exports used by pages
export const SchoolPerformance = PerformanceInfo;
export const IndividualPerformance = PerformanceInfo;
export const PerformanceGraphContainer = PerformanceGraph;
export const TotalMarks = styled.p`
  margin: 0;
  font-weight: 600;
  color: #333;
`;