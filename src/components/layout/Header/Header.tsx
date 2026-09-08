import { useState } from "react";

import Button from "@/ui/Button/Button.tsx";
import Modal from "@/ui/Modal/Modal.tsx";
import { RegistrationForm, LoginForm } from "@/features/auth";
import { useCart, CartBtn } from "@/features/cart";
import { useAuth } from "@/features/auth/context/AuthContext";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import { styles } from "./Header.styles";

export default function Header() {
  const { itemsCount } = useCart();
  const { isAuthenticated, logoutUser } = useAuth();

  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const closeAndLogoutDialog = () => {
    closeDialog();
    logoutUser();
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLDivElement>) => {
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
                <Button size="sm" variant="tertiary" onClick={openLoginModal}>
                  Login
                </Button>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={openRegistrationModal}
                >
                  Registration
                </Button>
              </>
            ) : (
              <Button size="sm" variant="tertiary" onClick={openDialog}>
                Logout
              </Button>
            )}
          </Box>

          <Box
            component="form"
            sx={styles.searchForm}
            onSubmit={handleSearchSubmit}
          >
            <TextField
              type="text"
              size="small"
              variant="outlined"
              placeholder="Search"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <IconButton component={Link} to="/cart" sx={styles.cartButton}>
            <CartBtn count={itemsCount} />
          </IconButton>
        </Box>
      </Toolbar>

      <Modal isOpen={isLoginOpen} onClose={closeLoginModal}>
        <LoginForm onLoginSuccessful={closeLoginModal} />
      </Modal>

      <Modal isOpen={isRegistrationOpen} onClose={closeRegistrationModal}>
        <RegistrationForm onRegistrationSuccessful={closeRegistrationModal} />
      </Modal>

      <ConfirmDialog
        question="Ви впевнені, що хочете вийти?"
        isDialogOpen={isDialogOpen}
        onCancel={closeDialog}
        onConfirm={closeAndLogoutDialog}
      />
    </AppBar>
  );
}
