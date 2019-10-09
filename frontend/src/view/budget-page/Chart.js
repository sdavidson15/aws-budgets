import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import AppState from './../../controller/State';
import Formatters from './../../model/Formatters';

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Budget History</Title>
      <ResponsiveContainer>
        <LineChart
          data={Formatters.formatChartData(AppState.BudgetHistory())}
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
          <Line type="monotone" dataKey="actual" stroke="#556CD6" dot={true} />
          <Line type="monotone" dataKey="budgeted" stroke="#CF2727" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
