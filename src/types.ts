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

export type Cheatcodes = Record<string, Cheatcode>;

export type Cheatcode = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (...args: any[]) => any;
  params: {
    name: string;
    type: "number" | "string" | "boolean" | "dropdown";
  }[];
};
