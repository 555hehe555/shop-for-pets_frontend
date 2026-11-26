import {
  Box,
  ButtonBase,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
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
import Button from "@/ui/Button/Button";

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
  const contentId = useId();

  const [showAll, setShowAll] = useState(false);

  if (!options || options?.length === 0) {
    return null;
  }

  const resolvedOptions = showAll ? options : options.slice(0, 5);

  return (
    <Box sx={styles.group}>
      <ButtonBase
        sx={styles.groupHeader}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={contentId}
        aria-label={open ? `Згорнути ${title}` : `Розгорнути ${title}`}
      >
        <Typography variant="subtitle1" sx={styles.groupTitle}>
          {title}
        </Typography>

        <Box
          component="span"
          className="filter-toggle"
          sx={styles.toggleButton}
          aria-hidden="true"
        >
          {open ? <CaretUp size={18} /> : <CaretDown size={18} />}
        </Box>
      </ButtonBase>

      <Collapse in={open} id={contentId}>
        <FormGroup sx={styles.options}>
          {resolvedOptions.map((option) => (
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
          <Button
            variant="text"
            size="sm"
            sx={{ color: "orange" }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Показати менше" : "Показати все"}
          </Button>
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
  const contentId = useId();

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
        sx={styles.panelHeader}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={contentId}
      >
        <Typography variant="h5" sx={styles.title}>
          Фільтри
        </Typography>

        <Box
          component="span"
          className="filter-toggle"
          sx={styles.toggleButton}
          aria-hidden="true"
        >
          {open ? <CaretUp size={18} /> : <CaretDown size={18} />}
        </Box>
      </ButtonBase>
      <Collapse in={open} orientation="vertical" id={contentId}>
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
