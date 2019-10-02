import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

function createData(date, spend, budget) {
  return { date, spend, budget };
}

// TODO: hit an endpoint to collect the data.
var data = [
  createData('Oct \'18', 1341.69, 1000),
  createData('Nov \'18', 1115.29, 1000),
  createData('Dec \'18', 1275.56, 1000),
  createData('Jan', 357.57, 1000),
  createData('Feb', 170.19, 1000),
  createData('Mar', 191.53, 1000),
  createData('Apr', 412.81, 1000),
  createData('May', 385.70, 1000),
  createData('Jun', 399.78, 1000),
  createData('Jul', 446.48, 1000),
  createData('Aug', 554.94, 1000),
  createData('Sep', 776.88, 1000)
];

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Budget History</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Spend ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="spend" stroke="#556CD6" dot={true} />
          <Line type="monotone" dataKey="budget" stroke="#CF2727" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
