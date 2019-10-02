import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import AppState from './../../controller/State'

function formatRow(date, actual, budgeted) {
  // Date formatting for the x-axis labels
  var month = date.substring(0, 3);
  var year = date.substring(date.length-2, date.length);
  date = month.concat(" ", year);
  return { date, actual, budgeted };
}

function formatData(data) {
  data.reverse(); // Read left to right chronologically
  data.pop(); // Don't include current month
  return data.map(function(row) {
    return formatRow(row.date, row.actual, row.budgeted);
  });
}

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Budget History</Title>
      <ResponsiveContainer>
        <LineChart
          data={formatData(AppState.BudgetHistory())}
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
