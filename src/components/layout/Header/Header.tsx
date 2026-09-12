import { useState } from "react";

import Button from "@/ui/Button/Button.tsx";
import { useCart, CartBtn } from "@/features/cart";
import { useAuth } from "@/features/auth/context/AuthContext";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import { styles } from "./Header.styles";
import Input from "@/ui/Input/Input";

export default function Header() {
  const { itemsCount } = useCart();
  const { isAuthenticated, logoutUser } = useAuth();

  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);

  const closeAndLogoutDialog = () => {
    closeDialog();
    logoutUser();
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Typography component={Link} variant="h2" to="/" sx={styles.logo}>
          SfP
        </Typography>

        <Box sx={styles.leftContainer}>
          <Box sx={styles.linksContainer}>
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button size="sm" variant="primary">
                    Login
                  </Button>
                </Link>

                <Link to="/registration">
                  <Button size="sm" variant="secondary">
                    Registration
                  </Button>
                </Link>
              </>
            ) : (
              <Button size="sm" variant="tertiary">
                Logout
              </Button>
            )}
          </Box>

          <Box
            component="form"
            sx={styles.searchForm}
            onSubmit={handleSearchSubmit}
          >
            <Input
              type="text"
              inputSize="md"
              placeholder="Search"
              maxLength={100}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <IconButton component={Link} to="/cart" sx={styles.cartButton}>
            <CartBtn count={itemsCount} />
          </IconButton>
        </Box>
      </Toolbar>

      <ConfirmDialog
        question="Ви впевнені, що хочете вийти?"
        isDialogOpen={isDialogOpen}
        onCancel={closeDialog}
        onConfirm={closeAndLogoutDialog}
      />
    </AppBar>
  );
}
