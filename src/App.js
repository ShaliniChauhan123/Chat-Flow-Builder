import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
} from "reactflow";
import "reactflow/dist/base.css";
import Sidebar from "./components/Sidebar.js";
import TextNode from "./components/TextNode.js";
import AlertMessage from "./components/AlertMessage.js";

let id = 0;
// Initial node to display at first
const initialNodes = [
  {
    id: "1",
    type: "textnode",
    data: { label: "input nodes" },
    position: { x: 250, y: 5 },
  },
];

// This getId function is providing different ids for each node
const getId = () => `node_${id++}`;

const App = () => {
  const nodeTypes = useMemo(
    () => ({
      textnode: TextNode,
    }),
    []
  );

  //All local states and hooks defined below-
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const reactFlowWrapper = useRef(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [nodeName, setNodeName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);

  // Update nodes data when nodeName or selectedItems changes
  useEffect(() => {
    if (selectedItems.length > 0) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedItems[0]?.id) {
            node.data = {
              ...node.data,
              label: nodeName,
            };
          }
          return node;
        })
      );
    } else {
      // Clear nodeName Text when no node is selected
      setNodeName("");
    }
  }, [nodeName, selectedItems, setNodes]);

  // On clicking node follow below function-
  const onNodeClickHandler = useCallback(
    (event, node) => {
      setSelectedItems([node]);
      setNodeName(node.data.label);
      setNodes((nodes) =>
        nodes.map((n) => ({
          ...n,
          selected: n.id === node.id,
        }))
      );
    },
    [setNodes]
  );

  // Check for empty target handles
  const checkEmptyTargetHandles = useCallback(() => {
    let emptyTargetHandles = 0;
    edges.forEach((edge) => {
      if (!edge.targetHandle) {
        emptyTargetHandles++;
      }
    });
    return emptyTargetHandles;
  }, [edges]);

  // Check if any node is unconnected
  const isNodeUnconnected = useCallback(() => {
    let unconnectedNodes = nodes.filter(
      (node) =>
        !edges.find(
          (edge) => edge.source === node.id || edge.target === node.id
        )
    );

    return unconnectedNodes.length > 0;
  }, [nodes, edges]);

  //save flow function
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const emptyTargetHandles = checkEmptyTargetHandles();

      if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
        // Show cannot saved when save is unsuccessful
        setErrorMessage("Cannot save Flow");
        setMessageColor("bg-red-400 text-black rounded-md");
        //clear message after 5000ms
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      } else {
        // Show saved when save is successful
        setErrorMessage("Saved Flow");
        setMessageColor("bg-lime-400 text-black rounded-md");
        //clear message after 5000ms
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  }, [reactFlowInstance, nodes, isNodeUnconnected, checkEmptyTargetHandles]);

  // edge connection handler
  const onConnect = useCallback(
    (params) => {
      //edge is added
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  // Enable drop effect on drag over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop event to add a new node
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      //Node is created
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const rfStyle = {
    backgroundColor: "#ffffff",
  };

  return (
    <div className="relative w-screen h-screen flex flex-col">
      {/* Top section with alert message and save button */}
      <div className="w-full flex bg-gray-200 p-3">
        <div className="w-[85%]">
          <div className="flex justify-center">
            <AlertMessage
              errorMessage={errorMessage}
              messageColor={messageColor}
            />
          </div>
        </div>
        <button
          className="m-2 bg-white hover:bg-blue-200 text-blue-500 rounded border border-blue-500 p-2"
          onClick={onSave}
        >
          Save Changes
        </button>
      </div>

      {/* Main section with ReactFlow and Sidebar */}
      <div className="flex flex-grow w-full">
        <div className="flex-grow" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={rfStyle}
            onNodeClick={onNodeClickHandler}
            onPaneClick={() => {
              // Reset selected elements when clicking on pane
              setSelectedItems([]);
              setNodes((nodes) =>
                nodes.map((n) => ({
                  ...n,
                  // Reset selected state of nodes when clicking on pane
                  selected: false,
                }))
              );
            }}
            fitView
          >
            <Panel />
          </ReactFlow>
        </div>
        <Sidebar
          nodeName={nodeName}
          setNodeName={setNodeName}
          selectedNode={selectedItems[0]}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  );
};

export default App;
