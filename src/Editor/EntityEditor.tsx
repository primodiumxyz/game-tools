import {
  AnyComponent,
  Entity,
  Layers,
  Schema,
  World,
  getEntityComponents,
} from "@latticexyz/recs";
import { useEffect, useState } from "react";
import {
  Collapse,
  ComponentBrowserButton,
  EntityEditorContainer,
} from "../StyledComponents";
import { SetContractComponentFunction } from "../types";
import { ComponentEditor } from "./ComponentEditor";

export const EntityEditor = ({
  entityId,
  layers,
  setContractComponentValue,
  world,
}: {
  entityId: Entity;
  layers: Layers;
  setContractComponentValue?: SetContractComponentFunction<Schema>;
  world: World;
}) => {
  const [opened, setOpened] = useState(false);

  const [entityComponents, setEntityComponents] = useState<AnyComponent[]>([]);
  useEffect(() => {
    if (opened) {
      const components = getEntityComponents(world, entityId);
      setEntityComponents(components);
    }
  }, [opened, world, entityId, setEntityComponents]);

  return (
    <EntityEditorContainer>
      <div onClick={() => setOpened(!opened)} style={{ cursor: "pointer" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ color: "white" }}>Entity {entityId}</h3>
          <ComponentBrowserButton
            onClick={(e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              navigator.clipboard.writeText(entityId);
            }}
          >
            Click to copy Entity ID
          </ComponentBrowserButton>
        </div>
        <ComponentBrowserButton onClick={() => setOpened(!opened)}>
          {opened ? <>&#9660;</> : <>&#9654;</>}
        </ComponentBrowserButton>
      </div>
      <Collapse aria-hidden={opened ? "false" : "true"} opened={String(opened)}>
        {[...entityComponents.values()].map((c) => (
          <ComponentEditor
            key={`component-editor-${entityId}-${c.id}`}
            entity={entityId}
            component={c}
            layers={layers}
            setContractComponentValue={setContractComponentValue}
          />
        ))}
      </Collapse>
    </EntityEditorContainer>
  );
};
