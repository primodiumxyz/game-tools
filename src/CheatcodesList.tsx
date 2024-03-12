import { useMemo, useState } from "react";
import { Cheatcodes } from "./types";

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
  const filteredCheatcodes = useMemo(
    () =>
      Object.entries(cheatcodes).filter(([funcName]) =>
        funcName.toLowerCase().includes(search.toLowerCase().replace(/\s/g, ""))
      ),
    [cheatcodes, search]
  );

  const executeFunction = (funcName: string) => {
    const func = cheatcodes[funcName].function;
    if (func) {
      const funcParams = params[funcName] || {};
      const args = Object.values(funcParams);
      func(...args);
    }
  };

  const getTypeInput = (type: string) => {
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
      className={`w-full flex flex-col overflow-scroll pointer-events-auto ${className}`}
    >
      <input
        type="text"
        placeholder="Search cheat codes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="m-2 p-1"
      />
      <div
        className="overflow-auto scrollbar grid grid-cols-2 gap-1 p-2 bg-black-800/50 text-gray-400 h-full pointer-events-auto"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        {filteredCheatcodes.map(([funcName], i) => {
          return (
            <div
              key={`function-${funcName}-${i}`}
              className="bg-slate-700 rounded-md flex flex-col p-2 justify-between gap-1"
            >
              <h1 className="text-white opacity-90 font-bold text-sm">
                {camelCaseToCapitalized(funcName)}
              </h1>{" "}
              {cheatcodes[funcName].params.length > 0 && (
                <div className="grid grid-cols-[max-content,1fr] gap-2">
                  {(cheatcodes[funcName].params || []).map((param, index) => (
                    <div
                      key={`param-input-${param.name}-${index}`}
                      className="flex gap-3 items-center"
                    >
                      <div className="text-xs text-white opacity-80">
                        {camelCaseToCapitalized(param.name)}
                      </div>
                      <input
                        type={getTypeInput(param.type)}
                        placeholder={param.name}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        value={params[funcName]?.[param.name] ?? ""}
                        onChange={(e) => {
                          handleParamChange(
                            funcName,
                            param.name,
                            e.target.type === "checkbox"
                              ? e.target.checked
                              : e.target.value
                          );
                        }}
                        className="border rounded-sm p-1 w-full text-xs text-black bg-slate-200"
                      />
                    </div>
                  ))}
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
    </div>
  );
};
