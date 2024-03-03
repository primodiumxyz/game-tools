import { useState } from "react";
import { Cheatcodes } from "./types";

export const CheatcodesList = ({ cheatcodes }: { cheatcodes: Cheatcodes }) => {
  const [params, setParams] = useState<Record<string, Record<string, unknown>>>(
    {}
  );

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
      className="overflow-auto px-4 py-2 bg-black-800/50 text-gray-400 h-full pointer-events-auto"
      style={{ background: "rgba(0,0,0,0.2)" }}
    >
      {Object.entries(cheatcodes).map(([funcName], i) => {
        return (
          <div
            key={`function-${funcName}-${i}`}
            className="py-2 border-b border-gray-400 flex flex-col gap-2"
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
                    <div className="text-white opacity-80">
                      {camelCaseToCapitalized(param.name)}
                    </div>
                    <input
                      type={getTypeInput(param.type)}
                      placeholder={param.name}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      value={params[funcName]?.[param.name] ?? ""}
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
  );
};
