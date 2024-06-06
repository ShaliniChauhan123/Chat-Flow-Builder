# BiteSpeed Frontend Task: Chatbot Flow Builder

Deploy Link: https://chat-flow-builder-kx8a5d4fl-shalini-chauhans-projects.vercel.app

## Overview

This project is a simple Chatbot Flow Builder created using React. The goal is to make the code extensible, allowing for easy addition of new features.

A chatbot flow is constructed by connecting multiple messages in sequence, determining the order of execution.

## Features

- **Text Node**
  - Currently supports only Text Messages.
  - Multiple Text Nodes can be included in one flow.
  - Nodes can be added by dragging and dropping from the Nodes Panel.

- **Nodes Panel**
  - Contains all types of Nodes supported by the Flow Builder.
  - Initially includes only Message Node but is designed to be extensible for future additions.

- **Edge**
  - Connects two Nodes together.

- **Source Handle**
  - Origin point for a connecting edge.
  - Each source handle can have only one edge.

- **Target Handle**
  - Endpoint for a connecting edge.
  - Each target handle can have multiple edges connected to it.

- **Settings Panel**
  - Replaces the Nodes Panel when a Node is selected.
  - Includes a text field to edit the text of the selected Text Node.

- **Save Button**
  - Allows saving the flow.
  - Displays an error if there are multiple Nodes and one or more Nodes have empty target handles.

## Libraries Used

- [React](https://reactjs.org/)
- [React Flow](https://reactflow.dev/)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   git clone https://github.com/ShaliniChauhan123/Chat-Flow-Builder.git
   cd chatbot-flow-builder
