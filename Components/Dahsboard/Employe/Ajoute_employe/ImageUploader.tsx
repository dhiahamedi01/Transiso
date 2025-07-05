"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  IconButton,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

interface ImageUploaderProps {
  /**
   * Optionally set an initial image URL (e.g. when editing an existing profile)
   */
  initial?: string;
  /**
   * Receive the selected File (or `null` when the user clears)
   */
  onFileSelect?: (file: File | null) => void;
  /**
   * Override style for the root container if needed
   */
  sx?: SxProps<Theme>;
}

const MAX_SIZE_MB = 5;

/**
 * An accessible, MUI‑styled image upload component that visually matches
 * the screenshot you provided. It shows a 96 × 96 px preview with a delete
 * button, a purple "Change Image" file trigger, and helper text under the button.
 */
export default function ImageUploader({
  initial,
  onFileSelect,
  sx,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initial ?? null);

  /* -- Handlers ---------------------------------------------------------- */
  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation — size & type
    if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
      alert(`Le fichier dépasse ${MAX_SIZE_MB} Mo.`);
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Seuls les formats JPG ou PNG sont autorisés.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onFileSelect?.(file);
  };

  const clearImage = () => {
    setPreview(null);
    onFileSelect?.(null);
  };

  /* -- Clean up object URLs --------------------------------------------- */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* -- Render ----------------------------------------------------------- */
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", ...sx }}>
      {/* Thumbnail ------------------------------------------------------ */}
      <Box
        sx={{
          position: "relative",
          width: 96,
          height: 96,
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: preview ? "transparent" : "grey.50",
          border: "1px dashed",
          borderColor: "grey.300",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {preview ? (
          <>
            {/* Image preview fills the square */}
            <Image src={preview} alt="Preview" fill sizes="96px" style={{ objectFit: "cover" }} />
            {/* Trash icon overlay */}
            <IconButton
              size="small"
              onClick={clearImage}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                bgcolor: "common.white",
                "&:hover": { bgcolor: "common.white" },
              }}
            >
              <DeleteOutlineIcon fontSize="small" color="error" />
            </IconButton>
          </>
        ) : (
          <PhotoCameraIcon color="disabled" fontSize="large" />
        )}
      </Box>

      {/* Controls ------------------------------------------------------- */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          onClick={openFileDialog}
          startIcon={<PhotoCameraIcon />}
          sx={{
            bgcolor: "#560BAD", // custom purple to match screenshot
            textTransform: "none",
            fontWeight: 600,
            zoom:0.8,
            alignSelf: "flex-start",
            "&:hover": {
              bgcolor: "#3f0896",
            },
          }}
        >
          Import Image
        </Button>

        <Typography variant="caption" sx={{ mt: 1 }}>
          JPG or PNG format, not exceeding 5MB.
        </Typography>
      </Box>

      {/* Hidden native file input -------------------------------------- */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        hidden
        onChange={handleFileChange}
      />
    </Box>
  );
}
