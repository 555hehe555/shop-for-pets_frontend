import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import type { FilterState } from "../../api";
import { check } from "zod";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useState } from "react";

const SPECIES_OPTIONS = [
  "Dogs",
  "Cats",
  "Birds",
  "Fish",
  "Small Pets",
  "Reptiles",
];

const CATEGORIES_OPTIONS = [
  "Food",
  "Toys",
  "Accessories",
  "Health & Wellness",
  "Grooming",
  "Beds & Furniture",
];

const BRANDS_OPTIONS = [
  "Royal Canin",
  "Purina",
  "Whiskas",
  "Pedigree",
  "Trixie",
  "Acana",
];

interface ProductFiltersType {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

interface FilterGroupType {
  title: string;
  options: string[];
  filterKey: keyof FilterState;
  handleToggle: (
    category: keyof FilterState,
    checked: boolean,
    value: string,
  ) => void;
  filters: FilterState;
}

function FilterGroup({
  title,
  options,
  filterKey,
  handleToggle,
  filters,
}: FilterGroupType) {
  const [open, setOpen] = useState(true);

  return (
    <Box>
      <Box onClick={() => setOpen(!open)}>
        <Typography variant="subtitle1">{title}</Typography>
        <IconButton>{open ? <SlArrowUp /> : <SlArrowDown />}</IconButton>
      </Box>

      <Collapse in={open}>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters[filterKey].includes(option)}
                  onChange={(e) =>
                    handleToggle(filterKey, e.target.checked, option)
                  }
                  color="primary"
                  size="small"
                />
              }
              key={option}
              label={option}
            />
          ))}
        </FormGroup>
      </Collapse>
    </Box>
  );
}

export function ProductFilters({ filters, onChange }: ProductFiltersType) {
  function handleToggle(
    category: keyof FilterState,
    checked: boolean,
    value: string,
  ) {
    const currentList = filters[category];

    const newList = checked
      ? [...currentList, value]
      : currentList.filter((item) => item !== value);

    onChange({ ...filters, [category]: newList });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Фільти
      </Typography>
      <FilterGroup
        title="Бренди"
        options={BRANDS_OPTIONS}
        filterKey="brands"
        handleToggle={handleToggle}
        filters={filters}
      />
      <Divider />
      <FilterGroup
        title="Категорії"
        options={CATEGORIES_OPTIONS}
        filterKey="categories"
        handleToggle={handleToggle}
        filters={filters}
      />
      <Divider />{" "}
      <FilterGroup
        title="Види"
        options={SPECIES_OPTIONS}
        filterKey="species"
        handleToggle={handleToggle}
        filters={filters}
      />
      <Divider />
    </Box>
  );
}
