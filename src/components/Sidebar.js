import React from "react";

import leftArrow from "../assets/left-arrow.svg";

export default function Sidebar({
  nodeName,
  setNodeName,
  selectedNode,
  setSelectedItems,
}) {
  const handleInputChange = (event) => {
    setNodeName(event.target.value);
  };
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="border border-gray-300 p-4 text-sm w-64 h-screen text-black">
      {selectedNode ? (
        //settings panel to edit node name
        <div>
          <div className="flex justify-start items-center pb-3">
            <button onClick={() => setSelectedItems([])}>
              <img className="w-4 h-4" src={leftArrow} alt=""></img>
            </button>
            <h3 className="pl-2 ">Edit Message</h3>
          </div>
          <label className="block mb-2 text-sm font-medium text-blue-900">
            Node Name:
          </label>
          <input
            type="text"
            className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
            value={nodeName}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        //node panel to bring node at moving area
        <>
          <h3 className="text-xl mb-4 text-blue-900">Nodes Panel</h3>
          <div
            className="bg-white p-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
            onDragStart={(event) => onDragStart(event, "textnode")}
            draggable
          >
            Message Node
          </div>
        </>
      )}
    </aside>
  );
}
