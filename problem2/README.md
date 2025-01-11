# Problem2

## Getting Started

### Prerequisites

To run the project, make sure you have the following installed:

- Node.js (version 14 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

   npm install

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

### Functionality
Currency Selection: Users can select the "From" and "To" currencies from a dropdown.
- User can select currencies and it will be auto load when selected to show your currency
Limitation: 
- A lot of image file svg make my website a little bit lag
- I don't have filter or search to select faster. It is really difficult to handle that case because it wasn't part of the original plan, so my structure can't support that functionality.
- Whenever you interact with the fields on the screen, it will automatically update the actual amount after convert.
Amount Input: Users can input the amount they want to convert.
Conversion Logic: The application fetches the conversion rate from an API (mocked in this example with a /convert endpoint).
Loading Indicator: A circular loading spinner is shown when waiting for the conversion result.
- I don't show button because it could be make user annoying and make them confuse.
Result Display: The result of the conversion is displayed below the input fields.
Error Handling: Errors are shown in a Snackbar with a message explaining the issue.

