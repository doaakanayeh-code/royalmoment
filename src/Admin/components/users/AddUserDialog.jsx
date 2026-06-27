import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { addUser } from "../../services/usersService";

export default function AddUserDialog({
  open,
  onClose,
  reloadUsers,
  reloadStatistics,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    identifier: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setForm({
      username: "",
      identifier: "",
      password: "",
      password_confirmation: "",
      role: "user",
    });

    setFrontImage(null);
    setBackImage(null);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    let temp = {};

    if (!form.username.trim()) {
      temp.username = "Username is required";
    } else if (form.username.length < 2) {
      temp.username = "Username must be at least 2 characters";
    }

    if (!form.identifier.trim()) {
      temp.identifier = "Phone number is required";
    }

    if (!form.password) {
      temp.password = "Password is required";
    } else if (form.password.length < 8) {
      temp.password = "Password must be at least 8 characters";
    }

    if (form.password_confirmation !== form.password) {
      temp.password_confirmation = "Passwords do not match";
    }

    if (!frontImage) {
      temp.frontImage = "Front ID image is required";
    }

    if (!backImage) {
      temp.backImage = "Back ID image is required";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("username", form.username);
      formData.append("identifier", form.identifier);
      formData.append("password", form.password);
      formData.append("password_confirmation", form.password_confirmation);
      formData.append("role", form.role);

      formData.append("id_img_front", frontImage);
      formData.append("id_img_back", backImage);

      await addUser(formData);

      await reloadUsers();
      await reloadStatistics();

      handleClose();
    } catch (err) {
      console.log(err);

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert("Failed to add user.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>Add User</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            error={!!errors.identifier}
            helperText={errors.identifier}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation}
          />

          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value="user">User</MenuItem>
          </TextField>

          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadOutlinedIcon />}
          >
            Upload Front ID
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setFrontImage(e.target.files[0])}
            />
          </Button>

          {frontImage && (
            <Typography variant="body2" color="success.main">
              Selected: {frontImage.name}
            </Typography>
          )}

          {errors.frontImage && (
            <Alert severity="error">{errors.frontImage}</Alert>
          )}

          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadOutlinedIcon />}
          >
            Upload Back ID
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setBackImage(e.target.files[0])}
            />
          </Button>

          {backImage && (
            <Typography variant="body2" color="success.main">
              Selected: {backImage.name}
            </Typography>
          )}

          {errors.backImage && (
            <Alert severity="error">{errors.backImage}</Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button color="inherit" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Add User"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
