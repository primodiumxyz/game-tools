import { useMemo, useState } from "react";
import {
  Cheatcode,
  CheatcodeParam,
  CheatcodeSection,
  Cheatcodes,
} from "./types";

export const CheatcodesList = ({
  cheatcodes,
  className = "",
}: {
  cheatcodes: Cheatcodes;
  className?: string;
}) => {
  const [params, setParams] = useState<Record<string, Record<string, unknown>>>(
    {}
  );
  const [search, setSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const handleParamChange = (
    funcName: string,
    paramKey: string,
    value: unknown
  ) => {
    setParams((prevParams) => ({
      ...prevParams,
      [funcName]: {
        ...(prevParams[funcName] || {}),
        [paramKey]: value,
      },
    }));
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [sectionName]: !prevExpandedSections[sectionName],
    }));
  };

  const flatCheatcodes = useMemo(
    () =>
      Object.entries(cheatcodes).reduce(
        (acc, [sectionName, section]: [string, CheatcodeSection]) => {
          return {
            ...acc,
            ...section.content,
          };
        },
        {} as Record<string, Cheatcode>
      ),
    [cheatcodes]
  );

  const filteredCheatcodes = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(flatCheatcodes).filter(([funcName]) =>
          funcName
            .toLowerCase()
            .includes(search.toLowerCase().replace(/\s/g, ""))
        )
      ),
    [flatCheatcodes, search]
  );
  console.log(filteredCheatcodes);

  const executeFunction = (funcName: string) => {
    const func = flatCheatcodes[funcName].function;
    if (func) {
      const funcParams = params[funcName] || {};
      const args = Object.values(funcParams);
      func(...args);
    }
  };

  const getTypeInput = (type: CheatcodeParam["type"]) => {
    switch (type) {
      case "number":
        return "number";
      case "boolean":
        return "checkbox";
      default:
        return "text";
    }
  };
  function camelCaseToCapitalized(str: string): string {
    return (
      str
        // Insert a space before all caps
        .replace(/([A-Z])/g, " $1")
        // Replace first char with uppercase and trim spaces
        .replace(/^./, (match) => match.toUpperCase())
        .trim()
    );
  }

  return (
    <div
      className={`flex flex-col w-full h-full overflow-hidden pointer-events-auto ${className}`}
    >
      <div className="flex justify-around w-full">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="m-2 p-1 bg-slate-300 text-slate-800 rounded-sm"
        />
        <button onClick={() => setSearch("")}>X</button>
      </div>
      <div className="flex flex-col overflow-y-scroll scrollbar w-full h-full">
        {cheatcodes.map((section, sectionIndex) => (
          <div key={`section-${sectionIndex}`} className="p-1">
            <button
              className="w-full flex justify-between items-center p-1 mb-1 rounded-sm bg-white/10"
              onClick={() => toggleSection(section.title)}
            >
              <h2 className="text-lg text-white font-bold w-full">
                {section.title}
              </h2>
              <div className="grid place-items-center">
                <div
                  className={` 
                  ${
                    expandedSections[section.title] ? "rotate-180" : ""
                  } w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-secondary`}
                  style={{
                    transform: `rotate(${
                      expandedSections[section.title] ? "180deg" : "0deg"
                    })`,
                  }}
                ></div>
              </div>
            </button>

            {(search !== "" || !!expandedSections[section.title]) && (
              <div
                className="overflow-auto scrollbar grid grid-cols-2 gap-1 p-2 bg-black-800/50 text-gray-400 pointer-events-auto"
                style={{ background: "rgba(0,0,0,0.2)" }}
              >
                {Object.entries(section.content).map(([funcName], i) => {
                  if (!filteredCheatcodes[funcName]) return null;
                  return (
                    <div
                      key={`function-${funcName}-${i}`}
                      className="bg-slate-700 rounded-md flex flex-col p-2 justify-between gap-1"
                    >
                      <h1 className="text-white opacity-90 font-bold text-sm">
                        {camelCaseToCapitalized(funcName)}
                      </h1>{" "}
                      {flatCheatcodes[funcName].params.length > 0 && (
                        <div className="grid grid-cols-[max-content,1fr] gap-2">
                          {flatCheatcodes[funcName].params.map(
                            (param, index) => {
                              return (
                                <div
                                  key={`param-input-${param.name}-${index}`}
                                  className="flex gap-3 items-center"
                                >
                                  <div className="text-xs text-white opacity-80">
                                    {camelCaseToCapitalized(param.name)}
                                  </div>
                                  {param.type === "dropdown" ? (
                                    <select
                                      placeholder="Select an option"
                                      value={
                                        params
                                          ? params[funcName]?.[param.name] ?? ""
                                          : param.dropdownOptions[0]
                                      }
                                      onChange={(e) =>
                                        handleParamChange(
                                          funcName,
                                          param.name,
                                          e.target.value
                                        )
                                      }
                                      className="border rounded-sm p-1 w-full text-xs bg-slate-500"
                                    >
                                      {" "}
                                      <option value="" disabled hidden>
                                        Select an option
                                      </option>
                                      {param.dropdownOptions?.map(
                                        (option, optionIndex) => (
                                          <option
                                            key={`dropdown-option-${param.name}-${optionIndex}`}
                                            value={option}
                                          >
                                            {camelCaseToCapitalized(option)}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  ) : (
                                    <input
                                      type={getTypeInput(param.type)}
                                      placeholder={param.type}
                                      value={
                                        params
                                          ? params[funcName]?.[param.name] ?? ""
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleParamChange(
                                          funcName,
                                          param.name,
                                          e.target.type === "checkbox"
                                            ? e.target.checked
                                            : e.target.value
                                        )
                                      }
                                      className="border rounded-sm p-1 w-full text-xs text-black bg-slate-200"
                                    />
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                      <button
                        onClick={() => executeFunction(funcName)}
                        className="bg-slate-600 text-white py-1 rounded-sm focus:outline-none focus:ring focus:border-blue-100"
                      >
                        Run
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
