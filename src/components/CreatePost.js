import {
  Button,
  Grid,
  Paper,
  TextField,
  Chip,
  Stack,
  InputAdornment,
  Autocomplete,
  Box,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import TagIcon from "@mui/icons-material/Tag";
import React, { useState } from "react";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAdventurePost } from "../actions/adventurePosts";
import { createFeedPost, updateFeedPost } from "../actions/feedPost";
import FileBase from "react-file-base64";
import { updateAdventurePost } from "../actions/adventurePosts";
import ConfirmationDialog from "./ConfirmationDialog";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const CreatePost = ({ postName, postLabel, type, formData, setFormData }) => {
  const googleMapsAPIKey = useSelector(
    (state) => state.apiKeysReducer?.googleMapsAPIKey
  );
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tagText, setTagText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteTag = (tagName) => (e) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagName),
    });
  };

  const confirmSubmit = (e) => {
    if (formData.details.length < 150) {
      return;
    }
    e.preventDefault();

    if (type === "feedPost") {
      if (formData?._id) dispatch(updateFeedPost(formData, navigate));
      else dispatch(createFeedPost(formData, navigate));
    } else {
      if (formData?._id) {
        dispatch(updateAdventurePost(formData, navigate));
      } else dispatch(createAdventurePost(formData, navigate));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDialogOpen(true);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );
  if (googleMapsAPIKey) {
    if (typeof window !== "undefined" && !loaded.current) {
      if (!document.querySelector("#google-maps")) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&libraries=places`,
          document.querySelector("head"),
          "google-maps"
        );
      }

      loaded.current = true;
    }
  }

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);
  return (
    <>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        confirmSubmit={confirmSubmit}
      />
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            alignItems: "start",
            justifyContent: "space-around",
          }}
        >
          <Grid container spacing={3}>
            <Input
              name={"title"}
              handleChange={handleInputChange}
              label={postLabel}
              type="text"
              autoComplete="off"
              half
              value={formData?.title}
            />

            <Grid item xs={12} sm={6}>
              <TextField
                name="tags"
                label="Tags"
                fullWidth
                variant="outlined"
                type="text"
                value={tagText}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TagIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setTagText(
                    e.target.value.trim().replace(/[^a-zA-Z0-9 ]/g, "")
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setFormData({
                      ...formData,
                      tags: [...formData.tags, `#${tagText}`],
                    });
                    setTagText("");
                  }
                }}
                autoComplete="off"
              />
            </Grid>
            {type === "adventurePost" ? (
              <Grid item sm={6} xs={12}>
                <Autocomplete
                  id="adventure-location"
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.description
                  }
                  filterOptions={(x) => x}
                  options={options}
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={formData.location}
                  noOptionsText="No locations"
                  onChange={(event, newValue) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
                    setFormData({
                      ...formData,
                      location: newValue?.description,
                    });
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Adventure Location"
                      fullWidth
                    />
                  )}
                  renderOption={(props, option) => {
                    const matches =
                      option.structured_formatting
                        .main_text_matched_substrings || [];
                    const parts = parse(
                      option.structured_formatting.main_text,
                      matches.map((match) => [
                        match.offset,
                        match.offset + match.length,
                      ])
                    );

                    return (
                      <li {...props}>
                        <Grid container alignItems="center">
                          <Grid item sx={{ display: "flex", width: 44 }}>
                            <LocationOnIcon sx={{ color: "text.secondary" }} />
                          </Grid>
                          <Grid
                            item
                            sx={{
                              width: "calc(100% - 44px)",
                              wordWrap: "break-word",
                            }}
                          >
                            {parts.map((part, index) => (
                              <Box
                                key={index}
                                component="span"
                                sx={{
                                  fontWeight: part.highlight
                                    ? "bold"
                                    : "regular",
                                }}
                              >
                                {part.text}
                              </Box>
                            ))}

                            <Typography variant="body2" color="text.secondary">
                              {option.structured_formatting.secondary_text}
                            </Typography>
                          </Grid>
                        </Grid>
                      </li>
                    );
                  }}
                />
              </Grid>
            ) : null}
            <Grid item sm={type === "feedPost" ? 12 : 6} xs={12}>
              {formData?.tags?.map((i) => {
                return (
                  <Chip
                    label={i}
                    sx={{ marginTop: 1, marginRight: 1 }}
                    onDelete={handleDeleteTag(i)}
                  />
                );
              })}
            </Grid>
            <Input
              name={"details"}
              handleChange={handleInputChange}
              label={"Post Details"}
              type="text"
              autoComplete="off"
              rows={4}
              multiline
              value={formData?.details}
            />

            <Grid item sm={6} xs={12}>
              <Stack
                sx={{ display: "flex", alignItems: "center" }}
                direction={"row"}
                spacing={1}
              >
                <FileBase
                  // value={formData?.image}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onDone={({ base64 }) =>
                    setFormData({ ...formData, image: base64 })
                  }
                />
              </Stack>
            </Grid>
            <Grid container justifyContent="center" item sm={6} xs={12}>
              {formData?._id ? (
                <Button
                  type="submit"
                  sx={{ marginRight: 3 }}
                  variant="contained"
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="submit"
                  sx={{ marginRight: 3 }}
                  variant="contained"
                >
                  Upload
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export default CreatePost;
