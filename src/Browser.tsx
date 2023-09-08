import { Layers, Schema, World } from "@latticexyz/recs";
import { Fragment, useState } from "react";
import { CheatcodesList } from "./CheatcodesList";
import { Editor } from "./Editor";
import { BrowserContainer } from "./StyledComponents";
import { Cheatcodes, SetContractComponentFunction } from "./types";

/**
 * An Entity Browser for viewing/editiing Component values.
 */
export const Browser = ({
  layers,
  setContractComponentValue,
  world,
  showEditor = true,
  cheatcodes = undefined,
  tabs = [],
}: {
  layers: Layers;
  setContractComponentValue?: SetContractComponentFunction<Schema>;
  world: World;
  showEditor?: boolean;
  cheatcodes?: Cheatcodes;
  tabs?: { name: string; content: JSX.Element }[];
}) => {
  const [isVisible, setIsVisible] = useState<number>();
  const cheatcodesTab =
    cheatcodes && Object.keys(cheatcodes).length > 0
      ? [
          {
            name: "Cheatcodes",
            content: <CheatcodesList cheatcodes={cheatcodes} />,
          },
        ]
      : [];
  const editorTab = showEditor
    ? [
        {
          name: "Editor",
          content: (
            <Editor
              world={world}
              layers={layers}
              setContractComponentValue={setContractComponentValue}
            />
          ),
        },
      ]
    : [];
  tabs = [...cheatcodesTab, ...editorTab, ...tabs];
  const TopBar = () => (
    <div className="flex justify-between bg-gray-400 p-2">
      <div className="flex gap-1">
        {tabs.length > 0 &&
          tabs.map(({ name }, i) => (
            <button
              style={{
                paddingInline: 8,
                background: isVisible === i ? "royalblue" : "darkgray",
                opacity: isVisible === i ? "1" : ".5",
              }}
              key={`tab-${i}`}
              onClick={() => setIsVisible(i)}
            >
              {name}
            </button>
          ))}
      </div>
      <button className="px-4 py-2" onClick={() => setIsVisible(undefined)}>
        X
      </button>
    </div>
  );

  return (
    <BrowserContainer
      style={{
        zIndex: 1002,
        position: "fixed",
        bottom: 0,
        right: 0,
        width: isVisible !== undefined ? "24rem" : 0,
        height: "100vh",
        fontSize: "10pt",
        display: "flex",
        flexDirection: "column",
        background: "dark-gray",
        color: "white",
      }}
    >
      {isVisible !== undefined && <TopBar />}
      {tabs.map(({ content }, i) =>
        isVisible === i ? <Fragment key={i}>{content}</Fragment> : null
      )}

      {isVisible === undefined && (
        <button
          style={{
            position: "fixed",
            zIndex: 1003,
            top: "4px",
            right: "4px",
            backgroundColor: "royalblue",
            width: "6rem",
            color: "white",
            fontSize: "12px",
            padding: "1px",
            borderRadius: "4px",
          }}
          onClick={() => setIsVisible(0)}
        >
          Show Browser
        </button>
      )}
    </BrowserContainer>
  );
};
