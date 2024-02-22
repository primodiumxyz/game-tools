import { setup, styled } from "goober";
import React, { createElement } from "react";

setup(createElement);

export const ComponentBrowserInput = styled("input", React.forwardRef)`
  background-color: #383c4a;
  color: #8c91a0;
  border: 1px rgba(0, 0, 0, 0.5) solid;
  border-radius: 4px;
  padding: 4px;
  padding-left: 8px;
  margin: 8px 0;

  &:focus {
    outline: none;
    border: 1px #8c91a0 solid;
  }
  ::selection {
    color: white;
    background: rgba(70, 89, 182, 0.9);
  }
`;

export const ComponentBrowserButton = styled("button")<{ active?: string }>`
  background-color: ${({ active }) =>
    active === "true" ? "#8c91a0" : "#383c4a"};
  color: ${({ active }) => (active === "true" ? "#383c4a" : "#8c91a0")};
  border: 1px rgba(0, 0, 0, 0.5) solid;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;

  &:hover {
    background-color: #8c91a0;
    color: #383c4a;
  }
`;

export const ComponentBrowserSelect = styled("select")`
  width: 180px;
  background-color: #383c4a;
  color: #8c91a0;
  border: 1px rgba(0, 0, 0, 0.5) solid;
  border-radius: 4px;
  padding: 4px;
`;

export const ValueForm = styled("form")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ComponentEditorContainer = styled("div")`
  margin: 8px auto;
`;

export const ComponentTitle = styled("div")`
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const EntityEditorContainer = styled("div")`
  border-bottom: 1px #8c91a0 solid;
  padding: 8px;
`;

export const BrowserContainer = styled("div")`
  word-wrap: break-word;
  width: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.2);
  color: #8c91a0;
  height: 100%;
  pointer-events: all;
`;

export const DraggableNumberLabelContainer = styled("label")`
  cursor: ew-resize;
  user-select: none;
  color: #8c91a0;
`;

export const SmallHeadline = styled("p")`
  padding: 8px;
  font-size: 14px;
`;

export const Collapse = styled("div")<{ opened: string }>`
  height: ${({ opened }) => (opened === "true" ? "auto" : "0px")};
  overflow: ${({ opened }) => (opened === "true" ? "initial" : "hidden")};
`;
