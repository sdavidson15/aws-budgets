import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

function createData(date, spend, budget) {
  return { date, spend, budget };
}

// TODO: hit an endpoint to collect the data.
var data = [
  createData('Oct 2018', 1341.69, 1000),
  createData('Nov 2018', 1115.29, 1000),
  createData('Dec 2018', 1275.56, 1000),
  createData('Jan 2019', 357.57, 1000),
  createData('Feb 2019', 170.19, 1000),
  createData('Mar 2019', 191.53, 1000),
  createData('Apr 2019', 412.81, 1000),
  createData('May 2019', 385.70, 1000),
  createData('Jun 2019', 399.78, 1000),
  createData('Jul 2019', 446.48, 1000),
  createData('Aug 2019', 554.94, 1000),
  createData('Sep 2019', 776.88, 1000)
];

// TODO: hit an endpoint to collect the title
var title = 'Monthly AWS Budget io-example 000000000000'

export default function Chart() {
  return (
    <React.Fragment>
      <Title>{title}</Title>
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
          <Line type="monotone" dataKey="spend" stroke="#556CD6" dot={false} />
          <Line type="monotone" dataKey="budget" stroke="#CF2727" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
