import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CatSprite from "./CatSprite";
import { addCharacter, setActive } from "../redux/character/actions";
import {
  Autocomplete,
  Button,
  NativeSelect,
  TextField,
  styled,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";

// Styling for MaterialUI Components
const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

function PreviewArea({ character, add_character, set_active }) {
  const classes = useStyles();
  const [active, setActive] = useState(character.active);
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let elmnt = null;

  function dragMouseDown(e, id) {
    elmnt = document.getElementById(id);

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // handle changing active character
  const handleChange = (e) => {
    setActive(e.target.value);
    set_active(e.target.value);
  };

  return (
    <div className="w-full flex-none h-full p-3" id="preview_area">
      <div className="flex justify-between flex-col mb-10">
        <div className="font-bold text-center rounded text-dark p-2 w-auto">
          Preview Area
        </div>
        <div className="flex justify-around items-end">
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="demo-customized-select-native">
              Active
            </InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              defaultValue={active}
              inputProps={{
                name: "name",
                id: "uncontrolled-native",
              }}
              value={active}
              onChange={(e) => handleChange(e)}
              input={<BootstrapInput />}
            >
              {character.characters.map((x, i) => {
                const first = x.id.charAt(0).toUpperCase();
                const name = first + x.id.substr(1);
                return (
                  <option key={i} value={x.id}>
                    {name}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={() => add_character()}
          >
            Create
          </Button>
        </div>
      </div>
      <div className="flex justify-around h-full">
        {character.characters.map((x, i) => {
          return (
            <div
              id={`${x.id}-${i}`}
              key={i}
              className={`absolute`}
              onMouseDown={(e) => dragMouseDown(e, `${x.id}-${i}`)}
            >
              <div id={`${x.id}-div`} className="character">
                <div
                  className="hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap"
                  id={x.id + "-message-box"}
                ></div>
                <div
                  className="hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap"
                  id={x.id + "-message-box1"}
                ></div>
                <CatSprite charac_id={x.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

// mapping functions to components
const mapDispatchToProps = (dispatch) => {
  return {
    add_character: () => dispatch(addCharacter()),
    set_active: (ch_id) => dispatch(setActive(ch_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewArea);
