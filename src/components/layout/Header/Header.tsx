import { useState } from "react";

import Button from "@/ui/Button/Button.tsx";
import { useCart, CartBtn } from "@/features/cart";
import { useAuth } from "@/features/auth/context/AuthContext";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import { styles } from "./Header.styles";
import Input from "@/ui/Input/Input";
import { User } from "@phosphor-icons/react";

export default function Header() {
  const { itemsCount } = useCart();
  const { isAuthenticated } = useAuth();

  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);

  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchQuery(urlSearch);
  }

  const navigate = useNavigate();

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
            {!isAuthenticated && (
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

          {isAuthenticated && (
            <IconButton
              component={Link}
              to="/profile"
              sx={styles.profileButton}
            >
              <User color="white" size={20} />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
