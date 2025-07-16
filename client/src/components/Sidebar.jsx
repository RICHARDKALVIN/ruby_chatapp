import React from 'react';

const Sidebar = ({ members }) => {
  return (
    <div className="w-64 bg-white border-r p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Members</h2>
      <ul className="space-y-2">
        {members.map((member, idx) => (
          <li key={idx} className="text-gray-700 hover:text-purple-600">
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
