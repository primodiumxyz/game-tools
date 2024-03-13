import {
  AnyComponent,
  Component,
  ComponentValue,
  Entity,
  Schema,
} from "@latticexyz/recs";

export type SetContractComponentFunction<S extends Schema> = (
  component: ContractComponent<S>,
  entity: Entity,
  newValue: ComponentValue<S>
) => void;

export type ContractComponent<S extends Schema> = Component<
  S,
  {
    componentName: string;
    tableName: `${string}:${string}`;
    keySchema: Record<string, string>;
    valueSchema: Record<string, string>;
  }
>;

export function hasContract(
  component: AnyComponent
): component is ContractComponent<Schema> {
  return component.metadata?.tableName !== undefined;
}

export type Cheatcodes = CheatcodeSection[];

export type CheatcodeSection = {
  title: string;
  content: Record<string, Cheatcode>;
};

export type ParamType = "number" | "string" | "boolean" | "dropdown";

type ParamBase = {
  name: string;
};

type NumberParam = ParamBase & {
  type: "number";
};

type StringParam = ParamBase & {
  type: "string";
};

type BooleanParam = ParamBase & {
  type: "boolean";
};

type DropdownParam = ParamBase & {
  type: "dropdown";
  dropdownOptions: string[];
};

export type CheatcodeParam =
  | NumberParam
  | StringParam
  | BooleanParam
  | DropdownParam;

export type Cheatcode = {
  function: (...args: any[]) => any;
  params: CheatcodeParam[];
};
