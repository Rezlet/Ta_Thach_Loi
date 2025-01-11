import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Select,
  CssBaseline,
  Container,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { CurrencyIcons } from "./models/CurrencyType";


// Start worker (MSW)

const App: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("ETH");
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedAmount, setDebouncedAmount] = useState<number>(amount);
  // Handle conversion
  const handleConvert = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      if (!response.ok) {
        const errorDetails = await response.json().catch(() => null);
        throw new Error(
          errorDetails?.message ||
            `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      setResult(data.result);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleConvert();
  }, [fromCurrency, toCurrency]);

  // Handle debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAmount(amount);
    }, 1000);

    return () => clearTimeout(timer);
  }, [amount]);

  useEffect(() => {
    if (debouncedAmount !== amount) return;
    handleConvert();
  }, [debouncedAmount]);

  const currencyIcons: CurrencyIcons = {};
  const images = import.meta.glob("./assets/tokens/*.svg", { eager: true });
  for (const path in images) {
    const key = path
      .replace("./assets/token", "")
      .replace(".svg", "")
      .split("/")[1];
    currencyIcons[key] = (images[path] as { default: string }).default;
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ padding: 4, fontFamily: "Arial, sans-serif" }}>
          <Typography variant="h4" gutterBottom>
            Currency Converter
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: {xs: "column", sm: "row"}
            }}
          >
            <Box sx={{ flex: 1, position: "relative" }}>
              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                fullWidth
                variant="outlined"
              />

              {loading ? (
                <CircularProgress
                  sx={{ position: "absolute", right: "12px", bottom: "12px" }}
                  size={24}
                  color="inherit"
                />
              ) : (
                ""
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
                position: "relative",
                flex: 2,
              }}
            >
              <FormControl
                sx={{
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "relative",
                    gap: 2,
                  }}
                >
                  <InputLabel>From</InputLabel>
                  <Select
                    fullWidth
                    label={"From"}
                    labelId="From-label"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    sx={{ paddingLeft: "12px", display: "flex", gap: "4px" }}
                    inputProps={{ IconComponent: () => null }}
                    MenuProps={{
                      sx: {
                        maxHeight: "40vh",
                      },
                    }}
                    SelectDisplayProps={{
                      style: {
                        display: "flex",
                        gap: "8px",
                      },
                    }}
                  >
                    {Object.keys(currencyIcons).map((currency) => (
                      <MenuItem
                        key={currency}
                        value={currency}
                        sx={{ display: "flex", gap: "4px" }}
                      >
                        <img
                          src={currencyIcons[currency]}
                          alt={currency}
                          width={24}
                          height={24}
                        />
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%);",
                  backgroundColor: "#fff",
                  zIndex: 100,
                }}
              >
                <Button
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    minWidth: "auto",
                  }}
                  variant="outlined"
                  onClick={() => {
                    setFromCurrency(toCurrency);
                    setToCurrency(fromCurrency);
                    handleConvert();
                  }}
                >
                  <FontAwesomeIcon icon={faRepeat} size="1x" />
                </Button>
              </Box>
              <FormControl
                sx={{
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "relative",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  {/* Icon bên trái của Select "To" */}
                  <InputLabel>To</InputLabel>
                  <Select
                    fullWidth
                    label={"To"}
                    labelId="to-label"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    sx={{ paddingLeft: "12px", display: "flex", gap: "4px" }}
                    inputProps={{ IconComponent: () => null }}
                    MenuProps={{
                      sx: {
                        maxHeight: "40vh",
                      },
                    }}
                    SelectDisplayProps={{
                      style: {
                        display: "flex",
                        gap: "8px",
                      },
                    }}
                  >
                    {Object.keys(currencyIcons).map((currency) => (
                      <MenuItem
                        key={currency}
                        value={currency}
                        sx={{ display: "flex", gap: "4px" }}
                      >
                        <img
                          src={currencyIcons[currency]}
                          alt={currency}
                          width={24}
                          height={24}
                        />
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
          </Box>

          <Box>
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h6">
                {amount} {fromCurrency} = {result} {toCurrency}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Snackbar
          open={!!error}
          onClose={() => setError(null)}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </React.Fragment>
  );
};

export default App;
