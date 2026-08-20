import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

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

export function ProductFilters() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Фільти
      </Typography>

      <Box>
        <Typography variant="subtitle1">Бренди</Typography>

        <FormGroup>
          {BRANDS_OPTIONS.map((option) => (
            <FormControlLabel
              control={<Checkbox color="primary" size="small" />}
              key={option}
              label={option}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}
