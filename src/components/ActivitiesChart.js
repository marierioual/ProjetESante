import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class ActivitiesChart extends PureComponent {
  render() {
    let data = this.props.data;

    return (
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <LineChart
          width={400}
          height={100}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datePretty" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" name="Temps d'activité (minutes)" dataKey="duration" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
