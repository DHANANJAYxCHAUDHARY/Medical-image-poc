
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import type { DiagnosisResult } from '../types';

interface ResultsDisplayProps {
  results: DiagnosisResult[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-slate-300 rounded-lg shadow-lg">
          <p className="font-bold text-slate-700">{label}</p>
          <p className="text-sky-600">{`Probability: ${(payload[0].value * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
};

const COLORS = ['#0284C7', '#38BDF8', '#7DD3FC', '#BAE6FD']; // Sky blue palette

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const chartData = results.map(r => ({ ...r, name: r.condition }));

  return (
    <div className="animate-fade-in">
        <h3 className="text-xl font-bold text-center text-slate-700 mb-6">Analysis Results</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="w-full h-80 bg-slate-50/50 p-4 rounded-lg border border-slate-200">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 1]} tickFormatter={(tick) => `${tick * 100}%`} tick={{ fill: '#475569' }} />
                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fill: '#475569' }} interval={0} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}/>
                        <Bar dataKey="probability" barSize={30}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="space-y-4">
                {results.map((result, index) => (
                    <div key={index} className={`bg-white p-4 rounded-lg border shadow-sm transition-all duration-300 ${index === 0 ? 'border-sky-300 bg-sky-50 ring-2 ring-sky-200' : 'border-slate-200'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-lg text-slate-800 flex items-center">
                                {result.condition}
                                {index === 0 && <span className="ml-2 text-xs font-semibold text-white bg-sky-500 px-2 py-0.5 rounded-full">Top Finding</span>}
                            </h4>
                            <span className={`font-semibold text-sm px-3 py-1 rounded-full ${index === 0 ? 'bg-sky-200 text-sky-800' : 'bg-slate-100 text-slate-700'}`}>
                                {(result.probability * 100).toFixed(1)}%
                            </span>
                        </div>
                        <p className="text-slate-600 text-sm">{result.explanation}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
