import { Layers, Schema, World } from "@latticexyz/recs";
import { Fragment, useState } from "react";
import { CheatcodesList } from "./CheatcodesList";
import { Editor } from "./Editor";
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
  const [isVisible, setIsVisible] = useState<number>(0);
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
    <div className="flex justify-between bg-slate-900 p-2 text-xs">
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
      <button className="px-4 py-1" onClick={() => setIsVisible(0)}>
        X
      </button>
    </div>
  );

  return (
    <div
      className={`${
        isVisible !== undefined ? "w-96" : "w-0"
      } overflow-auto bg-[rgba(17,24,39,1)] text-[#8C91A0] h-full z-[999999] fixed bottom-0 right-0 h-screen text-size-1 flex flex-col bg-slate-800 text-white`}
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
    </div>
  );
};
