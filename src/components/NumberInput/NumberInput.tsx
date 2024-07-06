import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon style={{ fontSize: "0.8rem" }} />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon style={{ fontSize: "0.8rem" }} />,
        },
      }}
      {...props}
      ref={ref}
      defaultValue={0}
      min={0}
      max={10}
    />
  );
});
export default NumberInput;


const StyledInputRoot = styled("div")(
  ({  }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: #000;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({  }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: #000;
  background: #fff;
  border: none;
  border-radius: 8px;
  margin: 0 8px;
  padding:0;
  outline: 0;
  min-width: 0;
  width: 1rem;
  text-align: center;


  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({  }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 50%;
  border-color: #d8d8d8;
  background:#d8d8d8;
  color: #9d9d9d;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  padding:0;

  &:hover {
    cursor: pointer;
    background: #e60000;
    border-color: #e60000;
    color: #fff;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }

`
);
