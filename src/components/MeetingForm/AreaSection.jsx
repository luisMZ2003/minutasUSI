import React from 'react';
import { ShieldCheck, Building } from 'lucide-react';

const AreaSection = ({ title, items }) => {
  const Icon = title.includes('Normativa') ? ShieldCheck : Building;

  return (
    <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 h-full">
      <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2 mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-wine-DEFAULT" />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="text-gold-DEFAULT font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreaSection;