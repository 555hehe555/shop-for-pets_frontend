import { useAuth } from "@/features/auth/context/AuthContext";
import { useToggleFavourite } from "@/queries/favourite/useFavouriteMutations";
import { useFavouriteItems } from "@/queries/favourite/useFavouriteQueries";
import { IconButton } from "@mui/material";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

export function FavouriteButton({ productId }: { productId: number }) {
  const { isAuthenticated } = useAuth();

  const { data: favourites = [] } = useFavouriteItems(isAuthenticated);
  const isFavourite = favourites.some((item) => item.product === productId);

  const { mutate: toggleFavourite } = useToggleFavourite(isFavourite);

  const handleClick = () => {
    toggleFavourite(productId);
  };

  return (
    <IconButton
      onClick={handleClick}

      sx={{
        color: isFavourite ? "accent.main" : "text.secondary",
        "&:hover": {
          color: isFavourite ? "accent.dark" : "text.primary",
        },
      }}
    >
      {isFavourite ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
    </IconButton>
  );
}
