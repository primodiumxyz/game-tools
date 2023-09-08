import { Entity, Layers, Schema, World } from "@latticexyz/recs";
import { useMemo, useState } from "react";
import { EntityEditor } from "./Editor/EntityEditor";
import { QueryBuilder } from "./Editor/QueryBuilder";
import { BrowserContainer, SmallHeadline } from "./StyledComponents";
import { SetContractComponentFunction } from "./types";

/**
 * An Entity Browser for viewing/editiing Component values.
 */
export const Editor = ({
  layers,
  setContractComponentValue,
  world,
}: {
  layers: Layers;
  setContractComponentValue?: SetContractComponentFunction<Schema>;
  world: World;
}) => {
  const [filteredEntities, setFilteredEntities] = useState<Entity[]>([]);
  const [overflow, setOverflow] = useState(0);

  const entities = useMemo(() => {
    return [...world.getEntities()];
  }, [world]);

  return (
    <BrowserContainer>
      <QueryBuilder
        allEntities={[...entities]}
        setFilteredEntities={setFilteredEntities}
        layers={layers}
        world={world}
        setOverflow={setOverflow}
      />
      <SmallHeadline>
        Showing {filteredEntities.length} of{" "}
        {filteredEntities.length + overflow} entities
      </SmallHeadline>
      {filteredEntities.map((entity) => (
        <EntityEditor
          world={world}
          key={`entity-editor-${entity}`}
          entityId={entity}
          layers={layers}
          setContractComponentValue={setContractComponentValue}
        />
      ))}
    </BrowserContainer>
  );
};
