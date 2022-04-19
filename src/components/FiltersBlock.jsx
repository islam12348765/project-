import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FiltersBlock = ({ getProducts }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const filter = new URLSearchParams(location.search);

  const [searchValue, setSearchValue] = useState(filter.get("q") || "");
  const [colorValue, setColorValue] = useState(filter.get("color") || "");
  const [sizeValue, setSizeValue] = useState(filter.get("size") || "");

  const handleFilters = (key, value) => {
    filter.set(key, value);
    navigate(`${location.pathname}?${filter.toString()}`);
    setSearchValue(filter.get("q") || "");
    setColorValue(filter.get("color") || "");
    setSizeValue(filter.get("size") || "");
    getProducts();
  };

  const resetFilters = () => {
    setSearchValue("");
    setColorValue("");
    setSizeValue("");
    navigate("/");
    getProducts();
  };

  return (
    <div className="filters-block">
      <TextField
        variant="standard"
        value={searchValue}
        onChange={(e) => handleFilters("q", e.target.value)}
        type="search"
        label="Живой поиск..."
      />
      <FormControl variant="standard">
        <InputLabel id="color-label">Выберите цвет</InputLabel>
        <Select
          value={colorValue}
          onChange={(e) => handleFilters("color", e.target.value)}
          label="Выберите цвет"
          labelId="color-label"
        >
          <MenuItem value="black">Черный</MenuItem>
          <MenuItem value="white">Белый</MenuItem>
          <MenuItem value="blue">Синий</MenuItem>
          <MenuItem value="pink">розовый</MenuItem>
          <MenuItem value="yellow">Желтый</MenuItem>
          <MenuItem value="red">Красный</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard">
        <InputLabel id="color-label">Выберите размер</InputLabel>
        <Select
          value={sizeValue}
          onChange={(e) => handleFilters("size", e.target.value)}
          label="Выберите размер"
          labelId="size-select-label"
        >
          <MenuItem value="s">Small</MenuItem>
          <MenuItem value="m">Middle</MenuItem>
          <MenuItem value="l">Large</MenuItem>
          <MenuItem value="xl">Extra Large</MenuItem>
          <MenuItem value="xxl">XX Large</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" color="secondary" onClick={resetFilters}>
        Сбросить
      </Button>
    </div>
  );
};

export default FiltersBlock;
