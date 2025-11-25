import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function BarGraph({ data, datakey }) {
  return (
    <ResponsiveContainer width="100%" height="90%"  >
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(0,0,0,0.07)" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={datakey} fill="#2563eb" barSize={25} radius={[4, 4, 0, 0]}  />
      </BarChart>
    </ResponsiveContainer>
  );
}




export default BarGraph