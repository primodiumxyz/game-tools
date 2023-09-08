import { useComponentValue } from "@latticexyz/react";
import { Layers, removeComponent } from "@latticexyz/recs";
import { AnyComponent, Entity, Schema } from "@latticexyz/recs/src/types";
import {
  ComponentBrowserButton,
  ComponentEditorContainer,
  ComponentTitle,
} from "../StyledComponents";
import { SetContractComponentFunction, hasContract } from "../types";
import { ComponentValueEditor } from "./ComponentValueEditor";

export const ComponentEditor = ({
  entity,
  component,
  layers,
  setContractComponentValue,
}: {
  entity: Entity;
  component: AnyComponent;
  layers: Layers;
  setContractComponentValue?: SetContractComponentFunction<Schema>;
}) => {
  const value = useComponentValue(component, entity);
  if (!value) return null;

  return (
    <ComponentEditorContainer>
      <ComponentTitle>
        {(component.metadata?.componentName as string) ?? component.id}
        <ComponentBrowserButton
          onClick={() => {
            removeComponent(component, entity);

            if (setContractComponentValue && hasContract(component))
              setContractComponentValue(component, entity, {});
          }}
        >
          Remove
        </ComponentBrowserButton>
      </ComponentTitle>
      <ComponentValueEditor
        entity={entity}
        component={component}
        componentValue={value}
        layers={layers}
        setContractComponentValue={setContractComponentValue}
      />
    </ComponentEditorContainer>
  );
};
