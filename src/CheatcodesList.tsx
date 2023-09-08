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

  return (
    <div className="overflow-auto p-6 bg-slate-800 text-gray-400 h-full pointer-events-auto">
      {Object.entries(cheatcodes).map(([funcName], i) => {
        return (
          <div
            key={`function-${funcName}-${i}`}
            className="py-2 border-b border-gray-400 flex flex-col gap-2"
          >
            <h1 className="font-bold text-white/40 uppercase text-xs">
              {funcName}
            </h1>{" "}
            <div className="grid grid-cols-[max-content,1fr] gap-x-4 gap-y-2">
              {(cheatcodes[funcName].params || []).map((param, index) => (
                <div
                  key={`param-input-${param.name}-${index}`}
                  className="flex gap-3"
                >
                  <div className="text-amber-200/80">{param.name}</div>
                  <div className="text-sm">
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
                      className="border rounded-sm p-1 text-xs focus:outline-none focus:ring bg-gray-100 focus:border-blue-300 text-gray-800"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => executeFunction(funcName)}
              className="border-blue-300 bg-blue-500 text-white py-1 rounded-sm focus:outline-none focus:ring focus:border-blue-100"
            >
              Submit
            </button>
          </div>
        );
      })}
    </div>
  );
};
