import { useAuth } from "@/features/auth/context/AuthContext";
import { useToggleFavourite } from "@/queries/favourite/useFavouriteMutations";
import { useFavouriteItems } from "@/queries/favourite/useFavouriteQueries";
import { IconButton } from "@mui/material";
import { Heart } from "@phosphor-icons/react";

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
      <Heart size={26} weight={isFavourite ? "fill" : "regular"} />
    </IconButton>
  );
}
