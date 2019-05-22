import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const InputField = ({ name, label, value, onChange, type }) => {
  return (
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        autoFocus
      />
    </FormControl>
  );
};

export default InputField;
