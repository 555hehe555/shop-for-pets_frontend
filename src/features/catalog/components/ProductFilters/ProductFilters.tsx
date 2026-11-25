import {
  Box,
  ButtonBase,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import type { FilterState } from "../../api";
import { CaretUp, CaretDown } from "@phosphor-icons/react";
import { useEffect, useId, useState } from "react";
import { styles } from "./ProductFilters.styles";
import type { Brand, Category, Species } from "@/types/api";
import {
  fetchBrands,
  fetchCategories,
  fetchSpecies,
} from "../../api/catalogApi";

// const SPECIES_OPTIONS = [
//   "Dogs",
//   "Cats",
//   "Birds",
//   "Fish",
//   "Small Pets",
//   "Reptiles",
// ];

// const CATEGORIES_OPTIONS = [
//   "Food",
//   "Toys",
//   "Accessories",
//   "Health & Wellness",
//   "Grooming",
//   "Beds & Furniture",
// ];

// const BRANDS_OPTIONS = [
//   "Royal Canin",
//   "Purina",
//   "Whiskas",
//   "Pedigree",
//   "Trixie",
//   "Acana",
// ];

interface ProductFiltersType {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

interface FilterGroupType {
  title: string;
  options: Brand[] | Category[] | Species[] | null;
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
    <Box sx={styles.group}>
      <Box sx={styles.groupHeader} onClick={() => setOpen((prev) => !prev)}>
        <Typography variant="subtitle1" sx={styles.groupTitle}>
          {title}
        </Typography>

        <IconButton
          size="small"
          sx={styles.toggleButton}
          aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
        >
          {open ? <CaretUp size={16} /> : <CaretDown size={16} />}
        </IconButton>
      </Box>

      <Collapse in={open}>
        <FormGroup sx={styles.options}>
          {options?.length &&
            options.map((option) => (
              <FormControlLabel
                key={option.id}
                sx={styles.option}
                control={
                  <Checkbox
                    sx={styles.checkbox}
                    checked={filters[filterKey].includes(option.name)}
                    onChange={(e) =>
                      handleToggle(filterKey, e.target.checked, option.name)
                    }
                    color="primary"
                    size="small"
                  />
                }
                label={option.name}
              />
            ))}
        </FormGroup>
      </Collapse>
    </Box>
  );
}

export function ProductFilters({ filters, onChange }: ProductFiltersType) {
  const [open, setOpen] = useState(true);
  const [brand, setBrand] = useState<Brand[] | null>(null);
  const [species, setSpecies] = useState<Species[] | null>(null);
  const [category, setCategory] = useState<Category[] | null>(null);

  useEffect(() => {
    async function getFilters() {
      const brand = await fetchBrands();
      const species = await fetchSpecies();
      const category = await fetchCategories();

      setBrand(brand);
      setSpecies(species);
      setCategory(category);
    }

    getFilters();
  }, []);

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
    <Box sx={styles.container}>
      <ButtonBase
        sx={styles.groupHeader}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={useId()}
      >
        <Typography variant="h5" sx={styles.title}>
          Фільтри
        </Typography>

        <Box
          component="span"
          sx={styles.toggleButtonContainer}
          aria-hidden="true"
        >
          {open ? <CaretUp size={16} /> : <CaretDown size={16} />}
        </Box>
      </ButtonBase>
      <Collapse in={open} orientation="vertical">
        <FilterGroup
          title="Бренди"
          options={brand}
          filterKey="brands"
          handleToggle={handleToggle}
          filters={filters}
        />

        <Divider sx={styles.divider} />

        <FilterGroup
          title="Категорії"
          options={category}
          filterKey="categories"
          handleToggle={handleToggle}
          filters={filters}
        />

        <Divider sx={styles.divider} />

        <FilterGroup
          title="Види"
          options={species}
          filterKey="species"
          handleToggle={handleToggle}
          filters={filters}
        />
      </Collapse>
    </Box>
  );
}
