import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


function PieGraph({ data }) {
  const COLORS = ["#22c55e", "#fbbf24", "#ef4444"];

  return (
    <ResponsiveContainer width="100%" height="80%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
}


export default PieGraph