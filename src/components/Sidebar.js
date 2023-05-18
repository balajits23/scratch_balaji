import React, { useState } from "react";
import { fetchComponent } from "./fetchComponent";
import { looksComponents, motionComponents } from "../SidebarConstants";
import { Chip } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Sidebar() {
  const [activeChip, setActiveChip] = useState("motion");
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="flex flex-wrap">
        <div className="m-1">
          <Chip
            label="Motion"
            variant={activeChip === "motion" ? "contained" : "outlined"}
            color="primary"
            onClick={() => {
              setActiveChip("motion");
            }}
          />
        </div>
        <div className="m-1">
          <Chip
            label="Looks"
            color="secondary"
            variant={activeChip === "looks" ? "contained" : "outlined"}
            onClick={() => {
              setActiveChip("looks");
            }}
          />
        </div>
        {/* <Chip label="Clickable" variant="outlined" className="m-1" />
        <Chip label="Clickable" variant="outlined" className="m-1" /> */}
      </div>
      {activeChip === "motion" ? (
        <>
          <div className="font-bold"> {"Motion"} </div>
          <Droppable droppableId="sideArea-motion" type="COMPONENTS">
            {(provided) => (
              <ul
                className="sideArea-motion my-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {motionComponents.map((x, i) => {
                  return (
                    <Draggable
                      key={`${x}-sideArea`}
                      draggableId={`${x}-sideArea`}
                      index={i}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="my-2"
                        >
                          {fetchComponent(x)}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </>
      ) : (
        <>
          <div className="font-bold"> {"Looks"} </div>
          <Droppable droppableId="sideArea-looks" type="COMPONENTS">
            {(provided) => (
              <ul
                className="sideArea-looks my-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {looksComponents.map((x, i) => {
                  return (
                    <Draggable
                      key={`${x}-sideArea`}
                      draggableId={`${x}-sideArea`}
                      index={i}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="my-2"
                        >
                          {fetchComponent(x)}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </>
      )}
    </div>
  );
}
